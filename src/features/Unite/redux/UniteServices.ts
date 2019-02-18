import { IUniteDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';
import { GetInitialUnite } from '../../../data/state/stores/StateProcs';

export class UniteServices {
  public static createUnite(state: IInfoState): IPayload {
    return { unite: GetInitialUnite(state) };
  } // createUnite
  public static async selectUniteAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const sid = id.trim();
    if (sid.length < 1) {
      return { unite: GetInitialUnite(state) };
    }
    let px = state.unites.pageData.find(x => {
      return x.id === sid;
    });
    if (px === undefined) {
      const pMan = BaseServices.getPersistManager(state);
      px = await pMan.fetchUniteByIdAsync(sid);
    }
    return { unite: px };
  } // selectUniteAsync
  //
  public static async saveUniteAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.unites.current;
    await pMan.saveUniteAsync(p);
    return this.RefreshUnitesAsync(state);
  } // saveUniteAsync

  public static async removeUniteAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.unites.current.id;
    await pMan.removeUniteAsync(id);
    return this.RefreshUnitesAsync(state);
  } // removeUniteAsync
  public static RefreshUnitesAsync(state: IInfoState): Promise<IPayload> {
    return this.gotoPageUniteAsync(state, state.unites.currentPage);
  } // RefreshControles
  public static async gotoPageUniteAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getUnitesCountAsync();
    if (page < 1) {
      page = 1;
    }
    const count = state.unites.pageSize;
    const offset = (page - 1) * count;
    const unites = await pMan.getUnitesAsync(offset, count);
    return {
      page,
      unites,
      unitesCount: nTotal,
      unitesOptions: await pMan.getUnitesOptionsAsync()
    };
  } // gotoPageControle
  //
  public static async saveUniteAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.unites.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    const pz = await pMan.loadUniteByIdAsync(id);
    const bb: IUniteDoc[] = [];
    const pp = state.unites.pageData;
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
  } // saveUniteAttachment
  //
  public static async removeUniteAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.unites.current.id;
    await pMan.removeAttachmentAsync(id, name);
    const pz = await pMan.loadUniteByIdAsync(id);
    const bb: IUniteDoc[] = [];
    const pp = state.unites.pageData;
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
} // class UniteServices
