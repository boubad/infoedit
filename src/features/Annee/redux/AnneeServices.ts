import { IAnneeDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';
import { GetInitialAnnee } from '../../../data/state/stores/StateProcs';


//
export class AnneeServices {
  //
  public static createAnnee(state:IInfoState): IPayload{
      return ({annee: GetInitialAnnee(state)});
  }// createAnneeAsync
  //
  public static async selectAnneeAsync(state:IInfoState, id:string): Promise<IPayload>{
    const sid = id.trim();
    if (sid.length < 1){
      return ({annee: GetInitialAnnee(state)});
    }
    let px = state.annees.pageData.find((x) =>{
      return (x.id === sid);
    });
    if (!px){
      const pMan = BaseServices.getPersistManager(state);
      px = await pMan.fetchAnneeByIdAsync(sid);
    }
    return ({annee:px});
  }// selectAnneeAsync
  //
  public static async saveAnneeAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.annees.current;
    const r = await pMan.saveAnneeAsync(p);
    const pRet = await AnneeServices.refreshAnneesAsync(state);
    pRet.annee = r;
    return pRet;
  } // saveAnneeAsync

  public static async removeAnneeAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.annees.current.id;
    await pMan.removeAnneeAsync(id);
    return AnneeServices.refreshAnneesAsync(state);
  } // removeAnneeAsync
  public static async refreshAnneesAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getAnneesCountAsync();
    const anneeid = state.annees.current.id;
    const semestreid = state.semestres.current.id;
    const groupeid = state.groupes.current.id;
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const xopts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    const annees = await pMan.getAnneesAsync(0, nTotal);
    const opts = await pMan.getAnneesOptionsAsync();
    return {
      annees,
      anneesCount: nTotal,
      anneesOptions: opts,
      etudAffectations:affs,
      etudiantsOptions: xopts,
    };
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
    const anneeid = state.annees.current.id;
    const semestreid = state.semestres.current.id;
    const groupeid = state.groupes.current.id;
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
