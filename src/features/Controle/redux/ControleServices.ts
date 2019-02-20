import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';
import { FindControleById, GetInitialControle } from '../../../data/state/stores/StateProcs';

//
export class ControleServices {
  //
  public static async showEtudiantAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const pEtud = await pMan.fetchEtudiantByIdAsync(id);
    pEtud.evts = await pMan.getEtudiantEvtsAsync(id);
    pEtud.notes = await pMan.getEtudiantNotesAsync(id);
    pEtud.affectations = await pMan.getEtudiantAffectationsAsync(id);
    pEtud.loaded = true;
    return ({etudiant: pEtud});
  } // showEtudiantAsync
  //
  public static createControle(state:IInfoState): IPayload{
    return ({controle: GetInitialControle(state)});
}// createAnneeAsync
  //
  public static async selectControleNoteAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const note = await pMan.loadNoteByIdAsync(id);
    return {
      etudiant: await pMan.fetchEtudiantByIdAsync(note.etudiantid),
      note
    };
  } // selectNoteAsync
  public static async selectControleEvtAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const evt = await pMan.loadEvtByIdAsync(id);
    return {
      etudiant: await pMan.fetchEtudiantByIdAsync(evt.etudiantid),
      evt
    };
  } // selectEvtAsync
  public static async checkControleNotesAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.controles.current.id;
    await pMan.checkControleNotesAsync(id);
    return BaseServices.refreshControleAsync(state, id);
  } // checkControleNotesAsync
  //
  public static async saveControleEvtAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.controles.evt.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    return BaseServices.refreshEvtAsync(state, state.controles.evt);
  } // saveEvtAttachmentAsync
  public static async removeControleEvtAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.controles.evt.id;
    await pMan.removeAttachmentAsync(id, name);
    return BaseServices.refreshEvtAsync(state, state.controles.evt);
  } // removeEvtAttachment
  //
  public static async removeControleNoteAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.controles.note.id;
    await pMan.removeAttachmentAsync(id, name);
    return BaseServices.refreshNoteAsync(state, state.controles.note);
  } // removeNoteAttachment
  public static async saveControleNoteAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.controles.note.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    return BaseServices.refreshNoteAsync(state, state.controles.note);
  } // saveNoteAttachment

  public static async saveControleNoteAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.controles.note;
    await pMan.maintainsNoteAsync(p);
    return {
      note: await pMan.loadNoteByIdAsync(p.id)
    };
  } // saveNoteAsync
  public static async saveControleEvtAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.controles.evt;
    await pMan.maintainsEvtAsync(p);
    return BaseServices.refreshControleAsync(state, state.controles.current.id);
  } // saveEv
  public static async removeControleEvtAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.controles.evt;
    await pMan.removeEvtAsync(p);
    return BaseServices.refreshControleAsync(state, state.controles.current.id);
  } // removeEvt
  //
  public static async saveControleAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    //
    const pMan = BaseServices.getPersistManager(state);
    const id = state.controles.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    return BaseServices.refreshControleAsync(state, state.controles.current.id);
  } // saveControleAttachment
  public static async removeControleAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.controles.current.id;
    await pMan.removeAttachmentAsync(id, name);
    return BaseServices.refreshControleAsync(state, state.controles.current.id);
  } // removeControleAttachment
  //
  public static async removeControleAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    await pMan.removeControleAsync(state.controles.current.id);
    return ControleServices.refreshControlesAsync(state);
  } // removeControle
  //
  public static async saveControleAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    await pMan.saveControleAsync(state.controles.current);
    return ControleServices.refreshControlesAsync(state);
  } // saveControle
  //
  public static async selectControleAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pz = FindControleById(state, id);
    if (pz.id.length < 1) {
      return {
        controle: pz
      };
    }
    return BaseServices.refreshControleAsync(state, pz.id);
  } // selectControleAsync
  //
  public static async gotoPageControleAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getControlesCountAsync(
      state.annees.current.id,
      state.semestres.current.id,
      state.groupes.current.id,
      state.matieres.current.id
    );
    if (page < 1) {
      page = 1;
    }
    const count = state.controles.pageSize;
    let offset = (page - 1) * count;
    if (offset + count > nTotal) {
      offset = nTotal - count;
      if (offset < 0) {
        offset = 0;
      }
    }
    const controles = await pMan.getControlesAsync(
      state.annees.current.id,
      state.semestres.current.id,
      state.groupes.current.id,
      state.matieres.current.id,
      offset,
      count
    );
    return {
      controles,
      controlesCount: nTotal,
      page
    };
  } // gotoPageControle
  //
  public static async refreshControlesAsync(
    state: IInfoState
  ): Promise<IPayload> {
    return this.gotoPageControleAsync(state, 1);
  } // RefreshControles
  //

  //
} // class ControleServices
