import {connectRouter} from 'connected-react-router';
import {History} from 'history';
import { combineReducers } from 'redux';
import { affectationSubReducer } from '../features/Affectation/redux/affectationSubReducer';
import { anneeSubReducer } from "../features/Annee/redux/anneeSubReducer";
import { appDataSubReducer } from '../features/AppData/redux/appDataSubReducer';
import { appStateSubReducer } from "../features/AppState/redux/appStateSubReducer";
import { appStatusSubReducer } from "../features/AppStatus/redux/statusSubReducer";
import { controleSubReducer } from '../features/Controle/redux/controleSubReducer';
import { datavarSubReducer } from '../features/DataVar/redux/datavarSubReducer';
import { etudAffectationSubReducer } from '../features/EtudAffectation/redux/etudAffectationSubReducer';
import { etudiantSubReducer } from '../features/Etudiant/redux/etudiantSubReducer';
import { detailsSubReducer } from '../features/FicheEtudiant/redux/detailsSubReduder';
import { groupeSubReducer } from "../features/Groupe/redux/groupeSubReducer";
import { matiereSubReducer } from "../features/Matiere/redux/matiereSubReducer";
import { outilsSubReducer } from '../features/Outils/redux/outilsSubReducer';
import { semestreSubReducer } from "../features/Semestre/redux/semestreSubReducer";
import { statsSubReducer } from '../features/Statistiques/redux/statsSubReducer';
import { uniteSubReducer } from "../features/Unite/redux/uniteSubReducer";
//
export const createRootReducer = (history:History<any>) => {
  return combineReducers({
    router: connectRouter(history),
    // tslint:disable-next-line:object-literal-sort-keys
    affectations : affectationSubReducer,
    annees : anneeSubReducer,
    appdata: appDataSubReducer,
    appstate : appStateSubReducer,
    appstatus: appStatusSubReducer,
    controles : controleSubReducer,
    datavars: datavarSubReducer,
    etudaffectations: etudAffectationSubReducer,
    etudiants: etudiantSubReducer,
    groupes: groupeSubReducer,
    matieres: matiereSubReducer,
    outils : outilsSubReducer,
    semestres :semestreSubReducer,
    unites : uniteSubReducer,
    details: detailsSubReducer,
    stats: statsSubReducer
  });
};
