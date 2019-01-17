import { FluxStandardAction } from "flux-standard-action";
import produce from "immer";
import { SHOW_ETUDIANT, SHOW_ETUDIANT_BEGIN } from '../../../features/Controle/redux/ControleActions';
import { IDetailState } from '../../../redux/InfoState';
import { GetInitialDetailState } from '../../../redux/initialState';
import { IPayload } from '../../../redux/IPayload';
//////////////////////////////////////////
export function detailsSubReducer(
  state: IDetailState,
  action: FluxStandardAction<IPayload>
): IDetailState {
  if (!state){
    return GetInitialDetailState();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SHOW_ETUDIANT_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case SHOW_ETUDIANT: {
      return produce(state, pRet => {
        if (p.ficheEtudiant){
          pRet.ficheEtudiant = Object.assign({},p.ficheEtudiant);
        }
        pRet.busy = false;
      });
    }
    default:
    return produce(state, pRet => {
      pRet.busy = false;
    });
  } // type
} // detailsSubReducer
