import { FluxStandardAction } from "flux-standard-action";
import produce from "immer";
import { GetGroupe } from "../../../data/DataProcs";
import { IGroupeDoc } from "../../../data/DomainData";
import {
  CHANGE_GROUPE_SUCCESS,
  REFRESH_ALL_SUCCESS
} from "../../../features/AppState/redux/AppStateActions";
import { IBaseState, IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";
import { GetInitialGroupe } from "../../../redux/StateProcs";
import {
  CANCEL_GROUPE_ITEM,
  CHANGE_GROUPE_FIELD,
  CREATE_GROUPE_ITEM,
  GOTO_PAGE_GROUPE_SUCCESS,
  GROUPE_REMOVE_ATTACHMENT_BEGIN,
  GROUPE_REMOVE_ATTACHMENT_SUCCESS,
  GROUPE_SAVE_ATTACHMENT_BEGIN,
  GROUPE_SAVE_ATTACHMENT_SUCCESS,
  REMOVE_GROUPE_ITEM_BEGIN,
  REMOVE_GROUPE_ITEM_SUCCESS,
  SAVE_GROUPE_ITEM_BEGIN,
  SAVE_GROUPE_ITEM_SUCCESS,
  SELECT_GROUPE_ITEM
} from "./GroupeActions";
////////////////////////////////////
function refreshGroupe(
  state: IBaseState<IGroupeDoc>,
  p: IPayload
): IBaseState<IGroupeDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.page) {
      pRet.currentPage = p.page;
    }
    if (p.groupesCount) {
      const n = p.groupesCount;
      pRet.itemsCount = n;
      const nc = pRet.pageSize;
      let np = Math.floor(n / nc);
      if (n % nc !== 0) {
        np = np + 1;
      }
      pRet.pagesCount = np;
    }
    if (p.groupes) {
      pRet.pageData = p.groupes;
    }
    if (p.groupe) {
      pRet.current = p.groupe;
    } else {
      pRet.current = GetGroupe();
    }
    pRet.addMode = false;
  });
} // refreshGroupe
/////////////////////////////////////////////
export function groupeSubReducer(
  state: IInfoState,
  action: FluxStandardAction<IPayload>
): IBaseState<IGroupeDoc> {
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SAVE_GROUPE_ITEM_BEGIN:
    case REMOVE_GROUPE_ITEM_BEGIN:
    case GROUPE_SAVE_ATTACHMENT_BEGIN:
    case GROUPE_REMOVE_ATTACHMENT_BEGIN:
      return produce(state.groupes, pRet => {
        pRet.busy = true;
      });
    case CREATE_GROUPE_ITEM:
      return produce(state.groupes, pRet => {
        pRet.addMode = true;
        pRet.busy = false;
        pRet.current = GetInitialGroupe(state);
      });
    case REFRESH_ALL_SUCCESS:
    case SAVE_GROUPE_ITEM_SUCCESS:
    case REMOVE_GROUPE_ITEM_SUCCESS:
    case GROUPE_REMOVE_ATTACHMENT_SUCCESS:
    case GROUPE_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_GROUPE_SUCCESS:
    case CHANGE_GROUPE_SUCCESS:
      return refreshGroupe(state.groupes, p);
    case SELECT_GROUPE_ITEM:
      return produce(state.groupes, pRet => {
        pRet.busy = false;
        if (p.id) {
          const id = p.id;
          const px = state.groupes.pageData.find(x => {
            return x.id === id;
          });
          if (px) {
            pRet.current = Object.assign({}, px);
            pRet.addMode = false;
          } else {
            pRet.current = GetGroupe();
          }
        } // id
      });
    case CANCEL_GROUPE_ITEM:
      return produce(state.groupes, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find(x => {
          return x.id === id;
        });
        if (px) {
          pRet.current = Object.assign({}, px);
        } else {
          pRet.current = GetGroupe();
        }
        pRet.previousId = "";
      });
    case CHANGE_GROUPE_FIELD:
      return produce(state.groupes, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.current;
          switch (p.field) {
            case "observations":
              pz.observations = val;
              pz.modified = true;
              break;
            case "sigle":
              pz.sigle = val;
              pz.modified = true;
              break;
            case "name":
              pz.name = val;
              pz.modified = true;
              break;
            default:
              break;
          } // field
        } // p
        pRet.busy = false;
      });
    default:
      return produce(state.groupes, pRet => {
        pRet.busy = false;
      });
  } // type
} // groupeSubReducer
