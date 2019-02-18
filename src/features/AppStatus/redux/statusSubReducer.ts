import { isError } from "flux-standard-action";
import produce from "immer";
import { IAppStatus } from '../../../data/state/InfoState';
import { InfoAction } from '../../../data/state/IPayload';
import { GetInitialAppStatus } from '../../../data/state/stores/initialState';
import { SYNC_DATA_BEGIN } from "../../../features/Outils/redux/OutilsActions";
import { CHECK_DATA_BEGIN } from '../../Outils/redux/OutilsActions';
/////////////////////////////////////////////
export function appStatusSubReducer(
  state: IAppStatus,
  action: InfoAction
): IAppStatus {
  if (!state) {
    return GetInitialAppStatus();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case CHECK_DATA_BEGIN:
    case SYNC_DATA_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    default:
      return produce(state, pRet => {
        pRet.busy = false;
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
  } // type
} // etudiantReducer
