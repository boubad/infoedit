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
  anneesigle: string;
  count: number;
  total: number;
  value: number | null;
}
//
export class StatItemManager extends BaseDataManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  //
  public async checkAllEtudiantsStatItem(): Promise<void> {
    const oCoeffsMap: Map<string, number> = new Map<string, number>();
    const anneesMap: Map<string, string> = new Map<string, string>();
    const semestresMap: Map<string, string> = new Map<string, string>();
    const matieresMap: Map<string, string> = new Map<string, string>();
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
        const pEtud = await this.fetchEtudiantByIdAsync(etudiantid);
        if (pEtud.id !== etudiantid) {
          continue;
        }
        const oMap: Map<string, IWorkItem> = new Map<string, IWorkItem>();
        const sel: any = {
          etudiantid: { $eq: etudiantid },
          type: { $eq: TYPE_NOTE }
        };
        const nTotal = await this.pStore.findDocsCountBySelector(sel);
        let offset = 0;
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
                  ["coefficient"]
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
                  ["sigle"]
                );
                if (pp.length > 0) {
                  const x = pp[0];
                  anneesigle = x.sigle;
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
                  ["sigle"]
                );
                if (pp.length > 0) {
                  const x = pp[0];
                  semestresigle = x.sigle;
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
                  ["sigle"]
                );
                if (pp.length > 0) {
                  const x = pp[0];
                  matieresigle = x.sigle;
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
                  anneesigle,
                  count: 0,
                  total: 0,
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
        const dataRes: any = {};
        oMap.forEach((item, key) => {
          if (item.count > 0) {
            const note = item.total / item.count;
            const nx = ConvertNote(note);
            if (nx) {
              dataRes[key] = nx.ival;
            }
          }
        });
        dataRes.sexe = pEtud.sexe;
        dataRes.redoublant = pEtud.redoublant;
        dataRes.sup = pEtud.sup;
        const data = Object.assign(dataRes, pEtud.data);
        const pItem = GetStatItem();
        pItem.data = data;
        pItem.etudiantid = etudiantid;
        await this.saveStatItemAsync(pItem);
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
              ["coefficient"]
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
              ["sigle"]
            );
            if (pp.length > 0) {
              const x = pp[0];
              anneesigle = x.sigle;
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
              ["sigle"]
            );
            if (pp.length > 0) {
              const x = pp[0];
              semestresigle = x.sigle;
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
              ["sigle"]
            );
            if (pp.length > 0) {
              const x = pp[0];
              matieresigle = x.sigle;
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
              anneesigle,
              count: 0,
              total: 0,
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
    const dataRes: any = {};
    oMap.forEach((item, key) => {
      if (item.count > 0) {
        const note = item.total / item.count;
        const nx = ConvertNote(note);
        if (nx) {
          dataRes[key] = nx.ival;
        }
      }
    });
    dataRes.sexe = pEtud.sexe;
    dataRes.redoublant = pEtud.redoublant;
    dataRes.sup = pEtud.sup;
    const data = Object.assign(dataRes, pEtud.data);
    const pItem = GetStatItem();
    pItem.data = data;
    pItem.etudiantid = etudiantid;
    const pz = await this.saveStatItemAsync(pItem);
    if (pz.id.length < 1) {
      throw new TypeError("Cannot save statitem");
    }
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
    const doc: any = {
      data: p.data,
      etudiantid: p.etudiantid,
      type: TYPE_STAT
    };
    const pp: any[] = await this.pStore.findDocsBySelector(
      {
        etudiantid: { $eq: etudiantid },
        type: { $eq: TYPE_STAT }
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
} // class StatItemManager
