import produce from "immer";
import { IAppData } from '../../../data/state/InfoState';
import { InfoAction } from '../../../data/state/IPayload';
import { GetInitialAppData } from '../../../data/state/stores/initialState';
import { CHANGE_APPDATA_FIELD } from './AppDataActions';
/////////////////////////////////////////////
export function appDataSubReducer(
  state: IAppData,
  action: InfoAction
): IAppData {
  if (!state) {
    return GetInitialAppData();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case CHANGE_APPDATA_FIELD:
      return produce(state, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          switch (p.field) {
            case "dataServerUrl":
              pRet.dataServerUrl = val;
              break;
            case "databaseName":
              pRet.databaseName = val;
              break;
            default:
              break;
          } // field
        } // p
      });
    default:
    break;
  } // type
  return state;
} // etudiantReducer
