import { isError } from "flux-standard-action";
import produce from "immer";
import { affectationSubReducer } from '../features/Affectation/redux/affectationSubReducer';
import { anneeSubReducer } from "../features/Annee/redux/anneeSubReducer";
import { appStateSubReducer } from "../features/AppState/redux/appStateSubReducer";
import { appStatusSubReducer } from "../features/Common/redux/statusSubReducer";
import { controleSubReducer } from '../features/Controle/redux/controleSubReducer';
import { etudAffectationSubReducer } from '../features/EtudAffectation/redux/etudAffectationSubReducer';
import { etudiantSubReducer } from '../features/Etudiant/redux/etudiantSubReducer';
import { groupeSubReducer } from "../features/Groupe/redux/groupeSubReducer";
import { matiereSubReducer } from "../features/Matiere/redux/matiereSubReducer";
import { outilsSubReducer } from '../features/Outils/redux/outilsSubReducer';
import { semestreSubReducer } from "../features/Semestre/redux/semestreSubReducer";
import { uniteSubReducer } from "../features/Unite/redux/uniteSubReducer";
import { IInfoState } from "./InfoState";
import { InfoAction } from './IPayload';
//
export function rootReducer(
  state: IInfoState,
  action: InfoAction
): IInfoState {
  if (!state) {
    return state;
  }
  if (isError(action)) {
    const p = action.payload ? action.payload : {};
    return produce(state, pRet => {
      pRet.appstatus.status = "";
      pRet.appstatus.error = "";
      if (p instanceof Error) {
        const err = p as Error;
        pRet.appstatus.error = err.message;
      } 
    });
  } // error
  return produce(state, pRet => {
    pRet.affectations = affectationSubReducer(state,action);
    pRet.appstatus = appStatusSubReducer(state, action);
    pRet.appstate = appStateSubReducer(state, action);
    pRet.annees = anneeSubReducer(state, action);
    pRet.controles = controleSubReducer(state,action);
    pRet.etudaffectations = etudAffectationSubReducer(state,action);
    pRet.etudiants = etudiantSubReducer(state,action);
    pRet.groupes = groupeSubReducer(state, action);
    pRet.matieres = matiereSubReducer(state, action);
    pRet.outils = outilsSubReducer(state,action);
    pRet.semestres = semestreSubReducer(state, action);
    pRet.unites = uniteSubReducer(state, action);
  });
} // mainReducser
