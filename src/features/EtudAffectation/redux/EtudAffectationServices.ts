import { ETUDIANT_STATUS_FREE } from '../../../data/domain/DataProcs';
import { IAffectationDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';
import { GetInitialEtudAffectation } from '../../../data/state/stores/StateProcs';

export class EtudAffectationServices {
  //
  public static createEtudAffectation(state: IInfoState): IPayload {
    return { etudAffectation: GetInitialEtudAffectation(state) };
  } // createEtudAffectation
  //
  public static async selectEtudAffectationAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const sid = id.trim();
    if (sid.length < 1) {
      return { etudAffectation: GetInitialEtudAffectation(state) };
    }
    let px = state.etudaffectations.pageData.find(x => {
      return x.id === sid;
    });
    if (px === undefined) {
      const pMan = BaseServices.getPersistManager(state);
      px = await pMan.loadEtudAffectationByIdAsync(sid);
    }
    return { etudAffectation: px };
  } // selectEtudAffectationAsync
  public static async saveEtudAffectationAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.etudaffectations.current;
    await pMan.saveEtudAffectationAsync(p);
    return EtudAffectationServices.refreshEtudAffectationsAsync(state);
  } // saveEtudAffectationAsync

  public static async removeEtudAffectationAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.etudaffectations.current.id;
    await pMan.removeEtudAffectationAsync(id);
    return EtudAffectationServices.refreshEtudAffectationsAsync(state);
  } // removeEtudAffectationAsync
  public static refreshEtudAffectationsAsync(
    state: IInfoState
  ): Promise<IPayload> {
    return this.gotoPageEtudAffectationAsync(
      state,
      state.etudaffectations.currentPage
    );
  } // RefreshControles
  public static async gotoPageEtudAffectationAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const groupeid = state.appstate.groupeid;
    const semestreid = state.appstate.semestreid;
    const anneeid = state.appstate.anneeid;
    const nTotal = await pMan.getEtudAffectationsCountAsync(
      anneeid,
      semestreid,
      groupeid
    );
    if (page < 1) {
      page = 1;
    }
    const count = state.affectations.pageSize;
    let offset = (page - 1) * count;
    if (offset + count > nTotal) {
      offset = nTotal - count;
      if (offset < 0) {
        offset = 0;
      }
    }
    const vv = await pMan.getEtudAffectationsAsync(
      anneeid,
      semestreid,
      groupeid,
      offset,
      count
    );
    const n = vv.length;
    for (let i = 0; i < n; i++){
      EtudAffectationServices.checkAffectation(state, vv[i]);
    }// i
    const opts = await pMan.getEtudiantsOptsByStatusAsync(
      ETUDIANT_STATUS_FREE
    );
    return {
      etudAffectation: GetInitialEtudAffectation(state),
      etudAffectations: vv,
      etudAffectationsCount: nTotal,
      freeEtudiantsOpts: opts,
      page
    };
  } // gotoPageEtudAffectationAsync
  //
  public static async saveEtudAffectationAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.etudaffectations.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    const pz = await pMan.loadEtudAffectationByIdAsync(id);
    return {
      etudAffectation: pz,
    };
  } // saveEtudAffectationAttachment
  //
  public static async removeEtudAffectationAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.etudaffectations.current.id;
    await pMan.removeAttachmentAsync(id, name);
    const pz = await pMan.loadEtudAffectationByIdAsync(id);
    return {
      etudAffectation: pz,
    };
  } // removeEtudiantAttachment
  //
  private static checkAffectation(state:IInfoState,pz:IAffectationDoc) {
    const startDate = state.appstate.semestreStartDate
    const endDate = state.appstate.semestreEndDate;
    if (pz.startdate.length < 1){
      pz.startdate = startDate;
    }
    if (pz.enddate.length < 1){
      pz.enddate = endDate;
    }
  }
} // class EtudAffectationServices
