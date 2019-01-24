import { GetEtudiantDesc, GetMatiereDesc } from "../DataProcs";
import { IEtudiantDesc, IEvtDoc, IMatiereDesc, INoteDoc } from '../DomainData';
import { AffectationManager } from "./AffectationManager";
import { IDataStore } from "./IDataStore";
import { TYPE_EVT, TYPE_NOTE } from "./impl/DomainData";
import { IItemEvt, IItemNote } from "./impl/IInfoDomain";
//
export class StatDataManager extends AffectationManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  public async getAnneeSemestreStats(
    anneeid: string,
    semestreid: string
  ): Promise<IEtudiantDesc[]> {
    const pRet: IEtudiantDesc[] = [];
    if (anneeid.length < 1 || semestreid.length < 1) {
      return pRet;
    }
    const oMap: Map<string, IEtudiantDesc> = new Map<string, IEtudiantDesc>();
    const sel1: any = {
      anneeid: { $eq: anneeid },
      semestreid: { $eq: semestreid },
      type: { $eq: TYPE_NOTE }
    };
    const nn: IItemNote[] = await this.pStore.findAllDocsBySelector(sel1);
    const n = nn.length;
    for (let i = 0; i < n; i++) {
      const pNote = await this.convertNoteDocAsync(nn[i]);
      this.registerItem(oMap,pNote);
    } // i
    const sel2: any = {
      anneeid: { $eq: anneeid },
      semestreid: { $eq: semestreid },
      type: { $eq: TYPE_EVT }
    };
    const vv: IItemEvt[] = await this.pStore.findAllDocsBySelector(sel2);
    const nx = vv.length;
    for (let i = 0; i < nx; i++) {
      const pEvt = await this.convertEvtDocAsync(vv[i]);
      this.registerItem(oMap, pEvt);
    } // i
    return this.summarizeItems(oMap);
  } // getAnneeSemestreStats
  public async getAnneeSemestreMatiereStats(
    anneeid: string,
    semestreid: string,
    matiereid: string
  ): Promise<IEtudiantDesc[]> {
    const pRet: IEtudiantDesc[] = [];
    if (anneeid.length < 1 || semestreid.length < 1 || matiereid.length < 1) {
      return pRet;
    }
    const oMap: Map<string, IEtudiantDesc> = new Map<string, IEtudiantDesc>();
    const sel1: any = {
      anneeid: { $eq: anneeid },
      matiereid: { $eq: matiereid },
      semestreid: { $eq: semestreid },
      type: { $eq: TYPE_NOTE }
    };
    const nn: IItemNote[] = await this.pStore.findAllDocsBySelector(sel1);
    const n = nn.length;
    for (let i = 0; i < n; i++) {
      const pNote = await this.convertNoteDocAsync(nn[i]);
      await this.registerItem(oMap,pNote);
    } // i
    const sel2: any = {
      anneeid: { $eq: anneeid },
      matiereid: { $eq: matiereid },
      semestreid: { $eq: semestreid },
      type: { $eq: TYPE_EVT }
    };
    const vv: IItemEvt[] = await this.pStore.findAllDocsBySelector(sel2);
    const nx = vv.length;
    for (let i = 0; i < nx; i++) {
      const pEvt = await this.convertEvtDocAsync(vv[i]);
      this.registerItem(oMap,pEvt);
    } // i
    return this.summarizeItems(oMap);
  } // getAnneeSemestreMatiereStats
  ////////////////////////////////////
  private summarizeItems( oMap: Map<string, IEtudiantDesc>): IEtudiantDesc[]{
    const pRet:IEtudiantDesc[] = [];
    oMap.forEach((oDesc,etudiantid) =>{
      pRet.push(oDesc);
      if (oDesc.descs){
        oDesc.descs.forEach((pm,sigle) =>{
          if (pm.count > 0){
            pm.value = Math.floor((pm.total /pm.count) * 10.0 + 0.5) /10.0;
          }// count
        });
      }// descs
    });
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.lastname < b.lastname) {
          return -1;
        } else if (a.lastname > b.lastname) {
          return 1;
        } 
        if (a.firstname < b.firstname) {
          return -1;
        } else if (a.firstname > b.firstname) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  }// summarizeItems
  private async registerItem( oMap: Map<string, IEtudiantDesc>,p:INoteDoc | IEvtDoc) {
      const etudiantid = p.etudiantid;
      let oDesc = oMap.get(etudiantid);
      if (!oDesc) {
        const pEtud = await this.fetchEtudiantByIdAsync(etudiantid);
        oDesc = GetEtudiantDesc();
        oDesc.etudiantid = pEtud.id;
        oDesc.ident = pEtud.ident;
        if (oDesc.ident.length < 1){
          oDesc.ident = pEtud.id;
        }
        oDesc.lastname = pEtud.lastname;
        oDesc.firstname = pEtud.firstname;
        oDesc.url = pEtud.url;
        oDesc.data = pEtud.data;
        const pGroupe = await this.fetchGroupeByIdAsync(p.groupeid);
        oDesc.groupesigle = pGroupe.sigle;
        oDesc.descs = new Map<string,IMatiereDesc>();
      }
      const pp = (oDesc.descs)? oDesc.descs : new Map<string,IMatiereDesc>();
      const pMat = await this.fetchMatiereByIdAsync(p.matiereid);
      const pUnite = await this.fetchUniteByIdAsync(pMat.uniteid);
      const sigle = pMat.sigle;
      let pCur = pp.get(sigle);
      if (!pCur){
        pCur = GetMatiereDesc();
        pCur.id = pMat.sigle;
        pCur.name = pMat.modname;
        pCur.unite = pUnite.sigle;
        pCur.coefficient = pMat.coefficient;
      }
      const pn = p as INoteDoc;
      if (pn.value !== undefined && pn.value !== null && pn.value >= 0 && pn.value <= 20.0){
        pCur.notes.push(pn);
        const coef = pn.coefficient > 0.0 ? pn.coefficient : 1.0;
        pCur.total = pCur.total + pn.value * coef;
        pCur.count = pCur.count + coef;
      } else {
        const pe = p as IEvtDoc;
        if (pe.genrestring !== undefined && pe.genrestring !== null &&pe.genrestring.length > 0){
          pCur.evts.push(pe);
        }
      }
      pp.set(sigle,pCur);
      oDesc.descs = pp;
      oMap.set(etudiantid, oDesc);
  }// registerItem
  //////////////////////////////////
} // class StatDataManager
