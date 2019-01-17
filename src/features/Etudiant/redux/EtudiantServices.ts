import { ETUDIANT_STATUS_FREE } from '../../../data/DataProcs';
import { BaseServices } from "../../../redux/BaseServices";
import { IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";
import {
  FindEtudiantById,
  GetInitialEtudiant
} from "../../../redux/StateProcs";

//
export class EtudiantServices {
  //
  public static createEtudiant(state: IInfoState): IPayload {
    return { etudiant: GetInitialEtudiant(state) };
  } // createEtudAffectation
  //
  public static async saveEtudiantEvtAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.etudiants.evt.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    return BaseServices.refreshEvtAsync(state, state.etudiants.evt);
  } // saveEvtAttachmentAsync
  public static async removeEtudiantEvtAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.etudiants.evt.id;
    await pMan.removeAttachmentAsync(id, name);
    return BaseServices.refreshEvtAsync(state, state.etudiants.evt);
  } // removeEvtAttachment
  //
  public static async removeEtudiantNoteAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.etudiants.note.id;
    await pMan.removeAttachmentAsync(id, name);
    return BaseServices.refreshNoteAsync(state, state.etudiants.note);
  } // removeNoteAttachment
  public static async saveEtudiantNoteAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.etudiants.note.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    return BaseServices.refreshNoteAsync(state, state.etudiants.note);
  } // saveNoteAttachment

  public static async saveEtudiantNoteAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.etudiants.note;
    await pMan.maintainsNoteAsync(p);
    return {
      note: await pMan.loadNoteByIdAsync(p.id)
    };
  } // saveNoteAsync
  public static async selectEtudiantNoteAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    return {
      note: await pMan.loadNoteByIdAsync(id)
    };
  } // selectNoteAsync
  public static async selectEtudiantEvtAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    return {
      evt: await pMan.loadEvtByIdAsync(id)
    };
  } // selectEvtAsync
  public static async saveEtudiantEvtAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.etudiants.evt;
    await pMan.maintainsEvtAsync(p);
    return {
      evt: await pMan.loadEvtByIdAsync(p.id)
    };
  } // saveEv
  public static async removeEtudiantEvtAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.etudiants.evt;
    await pMan.removeEvtAsync(p);
    return BaseServices.refreshEtudiantAsync(state, state.etudiants.current.id);
  } // removeEvt

  public static async setEtudiantAvatarAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const pEtud = Object.assign({}, state.etudiants.current);
    pEtud.avatar = name;
    await pMan.saveEtudiantAsync(pEtud);
    return BaseServices.refreshEtudiantAsync(state, pEtud.id);
  } // setEtudiantAvatar
  //
  public static async saveEtudiantAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.etudiants.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    return BaseServices.refreshEtudiantAsync(state, state.etudiants.current.id);
  } // saveEtudiantAttachment
  public static async removeEtudiantAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.etudiants.current.id;
    await pMan.removeAttachmentAsync(id, name);
    return BaseServices.refreshEtudiantAsync(state, state.etudiants.current.id);
  } // removeEtudiantAttachment
  //
  public static async removeEtudiantAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    await pMan.removeEtudiantAsync(state.etudiants.current.id);
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    const pRet = await  EtudiantServices.refreshEtudiantsAsync(state);
    pRet.etudiantsOptions = opts;
    pRet.freeEtudiantsOpts = await pMan.getEtudiantsOptsByStatusAsync(
      ETUDIANT_STATUS_FREE
    );
    pRet.etudAffectations = affs;
    return pRet;
  } // removeEtudiant
  //
  public static async saveEtudiantAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    await pMan.saveEtudiantAsync(state.etudiants.current);
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    const pRet = await  EtudiantServices.refreshEtudiantsAsync(state);
    pRet.etudiantsOptions = opts;
    pRet.freeEtudiantsOpts = await pMan.getEtudiantsOptsByStatusAsync(
      ETUDIANT_STATUS_FREE
    );
    pRet.etudAffectations = affs;
    return pRet;
  } // saveEtudiant
  //
  public static async selectEtudiantAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pz = FindEtudiantById(state, id);
    if (pz.id.length < 1) {
      return {
        etudiant: pz
      };
    }
    if (pz.loaded) {
      return {
        etudiant: pz
      };
    }
    return BaseServices.refreshEtudiantAsync(state, pz.id);
  } // selectEtudiantAsync
  //
  public static async gotoPageEtudiantAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const status = state.etudiants.etudiantStatus;
    const nTotal = await pMan.getEtudiantsCountAsync(status);
    if (page < 1) {
      page = 1;
    }
    const count = state.etudiants.pageSize;
    let offset = (page - 1) * count;
    if (offset + count > nTotal) {
      offset = nTotal - count;
      if (offset < 0) {
        offset = 0;
      }
    }
    const etudiants = await pMan.getEtudiantsAsync(status, offset, count);
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    return {
      etudAffectations:affs,
      etudiantsOptions: opts,
      // tslint:disable-next-line:object-literal-sort-keys
      etudiants,
      etudiantsCount: nTotal,
      page,
      // tslint:disable-next-line:object-literal-sort-keys
      freeEtudiantsOpts: await pMan.getEtudiantsOptsByStatusAsync(
        ETUDIANT_STATUS_FREE
      )
    };
  } // gotoPageEtudiant
  //
  public static refreshEtudiantsAsync(
    state: IInfoState
  ): Promise<IPayload> {
    return EtudiantServices.gotoPageEtudiantAsync(state,1);
  } // RefreshEtudiants
  //
  public static async changeEtudiantStatusAsync(
    state: IInfoState,
    status: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getEtudiantsCountAsync(status);
    const page = 1;
    const count = state.etudiants.pageSize;
    let offset = 0;
    if (offset + count > nTotal) {
      offset = nTotal - count;
      if (offset < 0) {
        offset = 0;
      }
    }
    const etudiants = await pMan.getEtudiantsAsync(status, offset, count);
    return {
      etudiant: GetInitialEtudiant(state),
      etudiantStatus: status,
      etudiants,
      etudiantsCount: nTotal,
      page,
      // tslint:disable-next-line:object-literal-sort-keys
      freeEtudiantsOpts: await pMan.getEtudiantsOptsByStatusAsync(
        ETUDIANT_STATUS_FREE
      )
    };
  } // changeEtudiantStatusAsync
} // class EtudiantServices
