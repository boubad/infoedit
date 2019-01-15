import { IGroupeDoc } from '../../../data/DomainData';
import { BaseServices } from '../../../redux/BaseServices';
import { IInfoState } from '../../../redux/InfoState';
import { IPayload } from '../../../redux/IPayload';

export class GroupeServices {
  //
  public static async saveGroupeAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.groupes.current;
    await pMan.saveGroupeAsync(p);
    return this.refreshGroupesAsync(state);
  } // saveGroupeAsync

  public static async removeGroupeAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.groupes.current.id;
    await pMan.removeGroupeAsync(id);
    return this.refreshGroupesAsync(state);
  } // removeGroupeAsync
  public static refreshGroupesAsync(state: IInfoState): Promise<IPayload> {
    return this.gotoPageGroupeAsync(state, state.groupes.currentPage);
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
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
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
