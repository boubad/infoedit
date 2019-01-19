import { IGroupeDoc } from '../DomainData';
import { BaseDataManager } from './BaseDataManager';
import { IDataStore } from "./IDataStore";
import { TYPE_GROUPE } from "./impl/DomainData";
import { IItemGroupe } from "./impl/IInfoDomain";
import { MatiereManager } from './MatiereManager';
//
export class GroupeManager extends MatiereManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  ////
  public async removeGroupeAsync(id: string): Promise<void> {
    await this.pStore.removeDocsBySelector({ groupeid: { $eq: id } });
    await this.pStore.removeDoc(id);
  } // removeGroupeAsync
  //
  public async saveGroupeAsync(p: IGroupeDoc): Promise<IGroupeDoc> {
    const sigle = p.sigle.trim().toLowerCase();
    const name = p.name.trim();
    if (sigle.length < 1 || name.length < 1) {
      throw new TypeError("Invalid input data");
    }
    const doc: any = {
      name: p.name,
      observations: p.observations.trim(),
      ownerid: p.ownerid,
      sigle,
      type: TYPE_GROUPE
    };
    const pp = await this.pStore.findDocsBySelector(
      {
        sigle: { $eq: sigle },
        type: { $eq: TYPE_GROUPE }
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
    return this.loadGroupeByIdAsync(docid);
  } // saveGroupeAsync
  //
  public async loadGroupeByIdAsync(id: string): Promise<IGroupeDoc> {
    const data: IItemGroupe = await this.pStore.findDocById(id);
    return this.convertGroupeDoc(data);
  } // loadGroupeByIdAsyn
  //
  public getGroupesCountAsync(): Promise<number> {
    const sel: any = {
      type: { $eq: TYPE_GROUPE }
    };
    return this.pStore.findDocsCountBySelector(sel);
  } // getGroupesCountAsync
  public async getGroupesAsync(
    offset: number,
    count: number
  ): Promise<IGroupeDoc[]> {
    if (count < 1) {
      return [];
    }
    const skip = offset >= 0 ? offset : 0;
    const sel: any = {
      type: { $eq: TYPE_GROUPE }
    };
    const pp: IItemGroupe[] = await this.pStore.findDocsBySelector(
      sel,
      skip,
      count
    );
    const pRet: IGroupeDoc[] = [];
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      pRet.push(this.convertGroupeDoc(pp[i]));
    }
    BaseDataManager.sortSigleNamedDoc(pRet);
    return pRet;
  } // getGroupesAsync
  //
} // class GroupeManager
