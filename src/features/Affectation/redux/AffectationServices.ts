import { IAffectationDoc } from '../../../data/DomainData';
import { BaseServices } from '../../../redux/BaseServices';
import { IInfoState } from '../../../redux/InfoState';
import { IPayload } from '../../../redux/IPayload';
import { GetInitialAffectation } from '../../../redux/StateProcs';


export class AffectationServices {
  public static async saveAffectationAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const p = state.affectations.current;
    const pMan = BaseServices.getPersistManager(state);
    await pMan.saveAffectationAsync(p);
    return this.refreshAffectationsAsync(state);
  } // saveAffectationAsync

  public static async removeAffectationAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const id = state.affectations.current.id;
    const pMan = BaseServices.getPersistManager(state);
    await pMan.removeAffectationAsync(id);
    return this.refreshAffectationsAsync(state);
  } // removeAffectationAsync
  public static refreshAffectationsAsync(state: IInfoState): Promise<IPayload> {
    return this.gotoPageAffectationAsync(state, state.affectations.currentPage);
  } // RefreshControles
  public static async gotoPageAffectationAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const semestreid = state.appstate.semestreid;
    const anneeid = state.appstate.anneeid;
    if (page < 1) {
      page = 1;
    }
    const nTotal = await pMan.getAffectationsCountAsync(anneeid, semestreid);
    const count = state.affectations.pageSize;
    let offset = (page - 1) * count;
    if (offset + count > nTotal) {
      offset = nTotal - count;
      if (offset < 0) {
        offset = 0;
      }
    }
    const vv = await pMan.getAffectationsAsync(
      anneeid,
      semestreid,
      offset,
      count
    );
    const n = vv.length;
    for (let i = 0; i < n; i++){
      AffectationServices.checkAffectation(state, vv[i]);
    }// i
    return {
      affectation: GetInitialAffectation(state),
      affectations: vv,
      affectationsCount: nTotal,
      page
    };
  } // gotoPageControle
  //
  public static async saveAffectationAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const id = state.affectations.current.id;
    const pMan = BaseServices.getPersistManager(state);
    await pMan.saveAttachmentAsync(id, name, mime, data);
    const pz = await pMan.loadAffectationByIdAsync(id);
    AffectationServices.checkAffectation(state, pz);
    return {
      affectation: pz
    };
  } // saveAffectationAttachment
  //
  public static async removeAffectationAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const id = state.affectations.current.id;
    const pMan = BaseServices.getPersistManager(state);
    await pMan.removeAttachmentAsync(id, name);
    const pz = await pMan.loadAffectationByIdAsync(id);
    AffectationServices.checkAffectation(state, pz);
    return {
      affectation: pz,
    };
  } // removeEtudiantAttachment
  //
  private static checkAffectation(state:IInfoState,pz:IAffectationDoc) {
    const startDate = state.appstate.anneeStartDate;
    const endDate = state.appstate.anneeEndDate;
    if (pz.startdate.length < 1){
      pz.startdate = startDate;
    }
    if (pz.enddate.length < 1){
      pz.enddate = endDate;
    }
  }
} // class AffectationServices
