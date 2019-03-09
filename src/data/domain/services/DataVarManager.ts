import { IDataVarDoc } from "../DomainData";
import { DATAVAR_TYPE_STRING } from "./../DataProcs";
import { BaseDataManager } from "./BaseDataManager";
import { IDataStore } from "./IDataStore";
import { IItemDataVar } from "./impl/IInfoDomain";
import { TYPE_DATAVAR } from "./impl/InfoDomainData";
import { InfoUserManager } from './InfoUserManager';
//
export class DataVarManager extends InfoUserManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  ////
  public async removeDataVarAsync(id: string): Promise<void> {
    await this.pStore.removeDoc(id);
  } // removeDataVarAsync
  //
  public async saveDataVarAsync(p: IDataVarDoc): Promise<IDataVarDoc> {
    const sigle = p.sigle.trim().toLowerCase();
    const name = p.name.trim();
    if (sigle.length < 1 || name.length < 1) {
      throw new TypeError("Cannot save datavar");
    }
    let vartype = p.vartype.trim();
    if (vartype.length < 1) {
      vartype = DATAVAR_TYPE_STRING;
    }
    const doc: any = {
      modalvalues: p.modalvalues,
      name,
      observations: p.observations,
      sigle,
      tag: (p.tag.trim().length < 1) ? sigle.toUpperCase() : p.tag.trim().toUpperCase(),
      type: TYPE_DATAVAR,
      vartype
    };
    const pp: any[] = await this.pStore.findDocsBySelector(
      {
        sigle: { $eq: sigle },
        type: { $eq: TYPE_DATAVAR }
      },
      0,
      1,
      ["_id"]
    );
    if (pp.length > 0) {
      const x = pp[0];
      doc._id = x._id;
    } else if (p.id.trim().length > 0) {
      doc._id = p.id.trim();
    }
    const docid = await this.pStore.maintainsDoc(doc);
    return await this.loadDataVarByIdAsync(docid);
  } // saveDataVarAsync
  //
  public getDataVarsCountAsync(): Promise<number> {
    const sel: any = {
      type: { $eq: TYPE_DATAVAR }
    };
    return this.pStore.findDocsCountBySelector(sel);
  } // getDataVarsCountAsync
  public async getDataVarsAsync(
    offset: number,
    count: number
  ): Promise<IDataVarDoc[]> {
    if (count < 1) {
      return [];
    }
    const sel: any = {
      type: { $eq: TYPE_DATAVAR }
    };
    const skip = offset >= 0 ? offset : 0;
    const pp: IItemDataVar[] = await this.pStore.findDocsBySelector(
      sel,
      skip,
      count
    );
    const pRet: IDataVarDoc[] = [];
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      pRet.push(this.convertDataVarDoc(pp[i]));
    }
    BaseDataManager.sortSigleNamedDoc(pRet);
    return pRet;
  } // getDataVarsAsync
  //
} // class DataVarManager
