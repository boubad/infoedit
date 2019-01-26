import { ETUDIANT_STATUS_FREE } from "../DataProcs";
import { IEtudiantDoc, IOption } from "../DomainData";
import { GroupeManager } from "./GroupeManager";
import { IDataStore } from "./IDataStore";
import { TYPE_ETUDIANT } from "./impl/DomainData";
import { IItemEtudiant } from "./impl/IInfoDomain";
//
export class EtudiantManager extends GroupeManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  }
  //
  public async removeEtudiantAsync(id: string): Promise<void> {
    await this.pStore.removeDocsBySelector({ etudiantid: { $eq: id } });
    await this.pStore.removeDoc(id);
  } // removeEtudiantAsync
  //
  public async changeEtudiantAvatarAsync(
    id: string,
    name: string
  ): Promise<IEtudiantDoc> {
    let data: IItemEtudiant = await this.pStore.findDocById(id);
    if (data._id !== id) {
      throw new TypeError("Etudiant not found");
    }
    if (data.avatar !== name) {
      data.avatar = name;
      const docid = await this.pStore.maintainsDoc(data);
      data = await this.pStore.findDocById(docid);
    }
    return this.convertEtudiantDocAsync(data);
  } // changeEtudiantAvatarAsync
  public async changeEtudiantStatusAsync(
    id: string,
    newStatus: string
  ): Promise<IEtudiantDoc> {
    let data: IItemEtudiant = await this.pStore.findDocById(id);
    if (data._id !== id) {
      throw new TypeError("Etudiant not found");
    }
    if (data.status !== newStatus) {
      data.status = newStatus;
      const docid = await this.pStore.maintainsDoc(data);
      data = await this.pStore.findDocById(docid);
    }
    return this.convertEtudiantDocAsync(data);
  } // changeEtudiantStatusAsync
  //
  public async saveEtudiantAsync(p: IEtudiantDoc): Promise<IEtudiantDoc> {
    if (p.firstname.trim().length < 1 || p.lastname.trim().length < 1) {
      throw new TypeError("Invalid input parameter");
    }
    const doc: any = {
      avatar: p.avatar.trim(),
      data: p.data,
      email: p.email.trim(),
      firstname: p.firstname.trim(),
      ident: p.ident.trim(),
      lastname: p.lastname.trim(),
      observations: p.observations.trim(),
      ownerid: p.ownerid,
      redoublant: p.redoublant,
      sexe:p.sexe,
      status: p.status.trim().length > 0 ? p.status : ETUDIANT_STATUS_FREE,
      sup: p.sup,
      type: TYPE_ETUDIANT
    };
    const pp = await this.pStore.findDocsBySelector(
      {
        firstname: { $eq: p.firstname.trim() },
        lastname: { $eq: p.lastname.trim() },
        type: { $eq: TYPE_ETUDIANT }
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
    return this.loadEtudiantByIdAsync(docid);
  } // saveEtudiantAsync
  //
  public getEtudiantsCountAsync(status: string): Promise<number> {
    const sel: any = {
      type: { $eq: TYPE_ETUDIANT }
    };
    if (status !== undefined && status !== null && status.trim().length > 0) {
      sel.status = { $eq: status.trim() };
    }
    return this.pStore.findDocsCountBySelector(sel);
  } // getEtudiantsCountAsync
  //
  public async getEtudiantsAsync(
    status: string,
    offset: number,
    count: number
  ): Promise<IEtudiantDoc[]> {
    if (count < 1) {
      return [];
    }
    const skip = offset >= 0 ? offset : 0;
    const sel: any = {
      type: { $eq: TYPE_ETUDIANT }
    };
    if (status !== undefined && status !== null && status.trim().length > 0) {
      sel.status = { $eq: status.trim() };
    }
    const pp: IItemEtudiant[] = await this.pStore.findDocsBySelector(
      sel,
      skip,
      count
    );
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const pRet: IEtudiantDoc[] = [];
    for (let i = 0; i < n; i++) {
      pRet.push(await this.convertEtudiantDocAsync(pp[i]));
    } // i
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
    }
    return pRet;
  } // getEtudiantsAsync
  //
  public async getEtudiantsOptsByStatusAsync(
    status: string
  ): Promise<IOption[]> {
    const sel: any = {
      type: { $eq: TYPE_ETUDIANT }
    };
    if (status.trim().length > 0) {
      sel.status = { $eq: status.trim() };
    }
    const fields = ["_id", "firstname", "lastname", "avatar"];
    const pp = await this.pStore.findAllDocsBySelector(sel, fields);
    const n = pp.length;
    const oTemp: IOption[] = [];
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      const id = x._id as string;
      const last = x.lastname as string;
      const first = x.firstname as string;
      oTemp.push({
        id,
        text: last + " " + first,
        url: this.pStore.formBlobUrl(id, x.avatar)
      });
    } // i
    if (oTemp.length > 1) {
      oTemp.sort((a, b) => {
        if (a.text < b.text) {
          return -1;
        } else if (a.text > b.text) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    const pRet: IOption[] = [{ id: "", text: "" }];
    const nx = oTemp.length;
    for (let i = 0; i < nx; i++) {
      pRet.push(oTemp[i]);
    }
    return pRet;
  } // getEtudiantsAsync
  //
} // class EtudiantManager
