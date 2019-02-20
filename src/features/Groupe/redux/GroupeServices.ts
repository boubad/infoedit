import { IGroupeDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';
import { GetInitialGroupe } from '../../../data/state/stores/StateProcs';

export class GroupeServices {
  //
  public static createGroupe(state: IInfoState): IPayload {
    return { groupe: GetInitialGroupe(state) };
  } // createGroupe
  public static async selectGroupeAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const sid = id.trim();
    if (sid.length < 1) {
      return { groupe: GetInitialGroupe(state) };
    }
    let px = state.groupes.pageData.find(x => {
      return x.id === sid;
    });
    if (px === undefined) {
      const pMan = BaseServices.getPersistManager(state);
      px = await pMan.fetchGroupeByIdAsync(sid);
    }
    return { groupe: px };
  } // selectGroupeAsync
  //
  public static async saveGroupeAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.groupes.current;
    const px = await pMan.saveGroupeAsync(p);
    const pRet = await GroupeServices.refreshGroupesAsync(state);
    pRet.groupe = px;
    return pRet;
  } // saveGroupeAsync

  public static async removeGroupeAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.groupes.current.id;
    await pMan.removeGroupeAsync(id);
    return GroupeServices.refreshGroupesAsync(state);
  } // removeGroupeAsync
  public static async  refreshGroupesAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getGroupesCountAsync();
    const anneeid = state.annees.current.id;
    const semestreid = state.semestres.current.id;
    const groupeid = state.groupes.current.id;
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    const groupes = await pMan.getGroupesAsync(0, nTotal);
    return {
      etudAffectations:affs,
      etudiantsOptions: opts,
      groupes,
      groupesCount: nTotal,
      groupesOptions: await pMan.getGroupesOptionsAsync(),
      page:1,
    };
  } // RefreshControles
  public static async gotoPageGroupeAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getGroupesCountAsync();
    if (page < 1) {
      page = 1;
    }
    const count = state.groupes.pageSize;
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
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    const groupes = await pMan.getGroupesAsync(offset, count);
    return {
      etudAffectations:affs,
      etudiantsOptions: opts,
      groupes,
      groupesCount: nTotal,
      groupesOptions: await pMan.getGroupesOptionsAsync(),
      page,
    };
  } // gotoPageControle
  //
  public static async saveGroupeAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.groupes.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    const pz = await pMan.loadGroupeByIdAsync(id);
    const bb: IGroupeDoc[] = [];
    const pp = state.groupes.pageData;
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
      unite: pz,
      unites: bb
    };
  } // saveGroupeAttachment
  //
  public static async removeGroupeAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.groupes.current.id;
    await pMan.removeAttachmentAsync(id, name);
    const pz = await pMan.loadGroupeByIdAsync(id);
    const bb: IGroupeDoc[] = [];
    const pp = state.groupes.pageData;
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
      unite: pz,
      unites: bb
    };
  } // removeEtudiantAttachment
  //
} // class GroupeServices
