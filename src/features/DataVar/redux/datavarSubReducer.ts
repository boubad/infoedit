import produce from "immer";
import {
  DATAVAR_TYPE_STRING,
  GetDataVarDoc as GetDataVar
} from "../../../data/domain/DataProcs";
import { IDataVarDoc } from "../../../data/domain/DomainData";
import { REFRESH_GLOBAL_SUCCESS } from './../../AppState/redux/AppStateActions';

import { IBaseState } from '../../../data/state/InfoState';
import { InfoAction, IPayload } from '../../../data/state/IPayload';
import { GetInitialVarDocState } from '../../../data/state/stores/initialState';
import {
  ADD_DATAVAR_MODALITE,
  REMOVE_DATAVAR_MODALITE
} from "./DataVarActions";
import {
  CANCEL_DATAVAR_ITEM,
  CHANGE_DATAVAR_FIELD,
  CREATE_DATAVAR_ITEM,
  DATAVAR_REMOVE_ATTACHMENT_BEGIN,
  DATAVAR_REMOVE_ATTACHMENT_SUCCESS,
  DATAVAR_SAVE_ATTACHMENT_BEGIN,
  DATAVAR_SAVE_ATTACHMENT_SUCCESS,
  GOTO_PAGE_DATAVAR_BEGIN,
  GOTO_PAGE_DATAVAR_SUCCESS,
  REMOVE_DATAVAR_ITEM_BEGIN,
  REMOVE_DATAVAR_ITEM_SUCCESS,
  SAVE_DATAVAR_ITEM_BEGIN,
  SAVE_DATAVAR_ITEM_SUCCESS,
  SELECT_DATAVAR_ITEM,
  SELECT_DATAVAR_ITEM_BEGIN
} from "./DataVarActions";
////////////////////////////////////
function refreshDataVar(
  state: IBaseState<IDataVarDoc>,
  p: IPayload
): IBaseState<IDataVarDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.dataVars) {
      pRet.pageData = p.dataVars;
      const n = pRet.pageData.length;
      if (pRet.pageSize < n){
        pRet.pageSize = 1;
      }
      pRet.itemsCount = n;
      pRet.pagesCount = (n > 0) ? 1 : 0;
      pRet.currentPage = (n > 0) ? 1 : 0;
    }
    if (p.dataVar) {
      pRet.current = p.dataVar;
      pRet.addMode = false;
    }
  });
} // refreshDataVar
/////////////////////////////////////////////
export function datavarSubReducer(
  state: IBaseState<IDataVarDoc>,
  action: InfoAction
): IBaseState<IDataVarDoc> {
  if (!state) {
    return GetInitialVarDocState();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SELECT_DATAVAR_ITEM_BEGIN:
    case SAVE_DATAVAR_ITEM_BEGIN:
    case REMOVE_DATAVAR_ITEM_BEGIN:
    case DATAVAR_SAVE_ATTACHMENT_BEGIN:
    case DATAVAR_REMOVE_ATTACHMENT_BEGIN:
    case GOTO_PAGE_DATAVAR_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case CREATE_DATAVAR_ITEM:
      return produce(state, pRet => {
        if (p.dataVar) {
          pRet.addMode = true;
          pRet.previousId = pRet.current.id;
          pRet.current = p.dataVar;
        }
        pRet.busy = false;
      });
    case REFRESH_GLOBAL_SUCCESS:
    case DATAVAR_REMOVE_ATTACHMENT_SUCCESS:
    case DATAVAR_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_DATAVAR_SUCCESS:
    case SAVE_DATAVAR_ITEM_SUCCESS:
    case REMOVE_DATAVAR_ITEM_SUCCESS:
      return refreshDataVar(state, p);
    case SELECT_DATAVAR_ITEM:
      return produce(state, pRet => {
        if (p.dataVar) {
          pRet.current = p.dataVar;
          pRet.addMode = false;
        }
        pRet.busy = false;
      });
    case CANCEL_DATAVAR_ITEM:
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
          pRet.current = GetDataVar();
        }
        pRet.previousId = "";
      });
    case ADD_DATAVAR_MODALITE:
      return produce(state, pRet => {
        if (p.field) {
          const pz = pRet.current;
          const key = p.field;
          const ip = pz.modalvalues.indexOf(key);
          if (ip < 0) {
            pz.modalvalues.push(key);
            pz.modified = true;
            pz.vartype = DATAVAR_TYPE_STRING;
          }
        } // fields
      });
    case REMOVE_DATAVAR_MODALITE:
      return produce(state, pRet => {
        if (p.field) {
          const pz = pRet.current;
          const key = p.field;
          const ip = pz.modalvalues.indexOf(key);
          if (ip >= 0) {
            pz.modalvalues.splice(ip, 1);
            pz.modified = true;
          }
        } // fields
      });
    case CHANGE_DATAVAR_FIELD:
      return produce(state, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.current;
          const key = p.field;
          switch (key) {
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
            case "vartype":
              pz.vartype = val;
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
} // datavarSubReducer
