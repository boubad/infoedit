import { IAffectationDoc } from '../DomainData';
import { AnneeManager } from './AnneeManager';
import { IDataStore } from "./IDataStore";
import { TYPE_AFFECTATION } from "./impl/DomainData";
import { IItemAffectation } from "./impl/IInfoDomain";
//
export class AffectationManager extends AnneeManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  ////
  public async removeAffectationAsync(id: string): Promise<void> {
    await this.pStore.removeDocsBySelector({ affectationid:{$eq: id }});
    await this.pStore.removeDoc(id);
  } // remove
  //
  public async saveAffectationAsync(
    p: IAffectationDoc
  ): Promise<IAffectationDoc> {
    const anneeid = p.anneeid;
    const semestreid = p.semestreid;
    const groupeid = p.groupeid;
    const start = p.startdate;
    const end = p.enddate;  
    if (
      anneeid.trim().length < 1 ||
      semestreid.trim().length < 1 ||
      groupeid.trim().length < 1 ||
      start.length < 1 ||
      end.length < 1 ||
      start > end
    ) {
      throw new TypeError("Cannot save affectation...");
    } 
    const pAnnee = await this.fetchAnneeByIdAsync(anneeid);
    if (start < pAnnee.startdate || end > pAnnee.enddate){
      throw new TypeError("Cannot save affectation. Bad dates.");
    }  
      const doc: IItemAffectation = {
        anneeid,
        enddate:end,
        groupeid,
        observations: p.observations,
        ownerid: p.ownerid,
        semestreid,
        startdate:start,
        type: TYPE_AFFECTATION
      };
      const sel: any = {
        type: { $eq: TYPE_AFFECTATION },
        // tslint:disable-next-line:object-literal-sort-keys
        anneeid: { $eq: anneeid },
        groupeid: { $eq: groupeid },
        semestreid: { $eq: semestreid }
      };
      const pp = await this.pStore.findDocsBySelector(sel, 0, 1, ["_id"]);
      if (pp.length > 0) {
        const x = pp[0];
        doc._id = x._id;
      } else if (p.id.length > 0) {
        doc._id = p.id;
      } else if (p.id.trim().length > 0){
        doc._id = p.id.trim();
      }
      const sid = await this.pStore.maintainsDoc(doc);
      return this.loadAffectationByIdAsync(sid);
  } // saveAsync
  //
  public async loadAffectationByIdAsync(id: string): Promise<IAffectationDoc> {
    const data: IItemAffectation = await this.pStore.findDocById(id);
    return this.convertAffectationDocAsync(data);
  } // loadByIdAsync
  //
  public async getAffectationsCountAsync(
    anneeid: string,
    semestreid: string
  ): Promise<number> {
    const semestre = semestreid.length > 0
        ? semestreid
        : "";
    const annee = anneeid.length > 0
        ? anneeid
        : "";
    if (semestre.length < 1 || annee.length < 1) {
      return 0;
    } else {
      const sel: any = {
        anneeid: { $eq: annee },
        semestreid: { $eq: semestre },
        type: { $eq: TYPE_AFFECTATION }
      };
      return this.pStore.findDocsCountBySelector(sel);
    }
  } //  getAffectationsCountAsync
  //
  public async getAffectationsAsync(
    anneeid: string,
    semestreid: string,
    offset: number,
    count: number
  ): Promise<IAffectationDoc[]> {
    const limit = count > 0 ? count : 0;
    if (count < 1) {
      return [];
    }
    const semestre = semestreid.length > 0
        ? semestreid
        : "";
    const annee = anneeid.length > 0
        ? anneeid
        : "";
    if (
      semestre.length < 1 ||
      annee.length < 1
    ) {
      return [];
    }
    const start =
      offset !== undefined && offset !== null && offset >= 0 ? offset : 0;
    const sel: any = {
      anneeid: { $eq: annee },
      semestreid: { $eq: semestre },
      type: { $eq: TYPE_AFFECTATION }
    };
    const pp: IItemAffectation[] = await this.pStore.findDocsBySelector(
      sel,
      start,
      limit
    );
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const oTemp: Array<Promise<IAffectationDoc>> = [];
    for (let i = 0; i < n; i++) {
      oTemp.push(this.convertAffectationDocAsync(pp[i]));
    } // i
    const pRet = await Promise.all(oTemp);
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.groupename < b.groupename) {
          return -1;
        } else if (a.groupename > b.groupename) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getAffectationsAsync
  //
} // class AffectationManager
