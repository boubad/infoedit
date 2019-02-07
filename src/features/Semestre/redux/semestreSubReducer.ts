import { FluxStandardAction } from "flux-standard-action";
import produce from "immer";

import { GetSemestre } from "../../../data/DataProcs";
import { ISemestreDoc } from "../../../data/DomainData";
import {
  CHANGE_SEMESTRE_SUCCESS,
  REFRESH_ALL_SUCCESS
} from "../../../features/AppState/redux/AppStateActions";
import { IBaseState } from "../../../redux/InfoState";
import { GetInitialSemestreState } from "../../../redux/initialState";
import { IPayload } from "../../../redux/IPayload";
import {
  CANCEL_SEMESTRE_ITEM,
  CHANGE_SEMESTRE_FIELD,
  CREATE_SEMESTRE_ITEM,
  GOTO_PAGE_SEMESTRE_BEGIN,
  GOTO_PAGE_SEMESTRE_SUCCESS,
  REFRESH_SEMESTRE_BEGIN,
  REFRESH_SEMESTRE_SUCCESS,
  REMOVE_SEMESTRE_ITEM_BEGIN,
  REMOVE_SEMESTRE_ITEM_SUCCESS,
  SAVE_SEMESTRE_ITEM_BEGIN,
  SAVE_SEMESTRE_ITEM_SUCCESS,
  SELECT_SEMESTRE_ITEM,
  SELECT_SEMESTRE_ITEM_BEGIN,
  SEMESTRE_REMOVE_ATTACHMENT_BEGIN,
  SEMESTRE_REMOVE_ATTACHMENT_SUCCESS,
  SEMESTRE_SAVE_ATTACHMENT_BEGIN,
  SEMESTRE_SAVE_ATTACHMENT_SUCCESS
} from "./SemestreActions";
////////////////////////////////////
function refreshSemestre(
  state: IBaseState<ISemestreDoc>,
  p: IPayload
): IBaseState<ISemestreDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.page) {
      pRet.currentPage = p.page;
    }
    if (p.semestresCount) {
      const n = p.semestresCount;
      pRet.itemsCount = n;
      const nc = pRet.pageSize;
      let np = Math.floor(n / nc);
      if (n % nc !== 0) {
        np = np + 1;
      }
      pRet.pagesCount = np;
    }
    if (p.semestres) {
      pRet.pageData = p.semestres;
    }
    if (p.semestre) {
      pRet.current = p.semestre;
    } else {
      pRet.current = GetSemestre();
    }
    pRet.addMode = false;
  });
} // refreshSemestre
/////////////////////////////////////////////
export function semestreSubReducer(
  state: IBaseState<ISemestreDoc>,
  action: FluxStandardAction<IPayload>
): IBaseState<ISemestreDoc> {
  if (!state) {
    return GetInitialSemestreState();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SELECT_SEMESTRE_ITEM_BEGIN:
    case SAVE_SEMESTRE_ITEM_BEGIN:
    case REMOVE_SEMESTRE_ITEM_BEGIN:
    case SEMESTRE_SAVE_ATTACHMENT_BEGIN:
    case SEMESTRE_REMOVE_ATTACHMENT_BEGIN:
    case GOTO_PAGE_SEMESTRE_BEGIN:
    case REFRESH_SEMESTRE_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case CREATE_SEMESTRE_ITEM:
      return produce(state, pRet => {
        if (p.semestre) {
          pRet.addMode = true;
          pRet.previousId = pRet.current.id;
          pRet.current = p.semestre;
        }
        pRet.busy = false;
      });
    case REFRESH_ALL_SUCCESS:
    case SAVE_SEMESTRE_ITEM_SUCCESS:
    case REMOVE_SEMESTRE_ITEM_SUCCESS:
    case REFRESH_SEMESTRE_SUCCESS:
    case SEMESTRE_REMOVE_ATTACHMENT_SUCCESS:
    case SEMESTRE_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_SEMESTRE_SUCCESS:
    case CHANGE_SEMESTRE_SUCCESS:
      return refreshSemestre(state, p);
    case SELECT_SEMESTRE_ITEM:
      return produce(state, pRet => {
        if (p.semestre) {
          pRet.current = p.semestre;
        }
        pRet.busy = false;
      });
    case CANCEL_SEMESTRE_ITEM:
      return produce(state, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find(x => {
          return x.id === id;
        });
        if (px) {
          pRet.current = Object.assign({}, px);
        } else {
          pRet.current = GetSemestre();
        }
        pRet.previousId = "";
      });
    case CHANGE_SEMESTRE_FIELD:
      return produce(state, pRet => {
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
            case "tag":
              pz.tag = val;
              pz.modified = true;
              break;
            default:
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
} // semestreSubReducer
