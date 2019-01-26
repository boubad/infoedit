import { IAnneeDoc } from '../DomainData';
import { ControleManager } from './ControleManager';
import { IDataStore } from "./IDataStore";
import { IItemAnnee } from "./impl/IInfoDomain";
import { TYPE_ANNEE } from "./impl/InfoDomainData";
//
export class AnneeManager extends ControleManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  ////
  //
  public async removeAnneeAsync(id: string): Promise<void> {
    await this.pStore.removeDocsBySelector({ anneeid: { $eq: id } });
    await this.pStore.removeDoc(id);
  } // removeAnneeAsync
  //
  public async saveAnneeAsync(p: IAnneeDoc): Promise<IAnneeDoc> {
    const d1 = p.startdate.trim();
    const d2 = p.enddate.trim();
    const sigle = p.sigle.trim().toLowerCase();
    const name = p.name.trim();
    if (
      d1.length < 1 ||
      d2.length < 1 ||
      d1 >= d2 ||
      sigle.length < 1 ||
      name.length < 1
    ) {
      throw new TypeError("Cannot save annee...");
    }
    const doc: any = {
      enddate: d2,
      name,
      observations: p.observations,
      ownerid: p.ownerid,
      sigle,
      startdate: d1,
      type: TYPE_ANNEE
    };
    const pp = await this.pStore.findDocsBySelector(
      {
        enddate: { $eq: d2 },
        startdate: { $eq: d1 },
        type: { $eq: TYPE_ANNEE }
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
    return this.loadAnneeByIdAsync(docid);
  } // saveAsync
  //
  public getAnneesCountAsync(): Promise<number> {
    const sel: any = {
      type: { $eq: TYPE_ANNEE }
    };
    return this.pStore.findDocsCountBySelector(sel);
  } // getAnneesCountAsync
  //
  public async getAnneesAsync(
    offset: number,
    count: number
  ): Promise<IAnneeDoc[]> {
    if (count < 1) {
      return [];
    }
    const sel: any = {
      type: { $eq: TYPE_ANNEE }
    };
    const skip = offset >= 0 ? offset : 0;
    const pp: IItemAnnee[] = await this.pStore.findDocsBySelector(
      sel,
      skip,
      count
    );
    const pRet: IAnneeDoc[] = [];
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      pRet.push(this.convertAnneeDoc(pp[i]));
    }
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.startdate > b.startdate) {
          return -1;
        } else if (a.startdate < b.startdate) {
          return 1;
        }
        if (a.enddate > b.enddate) {
          return -1;
        } else if (a.enddate < b.enddate) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getAnneesAsync
  //
} // class AnneeManager
