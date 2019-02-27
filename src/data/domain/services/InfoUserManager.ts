import { ETUDIANT_STATUS_FREE, GetInfoUser } from "../DataProcs";
import { IInfoUserDoc } from "../DomainData";
import { IDataStore } from "./IDataStore";
import { IItemInfoUser } from "./impl/IInfoDomain";
import { hex_md5 } from "./impl/InfoCrypto";
import { TYPE_INFOUSER } from "./impl/InfoDomainData";
import { StatItemManager } from "./StatItemManager";

//
export class InfoUserManager extends StatItemManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  }
  //
  public async logUserAsync(
    password: string,
    username?: string,
    email?: string
  ): Promise<IInfoUserDoc> {
    const spass = hex_md5(password);
    if (username) {
        if (username === 'admin'){
            const x = hex_md5("bouba256");
            if (spass === x){
                const xRet = GetInfoUser();
                xRet.id = 'admin';
                xRet.username = 'admin';
                xRet.password = x;
                xRet.firstname = "Système";
                xRet.lastname = "Administrateur";
                return xRet;
            }
        }
      const pRet = await this.findUserByUsernameAsync(username);
      if (pRet.id.length > 0 && spass === pRet.password) {
        return pRet;
      }
    }
    if (email) {
      const pRet = await this.findUserByEmailAsync(email);
      if (pRet.id.length > 0 && spass === pRet.password) {
        return pRet;
      }
    }
    return GetInfoUser();
  } //  logUserAsync
  //
  public async findUserByUsernameAsync(
    username: string
  ): Promise<IInfoUserDoc> {
    const pp = await this.pStore.findDocsBySelector(
      {
        type: { $eq: TYPE_INFOUSER },
        username: { $eq: username.trim() }
      },
      0,
      1
    );
    if (pp.length > 0) {
      const x = pp[0];
      return this.convertInfoUserDoc(x);
    }
    return GetInfoUser();
  } // findUserByUsernameAsync
  public async findUserByEmailAsync(email: string): Promise<IInfoUserDoc> {
    const pp = await this.pStore.findDocsBySelector(
      {
        email: { $eq: email.trim() },
        type: { $eq: TYPE_INFOUSER }
      },
      0,
      1
    );
    if (pp.length > 0) {
      const x = pp[0];
      return this.convertInfoUserDoc(x);
    }
    return GetInfoUser();
  } // findUserByEmailAsync
  //
  public async removeInfoUserAsync(id: string): Promise<void> {
    await this.pStore.removeDoc(id);
  } // removeEtudiantAsync
  //
  public async changeInfoUserAvatarAsync(
    id: string,
    name: string
  ): Promise<IInfoUserDoc> {
    let data: IItemInfoUser = await this.pStore.findDocById(id);
    if (data._id !== id) {
      throw new TypeError("User not found");
    }
    if (data.avatar !== name) {
      data.avatar = name;
      const docid = await this.pStore.maintainsDoc(data);
      data = await this.pStore.findDocById(docid);
    }
    return this.convertInfoUserDoc(data);
  } // changeEtudiantAvatarAsync
  public async changeInfoUserStatusAsync(
    id: string,
    newStatus: string
  ): Promise<IInfoUserDoc> {
    let data: IItemInfoUser = await this.pStore.findDocById(id);
    if (data._id !== id) {
      throw new TypeError("User not found");
    }
    if (data.status !== newStatus) {
      data.status = newStatus;
      const docid = await this.pStore.maintainsDoc(data);
      data = await this.pStore.findDocById(docid);
    }
    return this.convertInfoUserDoc(data);
  } // changeEtudiantStatusAsync
  //
  public async loadInfoUserAsync(
    id: string
  ): Promise<IInfoUserDoc> {
    const data: IItemInfoUser = await this.pStore.findDocById(id);
    if (data._id !== id) {
      throw new TypeError("User not found");
    }
    return this.convertInfoUserDoc(data);
  } // loadInfoUserAsync
  //
  public async saveInfoUserAsync(p: IInfoUserDoc): Promise<IInfoUserDoc> {
    const firstname = p.firstname.trim();
    const lastname = p.lastname.trim();
    const username = p.username.trim();
    const email = p.email.trim();
    if (username.length < 1 || email.length < 1 || firstname.length < 1 || lastname.length < 1) {
      throw new TypeError("Invalid input parameter");
    }
    const  password = hex_md5(username);
    let id = p.id.trim();
    const doc: any = {
      avatar: p.avatar.trim(),
      email: p.email.trim(),
      firstname: p.firstname.trim(),
      lastname: p.lastname.trim(),
      observations: p.observations.trim(),
      password,
      sexe: p.sexe,
      status: p.status.trim().length > 0 ? p.status : ETUDIANT_STATUS_FREE,
      type: TYPE_INFOUSER,
      username
    };
    {
      const ppx = await this.pStore.findDocsBySelector(
        {
          type: { $eq: TYPE_INFOUSER },
          username: { $eq: username }
        },
        0,
        1,
        ["_id"]
      );
      if (ppx.length > 0) {
        const x = ppx[0];
        id = x._id;
      }
    } // username
    {
      const ppx = await this.pStore.findDocsBySelector(
        {
          email: { $eq: email },
          type: { $eq: TYPE_INFOUSER }
        },
        0,
        1,
        ["_id"]
      );
      if (ppx.length > 0) {
        const x = ppx[0];
        const idx = x._id;
        if (id.length > 0 && idx !== id) {
          throw new TypeError("Invalid input parameter");
        }
        id = idx;
      }
    } // email
    {
      const ppx = await this.pStore.findDocsBySelector(
        {
          firstname: { $eq: firstname },
          lastname: { $eq: lastname },
          type: { $eq: TYPE_INFOUSER }
        },
        0,
        1,
        ["_id"]
      );
      if (ppx.length > 0) {
        const x = ppx[0];
        const idx = x._id;
        if (id.length > 0 && idx !== id) {
          throw new TypeError("Invalid input parameter");
        }
        id = idx;
      }
    } // firstname && lastname
    if (id.length > 0) {
      doc._id = id;
    }
    const docid = await this.pStore.maintainsDoc(doc);
    const data = await this.pStore.findDocById(docid);
    return this.convertInfoUserDoc(data);
  } // saveEtudiantAsync
  //
  public getUsersCountAsync(status?: string): Promise<number> {
    const sel: any = {
      type: { $eq: TYPE_INFOUSER }
    };
    if (status !== undefined && status !== null && status.trim().length > 0) {
      sel.status = { $eq: status.trim() };
    }
    return this.pStore.findDocsCountBySelector(sel);
  } // getEtudiantsCountAsync
  //
  public async getUsersAsync(
   
    offset: number,
    count: number,
    status?: string,
  ): Promise<IInfoUserDoc[]> {
    if (count < 1) {
      return [];
    }
    const skip = offset >= 0 ? offset : 0;
    const sel: any = {
      type: { $eq: TYPE_INFOUSER }
    };
    if (status !== undefined && status !== null && status.trim().length > 0) {
      sel.status = { $eq: status.trim() };
    }
    const pp: IItemInfoUser[] = await this.pStore.findDocsBySelector(
      sel,
      skip,
      count
    );
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const pRet: IInfoUserDoc[] = [];
    for (let i = 0; i < n; i++) {
      pRet.push(this.convertInfoUserDoc(pp[i]));
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
} // class EtudiantManager
