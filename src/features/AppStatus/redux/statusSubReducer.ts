import { isError } from "flux-standard-action";
import produce from "immer";
import { IAppStatus } from "../../../redux/InfoState";
import { GetInitialAppStatus } from "../../../redux/initialState";
import { InfoAction } from "../../../redux/IPayload";
/////////////////////////////////////////////
export function appStatusSubReducer(
  state: IAppStatus,
  action: InfoAction
): IAppStatus {
  if (!state) {
    return GetInitialAppStatus();
  }
  const p = action.payload ? action.payload : {};
  if (p.error || p.status) {
    return produce(state, pRet => {
      pRet.error = "";
      pRet.status = "";
      if (p.status) {
        pRet.status = p.status;
      }
      if (p.error) {
        pRet.error = p.error;
      }
      if (isError(action)) {
        if (p instanceof Error) {
          const err = p as Error;
          pRet.error = err.message;
        }
      } // error
    });
  } //
  return state;
} // etudiantReducer
