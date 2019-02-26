import produce from "immer";
import { GetInfoUser } from 'src/data/domain/DataProcs';
import { IAppState } from "../../../data/state/InfoState";
import { InfoAction } from "../../../data/state/IPayload";
import { GetInitialAppState } from "../../../data/state/stores/initialState";
import { LOGIN_INFOUSER_BEGIN, LOGIN_INFOUSER_SUCCESS, LOGOUT_INFOUSER } from './../../InfoUser/redux/InfoUserActions';
import {
  CHANGE_ANNEE_BEGIN,
  CHANGE_ANNEE_SUCCESS,
  CHANGE_GROUPE_BEGIN,
  CHANGE_GROUPE_SUCCESS,
  CHANGE_MATIERE_BEGIN,
  CHANGE_MATIERE_SUCCESS,
  CHANGE_SEMESTRE_BEGIN,
  CHANGE_SEMESTRE_SUCCESS,
  REFRESH_ALL_SUCCESS,
  REFRESH_GLOBAL_BEGIN
} from "./AppStateActions";
/////////////////////////////////////////////
export function appStateSubReducer(
  state: IAppState,
  action: InfoAction
): IAppState {
  if (!state) {
    return GetInitialAppState();
  }
  switch (action.type) {
    case LOGIN_INFOUSER_BEGIN:
    case REFRESH_GLOBAL_BEGIN:
    case CHANGE_ANNEE_BEGIN:
    case CHANGE_SEMESTRE_BEGIN:
    case CHANGE_MATIERE_BEGIN:
    case CHANGE_GROUPE_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case REFRESH_ALL_SUCCESS:
    case CHANGE_ANNEE_SUCCESS:
    case CHANGE_SEMESTRE_SUCCESS:
    case CHANGE_MATIERE_SUCCESS:
    case CHANGE_GROUPE_SUCCESS:
      return produce(state, pRet => {
        pRet.busy = false;
      });
    case LOGIN_INFOUSER_SUCCESS:
    return produce(state, pRet => {
      pRet.busy = false;
      const p = action.payload;
      if (p && p.user && p.user.id){
        pRet.owner = p.user;
      } else {
        pRet.owner = GetInfoUser();
      }
    });
    case LOGOUT_INFOUSER:
    return produce(state, pRet => {
      pRet.busy = false;
      pRet.owner = GetInfoUser();
    });
    default:
      return produce(state, pRet => {
        pRet.busy = false;
      });
  } // type
} // etudiantReducer
