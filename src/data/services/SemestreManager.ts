import { ISemestreDoc } from '../DomainData';
import { IDataStore } from "./IDataStore";
import { TYPE_SEMESTRE } from "./impl/DomainData";
import { IItemSemestre } from "./impl/IInfoDomain";
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
      name: p.name.trim(),
      observations: p.observations,
      ownerid: p.ownerid,
      sigle,
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
  public async loadSemestreByIdAsync(id: string): Promise<ISemestreDoc> {
    const data: IItemSemestre = await this.pStore.findDocById(id);
    return this.convertSemestreDoc(data);
  } // loadSemestreByIdAsyn
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
  } // getSemestresAsync
  //
} // class SemestreManager
