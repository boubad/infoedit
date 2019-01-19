import { IMatiereDoc } from "../DomainData";
import { BaseDataManager } from './BaseDataManager';
import { IDataStore } from "./IDataStore";
import { TYPE_MATIERE } from "./impl/DomainData";
import { IItemMatiere } from "./impl/IInfoDomain";
import { SemestreManager } from './SemestreManager';
//
//
export class MatiereManager extends SemestreManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  ////
  public async removeMatiereAsync(id: string): Promise<void> {
    await this.pStore.removeDocsBySelector({ matiereid: { $eq: id } });
    await this.pStore.removeDoc(id);
  } // remove
  //
  public async saveMatiereAsync(p: IMatiereDoc): Promise<IMatiereDoc> {
    if (p.sigle.trim().length < 1 || p.uniteid.trim().length < 1) {
      throw new TypeError("Invalid input data");
    }
    const doc: any = {
      type: TYPE_MATIERE,
      // tslint:disable-next-line:object-literal-sort-keys
      observations: p.observations,
      sigle: p.sigle.trim().toLowerCase(),
      name: p.name.trim(),
      uniteid: p.uniteid.trim(),
      modname: p.modname,
      coefficient: p.coefficient,
      ecs: p.ecs,
      ownerid: p.ownerid
    };
    const pp: any[] = await this.pStore.findDocsBySelector(
      {
        type: { $eq: TYPE_MATIERE },
        // tslint:disable-next-line:object-literal-sort-keys
        sigle: { $eq: p.sigle.trim().toLowerCase() },
        uniteid: { $eq: p.uniteid.trim() }
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
    return await this.loadMatiereByIdAsync(docid);
  } // saveAsync
  //
  public async loadMatiereByIdAsync(id: string): Promise<IMatiereDoc> {
    const data: IItemMatiere = await this.pStore.findDocById(id);
    return await this.convertMatiereDocAsync(data);
  } // loadByIdAsyn
  //

  public getMatieresCountAsync(uniteid: string): Promise<number> {
    const sel: any = {
      type: { $eq: TYPE_MATIERE }
    };
    if (uniteid.trim().length > 0) {
      sel.uniteid = { $eq: uniteid };
    }
    return this.pStore.findDocsCountBySelector(sel);
  } // getCountAsync
  public async getMatieresAsync(
    uniteid: string,
    offset: number,
    count: number
  ): Promise<IMatiereDoc[]> {
    if (count < 1) {
      return [];
    }
    const sel: any = {
      type: { $eq: TYPE_MATIERE }
    };
    if (uniteid.trim().length > 0) {
      sel.uniteid = { $eq: uniteid };
    }
    const pp: IItemMatiere[] = await this.pStore.findDocsBySelector(
      sel,
      offset,
      count
    );
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const pRet: IMatiereDoc[] = [];
    for (let i = 0; i < n; i++) {
      pRet.push(await this.convertMatiereDocAsync(pp[i]));
    }
  BaseDataManager.sortSigleNamedDoc(pRet);    
    return pRet;
  } // getMatieresAsync
  //
} // class MatiereManager
