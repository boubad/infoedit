import produce from "immer";
import {
  CHANGE_ANNEE_SUCCESS,
  CHANGE_MATIERE_SUCCESS,
  CHANGE_SEMESTRE_SUCCESS
} from "../../../features/AppState/redux/AppStateActions";
import { IStatState } from "../../../redux/InfoState";
import { GetInitialStatState } from "../../../redux/initialState";
import { InfoAction } from "../../../redux/IPayload";

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
