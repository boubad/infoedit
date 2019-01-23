import {
  ETUDIANT_STATUS_BUSY,
  ETUDIANT_STATUS_DONE,
  ETUDIANT_STATUS_FREE} from "../DataProcs";
import { IEtudAffectationDoc } from "../DomainData";
import { EtudiantManager } from './EtudiantManager';
import { IDataStore } from "./IDataStore";
import { TYPE_ETUD_AFFECTATION } from "./impl/DomainData";
import { IItemEtudAffectation, IItemEtudiant } from "./impl/IInfoDomain";
//
export class EtudAffectationManager extends EtudiantManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  ////
  public async removeEtudAffectationAsync(id: string): Promise<void> {
    const px = await this.pStore.findDocById(id);
    const etudid = px.etudiantid;
    await this.pStore.removeDoc(id);
    const pxx: IItemEtudiant = await this.pStore.findDocById(etudid);
    if (
      pxx.status !== ETUDIANT_STATUS_FREE &&
      pxx.status !== ETUDIANT_STATUS_DONE
    ) {
      pxx.status = ETUDIANT_STATUS_FREE;
      await this.pStore.maintainsDoc(pxx);
    }
  } // remove
  //
  public async saveEtudAffectationAsync(
    p: IEtudAffectationDoc
  ): Promise<IEtudAffectationDoc> {
    const affectationid = p.affectationid;
    const etudiantid = p.etudiantid.trim();
    const d1 = p.startdate;
    const d2 = p.enddate;
    if (
      affectationid.length < 1 ||
      etudiantid.length < 1 ||
      d1.length < 1 ||
      d2.length < 1 ||
      d1 > d2
    ) {
      throw new TypeError("Cannot save etud affectation");
    }
    const pEtud = await this.fetchEtudiantByIdAsync(etudiantid);
    const pAff = await this.fetchAffectationByIdAsync(affectationid);
    if (pEtud.id !== etudiantid || pAff.id !== affectationid){
      throw new TypeError("Invalid parent(s)");
    }
    if (pAff.startdate.length > 0 && pAff.enddate.length > 0){
      if (d1 < pAff.startdate || d2 > pAff.enddate) {
        throw new TypeError("Cannot save etud affectation. Bad date(s)...");
      }
    }
    const semestreid = pAff.semestreid;
    const groupeid = pAff.groupeid;
    const anneeid = pAff.anneeid;
    const sel1: any = {
      anneeid: { $eq: anneeid },
      etudiantid: { $eq: etudiantid },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    const pxx: IItemEtudAffectation[] = await this.pStore.findAllDocsBySelector(
      sel1
    );
    const nx = pxx.length;
    for (let i = 0; i < nx; i++) {
      const x = pxx[i];
      if (x.semestreid === semestreid && x.groupeid !== groupeid) {
        const dx1 = x.startdate as string;
        const dx2 = x.enddate as string;
        if ((d1 >= dx1 && d1 <= dx2) || (d2 >= dx1 && d2 <= dx2)) {
          throw new TypeError(
            "Cannot save etud affectation. Overlapping date(s)..."
          );
        } //
      } // same semestre
    } // i
    const doc: any = {
      affectationid,
      anneeid,
      enddate: d2,
      etudiantid,
      groupeid,
      observations: p.observations.trim(),
      ownerid: p.ownerid,
      semestreid,
      startdate: d1,
      type: TYPE_ETUD_AFFECTATION
    };
    const sel: any = {
      affectationid: { $eq: affectationid },
      etudiantid: { $eq: etudiantid },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    const pp = await this.pStore.findDocsBySelector(sel, 0, 1, ["_id"]);
    if (pp.length > 0) {
      const x = pp[0];
      doc._id = x._id;
    } else if (p.id.trim().length > 0){
      doc._id = p.id.trim();
    }
    const docid = await this.pStore.maintainsDoc(doc);
    await this.changeEtudiantStatusAsync(p.etudiantid, ETUDIANT_STATUS_BUSY);
    return this.loadEtudAffectationByIdAsync(docid);
  } // saveAsync
  //
  public async getEtudAffectationsCountAsync(
    anneeid: string,
    semestreid: string,
    groupeid: string
  ): Promise<number> {
    if (groupeid.length < 1 || semestreid.length < 1 || anneeid.length < 1) {
      return 0;
    }
    const sel: any = {
      anneeid: { $eq: anneeid },
      groupeid: { $eq: groupeid },
      semestreid: { $eq: semestreid },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    return this.pStore.findDocsCountBySelector(sel);
  } //  getEtudAffectationsCountAsync
  //
  public async getEtudAffectationsAsync(
    anneeid: string,
    semestreid: string,
    groupeid: string,
    offset: number,
    count: number
  ): Promise<IEtudAffectationDoc[]> {
    if (count < 1) {
      return [];
    }
    if (groupeid.length < 1 || semestreid.length < 1 || anneeid.length < 1) {
      return [];
    }
    const start = offset >= 0 ? offset : 0;
    const sel: any = {
      anneeid: { $eq: anneeid },
      groupeid: { $eq: groupeid },
      semestreid: { $eq: semestreid },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    const pp: IItemEtudAffectation[] = await this.pStore.findDocsBySelector(
      sel,
      start,
      count
    );
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const oTemp: Array<Promise<IEtudAffectationDoc>> = [];
    for (let i = 0; i < n; i++) {
      oTemp.push(this.convertEtudAffectationDocAsync(pp[i]));
    } // i
    const pRet = await Promise.all(oTemp);
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.fullname < b.fullname) {
          return -1;
        } else if (a.fullname > b.fullname) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getEtudAffectationsAsync
  //
  
  //
  public async getEtudiantAffectationsAsync(
    etudiantid: string
  ): Promise<IEtudAffectationDoc[]> {
    const sel: any = {
      etudiantid: { $eq: etudiantid },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    const pp: IItemEtudAffectation[] = await this.pStore.findAllDocsBySelector(
      sel
    );
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const oTemp: Array<Promise<IEtudAffectationDoc>> = [];
    for (let i = 0; i < n; i++) {
      oTemp.push(this.convertEtudAffectationDocAsync(pp[i]));
    } // i
    const pRet = await Promise.all(oTemp);
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.anneename > b.anneename) {
          return -1;
        } else if (a.anneename < b.anneename) {
          return 1;
        }
        if (a.semestrename > b.semestrename) {
          return -1;
        } else if (a.semestrename < b.semestrename) {
          return 1;
        }
        if (a.groupename < b.groupename) {
          return -1;
        } else if (a.groupename > b.groupename) {
          return 1;
        }
        return 0;
      });
    } // sort
    return pRet;
  } //
  //
  public async changeAnneeSemestreEtudiantsStatus(
    anneeid: string,
    semestreid: string,
    status: string
  ): Promise<void> {
    if (anneeid.length < 1 || semestreid.length < 1) {
      return;
    }
    const sel: any = {
      anneeid: { $eq: anneeid },
      semestreid: { $eq: semestreid },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    const pp = await this.pStore.findAllDocsBySelector(sel, ["etudiantid"]);
    const n = pp.length;
    if (n < 1) {
      return;
    }
    const oTemp: Array<Promise<IItemEtudiant>> = [];
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      const id = x.etudiantid;
      oTemp.push(this.pStore.findDocById(id));
    } // i
    const ppz = await Promise.all(oTemp);
    const docs: IItemEtudiant[] = [];
    const nx = ppz.length;
    for (let i = 0; i < nx; ++i) {
      const p = ppz[i];
      const xold = p.status !== undefined && p.status !== null ? p.status : "";
      if (xold !== status) {
        p.status = xold;
        docs.push(p);
      }
    } // i
    if (docs.length < 1) {
      return;
    }
    await this.pStore.maintainsManyDocs(docs);
  } // changeAnneeSemestreEtudiantsStatus
  //
} // class EtudAffectationManager
