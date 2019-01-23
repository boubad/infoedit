import { IControleDoc } from '../DomainData';
import { EtudAffectationManager } from './EtudAffectationManager';
import { IDataStore } from "./IDataStore";
import { TYPE_CONTROLE } from "./impl/DomainData";
import { IItemControle } from "./impl/IInfoDomain";
//
export class ControleManager extends EtudAffectationManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  ////
  public async removeControleAsync(id: string): Promise<void> {
    await this.pStore.removeDocsBySelector({ controleid: { $eq: id } });
    await this.pStore.removeDoc(id);
  } // removeControleAsync
  //
  public async saveControleAsync(p: IControleDoc): Promise<IControleDoc> {
    const matiereid = p.matiereid.trim();
    const affectationid = p.affectationid.trim();
    const date = p.date.trim();
    const name = p.name.trim();
    if (
      affectationid.length < 1 ||
      matiereid.length < 1 ||
      date.length < 1 ||
      name.length < 1
    ) {
      throw new TypeError("Cannot save controle");
    }
    const pMat = await this.fetchMatiereByIdAsync(matiereid);
    const pAff = await this.fetchAffectationByIdAsync(affectationid);
    if (pMat.id !== matiereid || pAff.id !== affectationid){
      throw new TypeError("Invalid parent(s) id(s)");
    }
    const coefficient = (p.coefficient > 0.0) ? p.coefficient : 1.0;
    const doc: any = {
      affectationid,
      anneeid: pAff.anneeid,
      coefficient,
      date,
      duration: p.duration,
      groupeid: pAff.groupeid,
      matiereid,
      name,
      observations: p.observations,
      ownerid: p.ownerid,
      place: p.place,
      semestreid: pAff.semestreid,
      type: TYPE_CONTROLE,
      uniteid: pMat.uniteid
    };
    const sel: any = {
      affectationid: { $eq: affectationid },
      date: { $eq: p.date },
      matiereid: { $eq: matiereid },
      name: { $eq: p.name },
      type: { $eq: TYPE_CONTROLE }
    };
    const pp = await this.pStore.findDocsBySelector(sel, 0, 1, ["_id"]);
    if (pp.length > 0) {
      const x = pp[0];
      doc._id = x._id;
    } else if (p.id.trim().length > 0){
      doc._id = p.id.trim();
    }
    const docid = await this.pStore.maintainsDoc(doc);
    return this.loadControleByIdAsync(docid);
  } // saveAsync
  //
  public async getControlesCountAsync(
    anneeid: string,
    semestreid: string,
    groupeid: string,
    matiereid: string
  ): Promise<number> {
    const groupe = groupeid.trim().length > 0
        ? groupeid.trim()
        : "";
    const semestre = semestreid.trim().length > 0
        ? semestreid.trim()
        : "";
    const matiere = matiereid.trim().length > 0
        ? matiereid.trim()
        : "";
    const annee = anneeid.trim().length > 0
        ? anneeid.trim()
        : "";
    if (
      groupe.length < 1 ||
      semestre.length < 1 ||
      annee.length < 1 ||
      matiere.length < 1
    ) {
      return 0;
    }
    const sel: any = {
      anneeid: { $eq: annee },
      groupeid: { $eq: groupe },
      matiereid: { $eq: matiere },
      semestreid: { $eq: semestre },
      type: { $eq: TYPE_CONTROLE }
    };
    return this.pStore.findDocsCountBySelector(sel);
  } //  getControlesCountAsync
  //
  public async getControlesAsync(
    anneeid: string,
    semestreid: string,
    groupeid: string,
    matiereid: string,
    offset: number,
    count: number
  ): Promise<IControleDoc[]> {
    if (count < 1) {
      return [];
    }
    const groupe = groupeid.trim().length > 0
        ? groupeid.trim()
        : "";
    const semestre = semestreid.trim().length > 0
        ? semestreid.trim()
        : "";
    const matiere = matiereid.trim().length > 0
        ? matiereid.trim()
        : "";
    const annee = anneeid.trim().length > 0
        ? anneeid.trim()
        : "";
    if (
      groupe.length < 1 ||
      semestre.length < 1 ||
      annee.length < 1 ||
      matiere.length < 1
    ) {
      return [];
    }
    const start = offset >= 0 ? offset : 0;
    const sel: any = {
      anneeid: { $eq: annee },
      groupeid: { $eq: groupe },
      matiereid: { $eq: matiere },
      semestreid: { $eq: semestre },
      type: { $eq: TYPE_CONTROLE }
    };
    const pp: IItemControle[] = await this.pStore.findDocsBySelector(
      sel,
      start,
      count
    );
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const oTemp: Array<Promise<IControleDoc>> = [];
    for (let i = 0; i < n; i++) {
      oTemp.push(this.convertControleDocAsync(pp[i]));
    } // i
    const pRet = await Promise.all(oTemp);
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        } else if (a.date < b.date) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getControlesAsync
  //
} //
