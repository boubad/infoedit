import { GetStatItem } from "../DataProcs";
import { IStatItemDoc } from "../DomainData";
import { ConvertNote } from "../NoteProcs";
import { BaseDataManager } from "./BaseDataManager";
import { IDataStore } from "./IDataStore";
import { IItemNote, IItemStat } from "./impl/IInfoDomain";
import { TYPE_ETUDIANT, TYPE_NOTE, TYPE_STAT } from "./impl/InfoDomainData";
//
interface IWorkItem {
  key: string;
  matieresigle: string;
  semestresigle: string;
  anneetag: string;
  count: number;
  total: number;
  value: number | null;
  result: string | null;
}
//
const STRING_COMMA = ",";
const STRING_TAG = "tag";
const STRING_ID = "_id";
const STRING_COEFF = "coefficient";
const STRING_NA = "NA";
//
export class StatItemManager extends BaseDataManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  //
  public async checkAllEtudiantsStatItem(): Promise<void> {
    const limit = 128;
    let nOffset = 0;
    const etudSel: any = {
      type: { $eq: TYPE_ETUDIANT }
    };
    const etudsFields = ["_id"];
    const nEtuds = await this.pStore.findDocsCountBySelector(etudSel);
    while (nOffset < nEtuds) {
      const aa = await this.pStore.findDocsBySelector(
        etudSel,
        nOffset,
        limit,
        etudsFields
      );
      const ny = aa.length;
      nOffset = nOffset + ny;
      for (let j = 0; j < ny; j++) {
        const y = aa[j];
        const etudiantid = y._id;
        await this.checkEtudiantStatItem(etudiantid);
      } // jEtudiant
    } // etuds
  } // checkAllEtudiantsStatItem
  //
  public async checkEtudiantStatItem(etudiantid: string): Promise<void> {
    const pEtud = await this.fetchEtudiantByIdAsync(etudiantid);
    if (pEtud.id !== etudiantid) {
      return;
    }
    const oCoeffsMap: Map<string, number> = new Map<string, number>();
    const anneesMap: Map<string, string> = new Map<string, string>();
    const semestresMap: Map<string, string> = new Map<string, string>();
    const matieresMap: Map<string, string> = new Map<string, string>();
    const oMap: Map<string, IWorkItem> = new Map<string, IWorkItem>();
    const sel: any = {
      etudiantid: { $eq: etudiantid },
      type: { $eq: TYPE_NOTE }
    };
    const nTotal = await this.pStore.findDocsCountBySelector(sel);
    let offset = 0;
    const limit = 128;
    while (offset < nTotal) {
      const nn: IItemNote[] = await this.pStore.findDocsBySelector(
        sel,
        offset,
        limit
      );
      const n = nn.length;
      offset = offset + n;
      for (let i = 0; i < n; i++) {
        const p = nn[i];
        if (p.value) {
          const controleid = p.controleid ? p.controleid : "";
          if (controleid.length < 1) {
            continue;
          }
          let coef: number = 1.0;
          let c = oCoeffsMap.get(controleid);
          if (c && c > 0) {
            coef = c;
          } else {
            const pp = await this.pStore.findDocsBySelector(
              { id: { $eq: controleid } },
              0,
              1,
              [STRING_COEFF]
            );
            if (pp.length > 0) {
              const x = pp[0];
              c = x.coefficient;
              if (c && c > 0) {
                coef = c;
              } else {
                coef = 1.0;
              }
              oCoeffsMap.set(controleid, coef);
            } else {
              continue;
            }
          }
          let anneesigle = "";
          const anneeid = p.anneeid ? p.anneeid : "";
          if (anneeid.length < 1) {
            continue;
          }
          const px = anneesMap.get(anneeid);
          if (px) {
            anneesigle = px;
          } else {
            const pp = await this.pStore.findDocsBySelector(
              { id: { $eq: anneeid } },
              0,
              1,
              [STRING_TAG]
            );
            if (pp.length > 0) {
              const x = pp[0];
              anneesigle = x.tag;
              anneesMap.set(anneeid, anneesigle);
            } else {
              continue;
            }
          }
          let semestresigle = "";
          const semestreid = p.semestreid ? p.semestreid : "";
          if (semestreid.length < 1) {
            continue;
          }
          const px1 = semestresMap.get(semestreid);
          if (px1) {
            semestresigle = px1;
          } else {
            const pp = await this.pStore.findDocsBySelector(
              { id: { $eq: semestreid } },
              0,
              1,
              [STRING_TAG]
            );
            if (pp.length > 0) {
              const x = pp[0];
              semestresigle = x.tag;
              semestresMap.set(semestreid, semestresigle);
            } else {
              continue;
            }
          }
          let matieresigle = "";
          const matiereid = p.matiereid ? p.matiereid : "";
          if (matiereid.length < 1) {
            continue;
          }
          const px2 = matieresMap.get(matiereid);
          if (px2) {
            semestresigle = px2;
          } else {
            const pp = await this.pStore.findDocsBySelector(
              { id: { $eq: matiereid } },
              0,
              1,
              [STRING_TAG]
            );
            if (pp.length > 0) {
              const x = pp[0];
              matieresigle = x.tag;
              matieresMap.set(matiereid, matieresigle);
            } else {
              continue;
            }
          }
          const key = anneesigle + semestresigle + matieresigle;
          let item = oMap.get(key);
          if (!item) {
            item = {
              key,
              matieresigle,
              semestresigle,
              // tslint:disable-next-line:object-literal-sort-keys
              anneetag: anneesigle,
              count: 0,
              total: 0,
              result:null,
              value: null
            };
          }
          if (p.value && p.value >= 0 && p.value <= 20.0) {
            item.count = item.count + coef;
            item.total = item.total + coef * p.value;
          }
          oMap.set(key, item);
        } // p.value
      } // i
    } // while
    const xMap:Map<string,IWorkItem[]> = new Map<string,IWorkItem[]>();
    let bRegister:boolean = false;
    oMap.forEach((item,key) =>{
      if (item.count > 0) {
        const note = item.total / item.count;
        const nx = ConvertNote(note);
        if (nx) {
          item.result = nx.sval;
          bRegister = true;
        }
      }
       const vx = item.anneetag;
       let dd = xMap.get(vx);
       if (dd){
         dd.push(item);
       } else {
         dd = [];
         dd.push(item);
         xMap[vx] = dd;
       }
    });
    if (!bRegister){
      return;
    }
    xMap.forEach(async (items,anneetag) =>{
      let bExists = false;
      items.forEach((item) =>{
        if (item.result && item.count > 0){
          bExists = true;
        }
      }); // item
      if (bExists){
         const vd:any = {};
         items.forEach((item) =>{
          if (item.count > 0 && item.result){
            const sk = item.semestresigle + item.matieresigle;
            vd[sk] = item.result;
          }// ok
         });
         const pItem = GetStatItem();
         pItem.data = vd;
         pItem.etudiantid = etudiantid;
         pItem.anneetag = anneetag;
         const pz = await this.saveStatItemAsync(pItem);
         if (pz.id.length < 1) {
           throw new TypeError("Cannot save statitem");
         }
      }// Exists
    }); // items
  } // checkEtudiantStatItem
  ////
  public async removeStatItemAsync(id: string): Promise<void> {
    await this.pStore.removeDoc(id);
  } // removeStatItemAsync
  //
  public async saveStatItemAsync(p: IStatItemDoc): Promise<IStatItemDoc> {
    const etudiantid = p.etudiantid.trim();
    if (etudiantid.length < 1) {
      throw new TypeError("Cannot save statitem");
    }
    const pEtud = await this.fetchEtudiantByIdAsync(etudiantid);
    const doc: any = {
      anneetag: p.anneetag,
      data: p.data,
      etudiantid: p.etudiantid,
      ident: pEtud.ident,
      type: TYPE_STAT
    };
    const pp: any[] = await this.pStore.findDocsBySelector(
      {
        etudiantid: { $eq: etudiantid },
        type: { $eq: TYPE_STAT }
      },
      0,
      1,
      [STRING_ID]
    );
    if (pp.length > 0) {
      const x = pp[0];
      doc._id = x._id;
    } else if (p.id.trim().length > 0) {
      doc._id = p.id.trim();
    }
    const docid = await this.pStore.maintainsDoc(doc);
    return await this.loadStatItemByIdAsync(docid);
  } // saveStatItemAsync
  //
  public getStatItemsCountAsync(): Promise<number> {
    const sel: any = {
      type: { $eq: TYPE_STAT }
    };
    return this.pStore.findDocsCountBySelector(sel);
  } // getStatItemsCountAsync
  public async getStatItemsAsync(
    offset: number,
    count: number
  ): Promise<IStatItemDoc[]> {
    if (count < 1) {
      return [];
    }
    const sel: any = {
      type: { $eq: TYPE_STAT }
    };
    const skip = offset >= 0 ? offset : 0;
    const pp: IItemStat[] = await this.pStore.findDocsBySelector(
      sel,
      skip,
      count
    );
    const pRet: IStatItemDoc[] = [];
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      pRet.push(this.convertStatItemDoc(pp[i]));
    }
    return pRet;
  } // getStatItemsAsync
  //
  public async getStatItemsTextAsync(): Promise<string[]> {
    const sel: any = {
      type: { $eq: TYPE_STAT }
    };
    const nTotal = await this.pStore.findDocsCountBySelector(sel);
    let nOffset = 0;
    const limit = 128;
    const varsMap: Map<string, string> = new Map<string, string>();
    while (nOffset < nTotal) {
      const pp: IItemStat[] = await this.pStore.findDocsBySelector(
        sel,
        nOffset,
        limit
      );
      const np = pp.length;
      nOffset = nOffset + np;
      for (let i = 0; i < np; i++) {
        const p = pp[i];
        const data = p.data;
        // tslint:disable-next-line:forin
        for (const key in data) {
          const v = "" + data[key];
          if (v.trim().length > 0) {
            if (!varsMap.get(key)) {
              varsMap.set(key, key);
            }
          } // ok
        } // key
      } // i
    } // offset
    const sRes: string[] = [];
    let title: string = "";
    varsMap.forEach(key => {
      if (title.length > 0) {
        title = title + STRING_COMMA;
      }
      title = title + key;
    });
    sRes.push(title);
    nOffset = 0;
    while (nOffset < nTotal) {
      const pp: IItemStat[] = await this.pStore.findDocsBySelector(
        sel,
        nOffset,
        limit
      );
      const np = pp.length;
      nOffset = nOffset + np;
      for (let i = 0; i < np; i++) {
        let cur = "";
        const p = pp[i];
        const data = p.data;
        let bRegister = false;
        varsMap.forEach(key => {
          if (cur.length > 0) {
            cur = cur + STRING_COMMA;
          }
          let sx = "";
          if (data[key] !== undefined && data[key] !== null) {
            const v = "" + data[key];
            sx = v.trim();
          }
          if (sx.length < 1) {
            cur = cur + STRING_NA;
          } else {
            cur = cur + sx;
            bRegister = true;
          }
        });
        if (bRegister) {
          sRes.push(cur);
        }
      } // i
    } // nOffset
    return sRes;
  } // getStatItemsTextAsync
} // class StatItemManager
