import { IUniteDoc } from '../DomainData';
import { BaseDataManager } from "./BaseDataManager";
import { IDataStore } from "./IDataStore";
import { TYPE_UNITE } from "./impl/DomainData";
import { IItemUnite } from "./impl/IInfoDomain";
//
export class UniteManager extends BaseDataManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  ////
  public async removeUniteAsync(id: string): Promise<void> {
    await this.pStore.removeDocsBySelector({
      uniteid: { $eq: id }
    });
    await this.pStore.removeDoc(id);
  } // removeUniteAsync
  //
  public async saveUniteAsync(p: IUniteDoc): Promise<IUniteDoc> {
    const sigle = p.sigle.trim().toLowerCase();
    const name = p.name.trim();
    if (sigle.length < 1 || name.length < 1) {
      throw new TypeError("Cannot save unite");
    }
    const doc: any = {
      name: p.name.trim(),
      observations: p.observations,
      ownerid: p.ownerid,
      sigle,
      type: TYPE_UNITE
    };
    const pp: any[] = await this.pStore.findDocsBySelector(
      {
        sigle: { $eq: sigle },
        type: { $eq: TYPE_UNITE }
      },
      0,
      1,
      ["_id"]
    );
    if (pp.length > 0) {
      const x = pp[0];
      doc._id = x._id;
    } else if (p.id.trim().length > 0){
      doc._id = p.id.trim();
    } 
    const docid = await this.pStore.maintainsDoc(doc);
    return await this.loadUniteByIdAsync(docid);
  } // saveUniteAsync
  //
  public async loadUniteByIdAsync(id: string): Promise<IUniteDoc> {
    const data: IItemUnite = await this.pStore.findDocById(id);
    return this.convertUniteDoc(data);
  } // loadUniteByIdAsyn
  //
  public getUnitesCountAsync(): Promise<number> {
    const sel: any = {
      type: { $eq: TYPE_UNITE }
    };
    return this.pStore.findDocsCountBySelector(sel);
  } // getUnitesCountAsync
  public async getUnitesAsync(
    offset: number,
    count: number
  ): Promise<IUniteDoc[]> {
    if (count < 1) {
      return [];
    }
    const sel: any = {
      type: { $eq: TYPE_UNITE }
    };
    const skip = offset >= 0 ? offset : 0;
    const pp: IItemUnite[] = await this.pStore.findDocsBySelector(
      sel,
      skip,
      count
    );
    const pRet: IUniteDoc[] = [];
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      pRet.push(this.convertUniteDoc(pp[i]));
    }
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.sigle < b.sigle) {
          return -1;
        } else if (a.sigle > b.sigle) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getUnitesAsync
  //
} // class UniteManager
