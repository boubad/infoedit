import { FluxStandardAction } from "flux-standard-action";
import produce from "immer";
import {
  SHOW_CONTROLE,
  SHOW_CONTROLE_BEGIN
} from "../../../features/FicheControle/redux/FicheControleActions";
import { IDetailState } from "../../../redux/InfoState";
import { GetInitialDetailState } from "../../../redux/initialState";
import { IPayload } from "../../../redux/IPayload";
import { SHOW_ETUDIANT, SHOW_ETUDIANT_BEGIN } from './FicheEtudiantActions';
//////////////////////////////////////////
export function detailsSubReducer(
  state: IDetailState,
  action: FluxStandardAction<IPayload>
): IDetailState {
  if (!state) {
    return GetInitialDetailState();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SHOW_ETUDIANT_BEGIN:
    case SHOW_CONTROLE_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case SHOW_ETUDIANT:
      return produce(state, pRet => {
        if (p.ficheEtudiant) {
          pRet.ficheEtudiant = p.ficheEtudiant;
        }
        pRet.busy = false;
      });
    case SHOW_CONTROLE:
      return produce(state, pRet => {
        if (p.ficheControle) {
          pRet.ficheControle = p.ficheControle;
        }
        pRet.busy = false;
      });
    default:
      return produce(state, pRet => {
        pRet.busy = false;
      });
  } // type
} // detailsSubReducer
