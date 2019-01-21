import { GetEtudiantDesc } from "../DataProcs";
import { IEtudiantDesc } from "../DomainData";
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
        oDesc = GetEtudiantDesc();
        oDesc.etudiantid = etudiantid;
        oDesc.fullname = pNote.fullname;
        oDesc.url = pNote.url;
      }
      const val = pNote.value;
      if (val !== null && val >= 0.0 && val <= 20.0) {
        oDesc.notes.push(pNote);
        const coef = pNote.coefficient > 0.0 ? pNote.coefficient : 1.0;
        oDesc.total = oDesc.total + val * coef;
        oDesc.count = oDesc.count + coef;
      } // val
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
        oDesc = GetEtudiantDesc();
        oDesc.etudiantid = etudiantid;
        oDesc.fullname = pEvt.fullname;
        oDesc.url = pEvt.url;
      }
      oDesc.evts.push(pEvt);
      oMap.set(etudiantid, oDesc);
    } // i
    oMap.forEach((oDesc, etudiantid) => {
      if (oDesc.count > 0) {
        const v = Math.floor((oDesc.total / oDesc.count) * 10.0 + 0.5) / 10.0;
        oDesc.value = v;
      }
      pRet.push(oDesc);
    });
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
  } // getAnneeSemestreMatiereStats
} // class StatDataManager
