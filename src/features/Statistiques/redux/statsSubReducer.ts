import produce from "immer";
import { IStatState } from '../../../data/state/InfoState';
import { InfoAction } from '../../../data/state/IPayload';
import { GetInitialStatState } from '../../../data/state/stores/initialState';
import {
  CHANGE_ANNEE_SUCCESS,
  CHANGE_MATIERE_SUCCESS,
  CHANGE_SEMESTRE_SUCCESS
} from "../../../features/AppState/redux/AppStateActions";

//////////////////////////////////////////
export function statsSubReducer(
  state: IStatState,
  action: InfoAction
): IStatState {
  if (!state) {
    return GetInitialStatState();
  }
  const p =
    action.payload !== undefined && action.payload !== null
      ? action.payload
      : {};
  switch (action.type) {
    case CHANGE_SEMESTRE_SUCCESS:
    case CHANGE_ANNEE_SUCCESS:
    case CHANGE_MATIERE_SUCCESS:
      return produce(state, pRet => {
        pRet.busy = false;
        if (p.etudiantDescs) {
          pRet.matiereStats = p.etudiantDescs;
        }
      });
    default:
      return produce(state, pRet => {
        pRet.busy = false;
      });
  } // type
} // statsSubReducer
