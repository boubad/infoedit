import { IDataVarDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';
import { GetInitialDataVar } from '../../../data/state/stores/StateProcs';

export class DataVarServices {
  public static createVarDoc(state: IInfoState): IPayload {
    return { dataVar: GetInitialDataVar(state) };
  } // createVarDoc
  public static async selectVarDocAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const sid = id.trim();
    if (sid.length < 1) {
      return { dataVar: GetInitialDataVar(state) };
    }
    let px = state.datavars.pageData.find(x => {
      return x.id === sid;
    });
    if (px === undefined) {
      const pMan = BaseServices.getPersistManager(state);
      px = await pMan.fetchDataVarByIdAsync(sid);
    }
    return { dataVar: px };
  } // selectVarDocAsync
  //
  public static async saveVarDocAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.datavars.current;
    await pMan.saveDataVarAsync(p);
    return this.RefreshVarDocsAsync(state);
  } // saveVarDocAsync

  public static async removeVarDocAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.datavars.current.id;
    await pMan.removeDataVarAsync(id);
    return this.RefreshVarDocsAsync(state);
  } // removeVarDocAsync
  public static RefreshVarDocsAsync(state: IInfoState): Promise<IPayload> {
    return this.gotoPageVarDocAsync(state, state.datavars.currentPage);
  } // RefreshControles
  public static async gotoPageVarDocAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getDataVarsCountAsync();
    if (page < 1) {
      page = 1;
    }
    const count = state.unites.pageSize;
    const offset = (page - 1) * count;
    const dataVars = await pMan.getDataVarsAsync(offset, count);
    return {
        dataVars,
        dataVarsCount: nTotal,
        dataVarsOptions: await pMan.getDataVarOptionsAsync(),
      page,
    };
  } // gotoPageControle
  //
  public static async saveVarDocAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.datavars.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    const pz = await pMan.loadDataVarByIdAsync(id);
    const bb: IDataVarDoc[] = [];
    const pp = state.datavars.pageData;
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
      dataVar: pz,
      dataVars: bb
    };
  } // saveVarDocAttachment
  //
  public static async removeVarDocAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.datavars.current.id;
    await pMan.removeAttachmentAsync(id, name);
    const pz = await pMan.loadDataVarByIdAsync(id);
    const bb: IDataVarDoc[] = [];
    const pp = state.datavars.pageData;
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
      dataVar: pz,
      dataVars: bb
    };
  } // removeEtudiantAttachment
  //
} // class VarDocServices
