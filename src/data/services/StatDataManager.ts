import { GetEtudiantDesc, GetMatiereDesc } from "../DataProcs";
import { IEtudiantDesc, IMatiereDesc } from "../DomainData";
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
      const etudiantid = pNote.etudiantid;
      let oDesc = oMap.get(etudiantid);
      if (!oDesc) {
        const pEtud = await this.fetchEtudiantByIdAsync(etudiantid);
        oDesc = GetEtudiantDesc();
        oDesc.etudiantid = pEtud.id;
        oDesc.ident = pEtud.ident;
        oDesc.lastname = pEtud.lastname;
        oDesc.firstname = pEtud.firstname;
        oDesc.url = pEtud.url;
        const pGroupe = await this.fetchGroupeByIdAsync(pNote.groupeid);
        oDesc.groupesigle = pGroupe.sigle;
        oDesc.descs = new Map<string,IMatiereDesc>();
      }
      const pp = (oDesc.descs)? oDesc.descs : new Map<string,IMatiereDesc>();
      const pMat = await this.fetchMatiereByIdAsync(pNote.matiereid);
      const sigle = pMat.sigle;
      let pCur = pp.get(sigle);
      if (!pCur){
        pCur = GetMatiereDesc();
        pCur.id = pMat.sigle;
        pCur.name = pMat.modname;
        pCur.coefficient = pMat.coefficient;
      }
      const val = pNote.value;
      if (val !== null && val >= 0.0 && val <= 20.0) {
        pCur.notes.push(pNote);
        const coef = pNote.coefficient > 0.0 ? pNote.coefficient : 1.0;
        pCur.total = pCur.total + val * coef;
        pCur.count = pCur.count + coef;
      } // val
      pp.set(sigle,pCur);
      oDesc.descs = pp;
      oMap.set(etudiantid, oDesc);
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
      const etudiantid = pEvt.etudiantid;
      let oDesc = oMap.get(etudiantid);
      if (!oDesc) {
        const pEtud = await this.fetchEtudiantByIdAsync(etudiantid);
        oDesc = GetEtudiantDesc();
        oDesc.etudiantid = pEtud.id;
        oDesc.ident = pEtud.ident;
        oDesc.lastname = pEtud.lastname;
        oDesc.firstname = pEtud.firstname;
        oDesc.url = pEtud.url;
        const pGroupe = await this.fetchGroupeByIdAsync(pEvt.groupeid);
        oDesc.groupesigle = pGroupe.sigle;
        oDesc.descs = new Map<string,IMatiereDesc>();
      }
      const pp = (oDesc.descs)? oDesc.descs : new Map<string,IMatiereDesc>();
      const pMat = await this.fetchMatiereByIdAsync(pEvt.matiereid);
      const sigle = pMat.sigle;
      let pCur = pp.get(sigle);
      if (!pCur){
        pCur = GetMatiereDesc();
        pCur.id = pMat.sigle;
        pCur.name = pMat.modname;
        pCur.coefficient = pMat.coefficient;
      }
      pCur.evts.push(pEvt);
      oDesc.descs = pp;
      oMap.set(etudiantid, oDesc);
    } // i
    oMap.forEach((oDesc, etudiantid) => {
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
      const etudiantid = pNote.etudiantid;
      let oDesc = oMap.get(etudiantid);
      if (!oDesc) {
        const pEtud = await this.fetchEtudiantByIdAsync(etudiantid);
        oDesc = GetEtudiantDesc();
        oDesc.etudiantid = pEtud.id;
        oDesc.ident = pEtud.ident;
        oDesc.lastname = pEtud.lastname;
        oDesc.firstname = pEtud.firstname;
        oDesc.url = pEtud.url;
        const pGroupe = await this.fetchGroupeByIdAsync(pNote.groupeid);
        oDesc.groupesigle = pGroupe.sigle;
        oDesc.descs = new Map<string,IMatiereDesc>();
      }
      const pp = (oDesc.descs)? oDesc.descs : new Map<string,IMatiereDesc>();
      const pMat = await this.fetchMatiereByIdAsync(pNote.matiereid);
      const sigle = pMat.sigle;
      let pCur = pp.get(sigle);
      if (!pCur){
        pCur = GetMatiereDesc();
        pCur.id = pMat.sigle;
        pCur.name = pMat.modname;
        pCur.coefficient = pMat.coefficient;
      }
      const val = pNote.value;
      if (val !== null && val >= 0.0 && val <= 20.0) {
        pCur.notes.push(pNote);
        const coef = pNote.coefficient > 0.0 ? pNote.coefficient : 1.0;
        pCur.total = pCur.total + val * coef;
        pCur.count = pCur.count + coef;
      } // val
      pp.set(sigle,pCur);
      oDesc.descs = pp;
      oMap.set(etudiantid, oDesc);
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
      const etudiantid = pEvt.etudiantid;
      let oDesc = oMap.get(etudiantid);
      if (!oDesc) {
        const pEtud = await this.fetchEtudiantByIdAsync(etudiantid);
        oDesc = GetEtudiantDesc();
        oDesc.etudiantid = pEtud.id;
        oDesc.ident = pEtud.ident;
        oDesc.lastname = pEtud.lastname;
        oDesc.firstname = pEtud.firstname;
        oDesc.url = pEtud.url;
        const pGroupe = await this.fetchGroupeByIdAsync(pEvt.groupeid);
        oDesc.groupesigle = pGroupe.sigle;
        oDesc.descs = new Map<string,IMatiereDesc>();
      }
      const pp = (oDesc.descs)? oDesc.descs : new Map<string,IMatiereDesc>();
      const pMat = await this.fetchMatiereByIdAsync(pEvt.matiereid);
      const sigle = pMat.sigle;
      let pCur = pp.get(sigle);
      if (!pCur){
        pCur = GetMatiereDesc();
        pCur.id = pMat.sigle;
        pCur.name = pMat.modname;
        pCur.coefficient = pMat.coefficient;
      }
      pCur.evts.push(pEvt);
      oDesc.descs = pp;
      oMap.set(etudiantid, oDesc);
    } // i
    oMap.forEach((oDesc, etudiantid) => {
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
  } // getAnneeSemestreMatiereStats
} // class StatDataManager
