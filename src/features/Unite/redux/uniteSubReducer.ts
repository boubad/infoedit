import produce from "immer";
import { GetUnite } from "../../../data/DataProcs";
import { IUniteDoc } from "../../../data/DomainData";
import {
  CHANGE_UNITE_SUCCESS,
  REFRESH_ALL_SUCCESS
} from "../../../features/AppState/redux/AppStateActions";
import { IBaseState, IInfoState } from "../../../redux/InfoState";
import { InfoAction, IPayload } from "../../../redux/IPayload";
import { GetInitialUnite } from "../../../redux/StateProcs";
import {
  CANCEL_UNITE_ITEM,
  CHANGE_UNITE_FIELD,
  CREATE_UNITE_ITEM,
  GOTO_PAGE_UNITE_BEGIN,
  GOTO_PAGE_UNITE_SUCCESS,
  REMOVE_UNITE_ITEM_BEGIN,
  REMOVE_UNITE_ITEM_SUCCESS,
  SAVE_UNITE_ITEM_BEGIN,
  SAVE_UNITE_ITEM_SUCCESS,
  SELECT_UNITE_ITEM,
  UNITE_REMOVE_ATTACHMENT_BEGIN,
  UNITE_REMOVE_ATTACHMENT_SUCCESS,
  UNITE_SAVE_ATTACHMENT_BEGIN,
  UNITE_SAVE_ATTACHMENT_SUCCESS
} from "./UniteActions";
////////////////////////////////////
function refreshUnite(
  state: IBaseState<IUniteDoc>,
  p: IPayload
): IBaseState<IUniteDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.page) {
      pRet.currentPage = p.page;
    }
    if (p.unitesCount) {
      const n = p.unitesCount;
      pRet.itemsCount = n;
      const nc = pRet.pageSize;
      let np = Math.floor(n / nc);
      if (n % nc !== 0) {
        np = np + 1;
      }
      pRet.pagesCount = np;
    }
    if (p.unites) {
      pRet.pageData = p.unites;
    }
    if (p.unite) {
      pRet.current = p.unite;
    }
    pRet.addMode = false;
  });
} // refreshUnite
/////////////////////////////////////////////
export function uniteSubReducer(
  state: IInfoState,
  action: InfoAction
): IBaseState<IUniteDoc> {
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SAVE_UNITE_ITEM_BEGIN:
    case REMOVE_UNITE_ITEM_BEGIN:
    case UNITE_SAVE_ATTACHMENT_BEGIN:
    case UNITE_REMOVE_ATTACHMENT_BEGIN:
    case GOTO_PAGE_UNITE_BEGIN:
      return produce(state.unites, pRet => {
        pRet.busy = true;
      });
    case CREATE_UNITE_ITEM:
      return produce(state.unites, pRet => {
        pRet.addMode = true;
        pRet.busy = false;
        pRet.current = GetInitialUnite(state);
      });
    case REFRESH_ALL_SUCCESS:
    case UNITE_REMOVE_ATTACHMENT_SUCCESS:
    case UNITE_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_UNITE_SUCCESS:
    case CHANGE_UNITE_SUCCESS:
    case SAVE_UNITE_ITEM_SUCCESS:
    case REMOVE_UNITE_ITEM_SUCCESS:
    case CHANGE_UNITE_SUCCESS:
      return refreshUnite(state.unites, p);
    case SELECT_UNITE_ITEM:
      return produce(state.unites, pRet => {
        pRet.busy = false;
        if (p.id) {
          const id = p.id;
          const px = state.unites.pageData.find(x => {
            return x.id === id;
          });
          if (px) {
            pRet.current = Object.assign({}, px);
            pRet.addMode = false;
          } else {
            pRet.current = GetUnite();
          }
        } // id
      });
    case CANCEL_UNITE_ITEM:
      return produce(state.unites, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find(x => {
          return x.id === id;
        });
        if (px) {
          pRet.current = Object.assign({}, px);
        } else {
          pRet.current = GetUnite();
        }
        pRet.previousId = "";
      });
    case CHANGE_UNITE_FIELD:
      return produce(state.unites, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.current;
          switch (p.field) {
            case "observations":
              pz.observations = val;
              pz.modified = true;
              break;
            case "name":
              pz.name = val;
              pz.modified = true;
              break;
            case "sigle":
              pz.sigle = val;
              pz.modified = true;
              break;
            default:
              break;
          } // field
        } // p
        pRet.busy = false;
      });
    default:
      return produce(state.unites, pRet => {
        pRet.busy = false;
      });
  } // type
} // uniteSubReducer
