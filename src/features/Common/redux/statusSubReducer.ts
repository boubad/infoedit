import produce from "immer";
import { IAppStatus, IInfoState } from "../../../redux/InfoState";
import { InfoAction } from "../../../redux/IPayload";
/////////////////////////////////////////////
export function appStatusSubReducer(
  state: IInfoState,
  action: InfoAction
): IAppStatus {
  if (state === undefined || state === null) {
    return state;
  }
  const p =
    action.payload !== undefined && action.payload !== null
      ? action.payload
      : {};
  if (p.error !== undefined || p.status !== undefined) {
    return produce(state.appstatus, pRet => {
      pRet.error = "";
      pRet.status = "";
      if (p.status !== undefined) {
        pRet.status = p.status;
      }
      if (p.error !== undefined) {
        pRet.error = p.error;
      }
    });
  } //
  return state.appstatus;
} // etudiantReducer
