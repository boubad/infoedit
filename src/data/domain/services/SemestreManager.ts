import { ISemestreDoc } from '../DomainData';
import { BaseDataManager } from './BaseDataManager';
import { IDataStore } from "./IDataStore";
import { IItemSemestre } from "./impl/IInfoDomain";
import { TYPE_SEMESTRE } from "./impl/InfoDomainData";
import { UniteManager } from './UniteManager';
//
export class SemestreManager extends UniteManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  ////
  public async removeSemestreAsync(id: string): Promise<void> {
    await this.pStore.removeDocsBySelector({
      semestreid: { $eq: id }
    });
    await this.pStore.removeDoc(id);
  } // removeSemestreAsync
  //
  public async saveSemestreAsync(p: ISemestreDoc): Promise<ISemestreDoc> {
    const sigle = p.sigle.trim().toLowerCase();
    const name = p.name.trim();
    if (sigle.length < 1 || name.length < 1) {
      throw new TypeError("Cannot save semestre");
    }
    const doc: any = {
      name,
      observations: p.observations,
      ownerid: p.ownerid,
      sigle,
      tag: (p.tag.trim().length < 1) ? sigle.toUpperCase() : p.tag.trim().toUpperCase(),
      type: TYPE_SEMESTRE
    };
    const pp: any[] = await this.pStore.findDocsBySelector(
      {
        sigle: { $eq: sigle },
        type: { $eq: TYPE_SEMESTRE }
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
    return await this.loadSemestreByIdAsync(docid);
  } // saveSemestreAsync
  //
  public getSemestresCountAsync(): Promise<number> {
    const sel: any = {
      type: { $eq: TYPE_SEMESTRE }
    };
    return this.pStore.findDocsCountBySelector(sel);
  } // getSemestresCountAsync
  public async getSemestresAsync(
    offset: number,
    count: number
  ): Promise<ISemestreDoc[]> {
    if (count < 1) {
      return [];
    }
    const sel: any = {
      type: { $eq: TYPE_SEMESTRE }
    };
    const skip = offset >= 0 ? offset : 0;
    const pp: IItemSemestre[] = await this.pStore.findDocsBySelector(
      sel,
      skip,
      count
    );
    const pRet: ISemestreDoc[] = [];
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      pRet.push(this.convertSemestreDoc(pp[i]));
    }
    BaseDataManager.sortSigleNamedDoc(pRet);
    return pRet;
  } // getSemestresAsync
  //
} // class SemestreManager