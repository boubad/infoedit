import { FluxStandardAction } from "flux-standard-action";
import produce from "immer";
import { GetInitialUserState } from "src/data/state/stores/initialState";
import { GetInfoUser } from "../../../data/domain/DataProcs";
import { IInfoUserDoc } from "../../../data/domain/DomainData";
import { IBaseState } from "../../../data/state/InfoState";
import { IPayload } from "../../../data/state/IPayload";
import {
  CANCEL_INFOUSER_ITEM,
  CHANGE_INFOUSER_FIELD,
  CREATE_INFOUSER_ITEM,
  GOTO_PAGE_INFOUSER_BEGIN,
  GOTO_PAGE_INFOUSER_SUCCESS,
  INFOUSER_REMOVE_ATTACHMENT_BEGIN,
  INFOUSER_REMOVE_ATTACHMENT_SUCCESS,
  INFOUSER_SAVE_ATTACHMENT_BEGIN,
  INFOUSER_SAVE_ATTACHMENT_SUCCESS,
  REMOVE_INFOUSER_ITEM_BEGIN,
  REMOVE_INFOUSER_ITEM_SUCCESS,
  SAVE_INFOUSER_ITEM_BEGIN,
  SAVE_INFOUSER_ITEM_SUCCESS,
  SELECT_INFOUSER_BEGIN,
  SELECT_INFOUSER_SUCCESS,
  SET_USERAVATAR_BEGIN,
  SET_USERAVATAR_SUCCESS
} from "./InfoUserActions";
//////////////////////////////////////////
function refreshInfoUser(
  state: IBaseState<IInfoUserDoc>,
  p: IPayload
): IBaseState<IInfoUserDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.page) {
      pRet.currentPage = p.page;
    }
    if (p.usersCount) {
      const n = p.usersCount;
      pRet.itemsCount = n;
      const nc = pRet.pageSize;
      let np = Math.floor(n / nc);
      if (n % nc !== 0) {
        np = np + 1;
      }
      pRet.pagesCount = np;
    }
    if (p.users) {
      pRet.pageData = p.users;
    }
    if (p.user) {
      pRet.current = p.user;
      const bb: IInfoUserDoc[] = [];
      const pp = pRet.pageData;
      const n = pp.length;
      const id = p.user.id;
      for (let i = 0; i < n; i++) {
        const x = pp[i];
        if (x.id === id) {
          bb.push(p.user);
        } else {
          bb.push(x);
        }
      } // i
      pRet.pageData = bb;
    }
    pRet.addMode = false;
  });
} // refreshInfoUser
/////////////////////////////////////////////
export function infoUserSubReducer(
  state: IBaseState<IInfoUserDoc>,
  action: FluxStandardAction<IPayload>
): IBaseState<IInfoUserDoc> {
  if (!state) {
    return GetInitialUserState();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SELECT_INFOUSER_BEGIN:
    case SAVE_INFOUSER_ITEM_BEGIN:
    case REMOVE_INFOUSER_ITEM_BEGIN:
    case INFOUSER_SAVE_ATTACHMENT_BEGIN:
    case INFOUSER_REMOVE_ATTACHMENT_BEGIN:
    case SET_USERAVATAR_BEGIN:
    case GOTO_PAGE_INFOUSER_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case CREATE_INFOUSER_ITEM:
      return produce(state, pRet => {
        pRet.previousId = pRet.current.id;
        pRet.current = GetInfoUser();
        pRet.addMode = true;
        pRet.busy = false;
      });
    case SET_USERAVATAR_SUCCESS:
    case GOTO_PAGE_INFOUSER_SUCCESS:
    case SELECT_INFOUSER_SUCCESS:
    case SAVE_INFOUSER_ITEM_SUCCESS:
    case REMOVE_INFOUSER_ITEM_SUCCESS:
    case INFOUSER_SAVE_ATTACHMENT_SUCCESS:
    case INFOUSER_REMOVE_ATTACHMENT_SUCCESS:
      return refreshInfoUser(state, p);
    case REMOVE_INFOUSER_ITEM_SUCCESS: {
      const px = refreshInfoUser(state, p);
      return produce(px, pRet => {
        pRet.current = GetInfoUser();
        pRet.busy = false;
      });
    }
    case CANCEL_INFOUSER_ITEM:
      return produce(state, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find(x => {
          return x.id === id;
        });
        if (px !== undefined) {
          pRet.current = Object.assign({}, px);
        } else {
          pRet.current = GetInfoUser();
        }
        pRet.previousId = "";
      });
    case CHANGE_INFOUSER_FIELD:
      return produce(state, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.current;
          switch (p.field) {
            case "username":
              pz.username = val;
              pz.modified = true;
              break;
            case "password":
              pz.password = val;
              pz.modified = true;
              break;
            case "sexe":
              pz.sexe = val;
              pz.modified = true;
              break;
            case "email":
              pz.email = val;
              pz.modified = true;
              break;
            case "firstname":
              pz.firstname = val;
              pz.modified = true;
              break;
            case "lastname":
              pz.lastname = val;
              pz.modified = true;
              break;
            case "observations":
              pz.observations = val;
              pz.modified = true;
              break;
            case "status":
              pz.status = val;
              pz.modified = true;
              break;
          } // field
        } // p
        pRet.busy = false;
      });
    default:
      return produce(state, pRet => {
        pRet.busy = false;
      });
  } // type
} // etudiantSubReducer
