import produce from "immer";

import { GetMatiere } from "src/data/DataProcs";
import { IMatiereDoc } from "src/data/DomainData";
import {
  CHANGE_MATIERE_SUCCESS,
  CHANGE_UNITE_SUCCESS,
  REFRESH_ALL_SUCCESS
} from "src/features/AppState/redux/AppStateActions";
import { IBaseState } from "src/redux/InfoState";
import { IPayload } from "src/redux/IPayload";
import { GetInitialMatiere } from "src/redux/StateProcs";
import { IInfoState } from "../../../redux/InfoState";
import { InfoAction } from "../../../redux/IPayload";
import {
  CANCEL_MATIERE_ITEM,
  CHANGE_MATIERE_FIELD,
  CREATE_MATIERE_ITEM,
  GOTO_PAGE_MATIERE_BEGIN,
  GOTO_PAGE_MATIERE_SUCCESS,
  MATIERE_REMOVE_ATTACHMENT_BEGIN,
  MATIERE_REMOVE_ATTACHMENT_SUCCESS,
  MATIERE_SAVE_ATTACHMENT_BEGIN,
  MATIERE_SAVE_ATTACHMENT_SUCCESS,
  REFRESH_MATIERE_BEGIN,
  REMOVE_MATIERE_ITEM_BEGIN,
  REMOVE_MATIERE_ITEM_SUCCESS,
  SAVE_MATIERE_ITEM_BEGIN,
  SAVE_MATIERE_ITEM_SUCCESS,
  SELECT_MATIERE_ITEM
} from "./MatiereActions";
////////////////////////////////////
function refreshMatiere(
  state: IBaseState<IMatiereDoc>,
  p: IPayload
): IBaseState<IMatiereDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.page) {
      pRet.currentPage = p.page;
    }
    if (p.matieresCount) {
      const n = p.matieresCount;
      pRet.itemsCount = n;
      const nc = pRet.pageSize;
      let np = Math.floor(n / nc);
      if (n % nc !== 0) {
        np = np + 1;
      }
      pRet.pagesCount = np;
    }
    if (p.matieres) {
      pRet.pageData = p.matieres;
    }
    if (p.matiere) {
      pRet.current = p.matiere;
    } else {
      pRet.current = GetMatiere();
    }
    pRet.addMode = false;
  });
} // refreshMatiere
/////////////////////////////////////////////
export function matiereSubReducer(
  state: IInfoState,
  action: InfoAction
): IBaseState<IMatiereDoc> {
  const p =
    action.payload !== undefined && action.payload !== null
      ? action.payload
      : {};
  switch (action.type) {
    case SAVE_MATIERE_ITEM_BEGIN:
    case REMOVE_MATIERE_ITEM_BEGIN:
    case MATIERE_SAVE_ATTACHMENT_BEGIN:
    case MATIERE_REMOVE_ATTACHMENT_BEGIN:
    case GOTO_PAGE_MATIERE_BEGIN:
    case REFRESH_MATIERE_BEGIN:
      return produce(state.matieres, pRet => {
        pRet.busy = true;
      });
    case CREATE_MATIERE_ITEM:
      return produce(state.matieres, pRet => {
        pRet.addMode = true;
        pRet.busy = false;
        pRet.current = GetInitialMatiere(state);
      });
    case REFRESH_ALL_SUCCESS:
    case MATIERE_REMOVE_ATTACHMENT_SUCCESS:
    case MATIERE_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_MATIERE_SUCCESS:
    case CHANGE_MATIERE_SUCCESS:
    case CHANGE_UNITE_SUCCESS:
    case REMOVE_MATIERE_ITEM_SUCCESS:
    case SAVE_MATIERE_ITEM_SUCCESS:
      return refreshMatiere(state.matieres, p);
    case SELECT_MATIERE_ITEM:
      return produce(state.matieres, pRet => {
        pRet.busy = false;
        if (p.id) {
          const id = p.id;
          const px = state.matieres.pageData.find(x => {
            return x.id === id;
          });
          if (px !== undefined) {
            pRet.current = Object.assign({}, px);
            pRet.addMode = false;
          } else {
            pRet.current = GetMatiere();
          }
        } // id
      });
    case CANCEL_MATIERE_ITEM:
      return produce(state.matieres, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find(x => {
          return x.id === id;
        });
        if (px) {
          pRet.current = Object.assign({}, px);
        } else {
          pRet.current = GetMatiere();
        }
        pRet.previousId = "";
      });
    case CHANGE_MATIERE_FIELD:
      return produce(state.matieres, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.current;
          switch (p.field) {
            case "observations":
              pz.observations = val;
              pz.modified = true;
              break;
            case "uniteid":
              pz.uniteid = val;
              pz.modified = true;
              break;
            case "modname":
              pz.modname = val;
              pz.modified = true;
              break;
            case "coefficient":
              pz.coefficient = val;
              pz.modified = true;
              break;
            case "ecs":
              pz.ecs = val;
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
      return produce(state.matieres, pRet => {
        pRet.busy = false;
      });
  } // type
} // matiereSubReducer
