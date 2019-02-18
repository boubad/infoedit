import produce from "immer";

import { IAnneeDoc } from '../../../data/domain/DomainData';
import { IBaseState } from '../../../data/state/InfoState';
import { InfoAction, IPayload } from '../../../data/state/IPayload';
import { ComputePagesCount } from '../../../data/state/reducers/BaseReducer';
import { GetInitialAnneeState } from '../../../data/state/stores/initialState';
import { CHANGE_ANNEE_SUCCESS } from "../../AppState/redux/AppStateActions";
import {
  ANNEE_REMOVE_ATTACHMENT_BEGIN,
  ANNEE_REMOVE_ATTACHMENT_SUCCESS,
  ANNEE_SAVE_ATTACHMENT_BEGIN,
  ANNEE_SAVE_ATTACHMENT_SUCCESS,
  CANCEL_ANNEE_ITEM,
  CHANGE_ANNEE_FIELD,
  CREATE_ANNEE_ITEM,
  GOTO_PAGE_ANNEE_BEGIN,
  GOTO_PAGE_ANNEE_SUCCESS,
  REFRESH_ANNEE_BEGIN,
  REFRESH_ANNEE_SUCCESS,
  REMOVE_ANNEE_ITEM_BEGIN,
  REMOVE_ANNEE_ITEM_SUCCESS,
  SAVE_ANNEE_ITEM_BEGIN,
  SAVE_ANNEE_ITEM_SUCCESS,
  SELECT_ANNEE_ITEM,
  SELECT_ANNEE_ITEM_BEGIN
} from "./AnneeActions";
//////////////////////////////////////////
function refreshAnnee(
  state: IBaseState<IAnneeDoc>,
  p: IPayload
): IBaseState<IAnneeDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.page) {
      pRet.currentPage = p.page;
    }
    if (p.anneesCount) {
      const n = p.anneesCount;
      pRet.itemsCount = n;
      pRet.pagesCount = ComputePagesCount(n, state.pageSize);
    }
    if (p.annees) {
      pRet.pageData = p.annees;
    }
    if (p.annee) {
      pRet.current = p.annee;
      pRet.addMode = false;
      const id = pRet.current.id;
      if (id.length > 0) {
        const bb = state.pageData;
        const n = bb.length;
        const vv = [];
        for (let i = 0; i < n; i++) {
          const x = bb[i];
          if (x.id === id) {
            const y = Object.assign({}, pRet.current);
            vv.push(y);
          } else {
            vv.push(x);
          }
        } // i
        pRet.pageData = vv;
      } // id
    } // annee
  });
} // refreshAnnee
/////////////////////////////////////////////
export function anneeSubReducer(
  state: IBaseState<IAnneeDoc>,
  action: InfoAction
): IBaseState<IAnneeDoc> {
  if (!state) {
    return GetInitialAnneeState();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SELECT_ANNEE_ITEM_BEGIN:
    case SAVE_ANNEE_ITEM_BEGIN:
    case REMOVE_ANNEE_ITEM_BEGIN:
    case ANNEE_SAVE_ATTACHMENT_BEGIN:
    case ANNEE_REMOVE_ATTACHMENT_BEGIN:
    case GOTO_PAGE_ANNEE_BEGIN:
    case REFRESH_ANNEE_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case CHANGE_ANNEE_SUCCESS:
    case SELECT_ANNEE_ITEM:
      return produce(state, pRet => {
        pRet.busy = false;
        if (p.annee) {
          pRet.current = p.annee;
          pRet.addMode = false;
        }
      });
    case CREATE_ANNEE_ITEM:
      return produce(state, pRet => {
        if (p.annee) {
          pRet.previousId = pRet.current.id;
          pRet.current = p.annee;
          pRet.addMode = true;
        }
        pRet.busy = false;
      });
    case REFRESH_ANNEE_SUCCESS:
    case ANNEE_REMOVE_ATTACHMENT_SUCCESS:
    case ANNEE_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_ANNEE_SUCCESS:
    case REMOVE_ANNEE_ITEM_SUCCESS:
    case SAVE_ANNEE_ITEM_SUCCESS:
      return refreshAnnee(state, p);
    case CANCEL_ANNEE_ITEM:
      return produce(state, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find(x => {
          return x.id === id;
        });
        if (px) {
          pRet.current = Object.assign({}, px);
        }
        pRet.previousId = "";
      });
    case CHANGE_ANNEE_FIELD:
      return produce(state, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.current;
          switch (p.field) {
            case "observations":
              pz.observations = val;
              pz.modified = true;
              break;
            case "startdate":
              pz.startdate = val;
              pz.modified = true;
              break;
            case "enddate":
              pz.enddate = val;
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
} // anneeReducer
