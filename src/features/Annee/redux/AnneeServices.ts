import { IAnneeDoc } from "../../../data/DomainData";
import { BaseServices } from "../../../redux/BaseServices";
import { IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";

//
export class AnneeServices {
  //
  
  public static async saveAnneeAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.annees.current;
    await pMan.saveAnneeAsync(p);
    return this.refreshAnneesAsync(state);
  } // saveAnneeAsync

  public static async removeAnneeAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.annees.current.id;
    await pMan.removeAnneeAsync(id);
    return this.refreshAnneesAsync(state);
  } // removeAnneeAsync
  public static refreshAnneesAsync(state: IInfoState): Promise<IPayload> {
    return this.gotoPageAnneeAsync(state, state.annees.currentPage);
  } // RefreshControles
  public static async gotoPageAnneeAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    if (page < 1) {
      page = 1;
    }
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getAnneesCountAsync();
    const count = state.annees.pageSize;
    let offset = (page - 1) * count;
    if (offset + count > nTotal) {
      offset = nTotal - count;
      if (offset < 0) {
        offset = 0;
      }
    }
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const xopts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    const annees = await pMan.getAnneesAsync(offset, count);
    const opts = await pMan.getAnneesOptionsAsync();
    return {
      annees,
      anneesCount: nTotal,
      anneesOptions: opts,
      etudAffectations:affs,
      etudiantsOptions: xopts,
      page
    };
  } // gotoPageControle
  //
  public static async saveAnneeAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.annees.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    const pz = await pMan.loadAnneeByIdAsync(id);
    const bb: IAnneeDoc[] = [];
    const pp = state.annees.pageData;
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      if (x.id === id) {
        bb.push(pz);
      } else {
        bb.push(x);
      }
    } // i
    return {
      annee: pz,
      annees: bb
    };
  } // saveAnneeAttachment
  //
  public static async removeAnneeAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.annees.current.id;
    await pMan.removeAttachmentAsync(id, name);
    const pz = await pMan.loadAnneeByIdAsync(id);
    const bb: IAnneeDoc[] = [];
    const pp = state.annees.pageData;
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      if (x.id === id) {
        bb.push(pz);
      } else {
        bb.push(x);
      }
    } // i
    return {
      annee: pz,
      annees: bb
    };
  } // removeEtudiantAttachment
  //
} // class AnneeServices
