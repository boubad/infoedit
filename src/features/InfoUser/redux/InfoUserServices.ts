import { GetInfoUser } from '../../../data/domain/DataProcs';
import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';

//
export class InfoUserServices {
  //
  public static createInfoUser(): IPayload {
    return { user: GetInfoUser() };
  } // createEtudAffectation
  //
  public static async logUserAsync(state:IInfoState, password:string,username:string,email:string) : Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const pRet: IPayload = {
        user: await pMan.logUserAsync(password,username,email)
      };
      return pRet;
  }// logUserAsync
  public static async logOutUserAsync(state:IInfoState, password:string,username:string,email:string) : Promise<IPayload> {
    const pRet: IPayload = {
        user: GetInfoUser()
      };
      return pRet;
  }// logOutUserAsync
  //
  public static async refreshInfoUserAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const pRet: IPayload = {
      user: await pMan.loadInfoUserAsync(id)
    };
    return pRet;
  } // refreshEtudiantAsync
  public static async setInfoUserAvatarAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = Object.assign({}, state.users.current);
    p.avatar = name;
    await pMan.saveInfoUserAsync(p);
    return InfoUserServices.refreshInfoUserAsync(state, p.id);
  } // setInfoUserAvatar
  //
  public static async saveInfoUserAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.users.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    return InfoUserServices.refreshInfoUserAsync(state, state.users.current.id);
  } // saveInfoUserAttachment
  public static async removeInfoUserAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.users.current.id;
    await pMan.removeAttachmentAsync(id, name);
    return InfoUserServices.refreshInfoUserAsync(state, state.users.current.id);
  } // removeInfoUserAttachment
  //
  public static async removeInfoUserAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    await pMan.removeInfoUserAsync(state.users.current.id);
    const pRet:IPayload = {};
    const n = await pMan.getUsersCountAsync();
    const pp = await pMan.getUsersAsync(0,state.users.pageSize);
    pRet.usersCount = n;
    pRet.users = pp;
    return pRet;
  } // removeInfoUser
  //
  public static async saveInfoUserAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    await pMan.saveInfoUserAsync(state.users.current);
    const pRet:IPayload = {};
    const n = await pMan.getUsersCountAsync();
    const pp = await pMan.getUsersAsync(0,state.users.pageSize);
    pRet.usersCount = n;
    pRet.users = pp;
    return pRet;
  } // saveInfoUser
  //
  public static async selectInfoUserAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const p = state.users.pageData.find((x) =>{
        return (x.id === id);
    }) ;
    if (p){
        const pRet:IPayload = {};
        pRet.user = p;
        return pRet;
    } 
    return this.refreshInfoUserAsync(state,id);
  } // selectInfoUserAsync
  //
  public static async gotoPageInfoUserAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getUsersCountAsync();
    if (page < 1) {
      page = 1;
    }
    const count = state.users.pageSize;
    let offset = (page - 1) * count;
    if (offset + count > nTotal) {
      offset = nTotal - count;
      if (offset < 0) {
        offset = 0;
      }
    }
    const users = await pMan.getUsersAsync(offset, count);
    return {
      page,
      users,
      usersCount: nTotal,
    };
  } // gotoPageInfoUser
  //
  public static refreshInfoUsersAsync(
    state: IInfoState
  ): Promise<IPayload> {
    return InfoUserServices.gotoPageInfoUserAsync(state,1);
  } // RefreshInfoUsers
  //
} // class InfoUserServices
