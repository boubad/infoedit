import produce from "immer";
import { IAppState } from '../../../data/state/InfoState';
import { InfoAction } from '../../../data/state/IPayload';
import { GetInitialAppState } from '../../../data/state/stores/initialState';
import { REMOVE_DATAVAR_ITEM_SUCCESS, SAVE_DATAVAR_ITEM_SUCCESS } from '../../../features/DataVar/redux/DataVarActions';
import {
  REMOVE_SEMESTRE_ITEM_SUCCESS,
  SAVE_SEMESTRE_ITEM_SUCCESS
} from "../../../features/Semestre/redux/SemestreActions";
import {
  REMOVE_AFFECTATION_ITEM_SUCCESS,
  SAVE_AFFECTATION_ITEM_SUCCESS
} from "../../Affectation/redux/AffectationActions";
import {
  REMOVE_ANNEE_ITEM_SUCCESS,
  SAVE_ANNEE_ITEM_SUCCESS
} from "../../Annee/redux/AnneeActions";
import {
  REMOVE_ETUDIANT_ITEM_SUCCESS,
  SAVE_ETUDIANT_ITEM_SUCCESS
} from "../../Etudiant/redux/EtudiantActions";
import {
  REMOVE_GROUPE_ITEM_SUCCESS,
  SAVE_GROUPE_ITEM_SUCCESS
} from "../../Groupe/redux/GroupeActions";
import {
  REMOVE_MATIERE_ITEM_SUCCESS,
  SAVE_MATIERE_ITEM_SUCCESS
} from "../../Matiere/redux/MatiereActions";
import {
  REMOVE_UNITE_ITEM_SUCCESS,
  SAVE_UNITE_ITEM_SUCCESS
} from "../../Unite/redux/UniteActions";
import {
  CHANGE_ANNEE_BEGIN,
  CHANGE_ANNEE_SUCCESS,
  CHANGE_GROUPE_BEGIN,
  CHANGE_GROUPE_SUCCESS,
  CHANGE_MATIERE_BEGIN,
  CHANGE_MATIERE_SUCCESS,
  CHANGE_SEMESTRE_BEGIN,
  CHANGE_SEMESTRE_SUCCESS,
  CHANGE_UNITE_BEGIN,
  CHANGE_UNITE_SUCCESS,
  REFRESH_ALL_BEGIN,
  REFRESH_ALL_SUCCESS,
  REFRESH_GLOBAL_SUCCESS
} from "./AppStateActions";
/////////////////////////////////////////////
export function appStateSubReducer(
  state: IAppState,
  action: InfoAction
): IAppState {
  if (!state) {
    return GetInitialAppState();
  }
  const p =
    action.payload !== undefined && action.payload !== null
      ? action.payload
      : {};
  switch (action.type) {
    case REFRESH_ALL_BEGIN:
    case CHANGE_ANNEE_BEGIN:
    case CHANGE_SEMESTRE_BEGIN:
    case CHANGE_UNITE_BEGIN:
    case CHANGE_MATIERE_BEGIN:
    case CHANGE_GROUPE_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case REFRESH_GLOBAL_SUCCESS:
    case REFRESH_ALL_SUCCESS:
    case CHANGE_ANNEE_SUCCESS:
    case CHANGE_SEMESTRE_SUCCESS:
    case CHANGE_UNITE_SUCCESS:
    case CHANGE_MATIERE_SUCCESS:
    case CHANGE_GROUPE_SUCCESS:
    case SAVE_ANNEE_ITEM_SUCCESS:
    case REMOVE_ANNEE_ITEM_SUCCESS:
    case SAVE_UNITE_ITEM_SUCCESS:
    case REMOVE_UNITE_ITEM_SUCCESS:
    case SAVE_SEMESTRE_ITEM_SUCCESS:
    case REMOVE_SEMESTRE_ITEM_SUCCESS:
    case SAVE_MATIERE_ITEM_SUCCESS:
    case REMOVE_MATIERE_ITEM_SUCCESS:
    case SAVE_GROUPE_ITEM_SUCCESS:
    case REMOVE_GROUPE_ITEM_SUCCESS:
    case SAVE_ETUDIANT_ITEM_SUCCESS:
    case REMOVE_ETUDIANT_ITEM_SUCCESS:
    case SAVE_AFFECTATION_ITEM_SUCCESS:
    case REMOVE_AFFECTATION_ITEM_SUCCESS:
    case SAVE_DATAVAR_ITEM_SUCCESS:
    case REMOVE_DATAVAR_ITEM_SUCCESS:
      return produce(state, pRet => {
        pRet.busy = false;
        if (p.dataVarsOptions){
          pRet.dataVarsOptions = p.dataVarsOptions;
        }
        if (p.matiereSigle){
          pRet.matiereSigle = p.matiereSigle;
        }
        if (p.anneeStartDate) {
          pRet.anneeStartDate = p.anneeStartDate;
        }
        if (p.anneeEndDate) {
          pRet.anneeEndDate = p.anneeEndDate;
        }
        if (p.semestresOptions) {
          pRet.semestresOptions = p.semestresOptions;
        }
        if (p.affectations) {
          pRet.affectations = p.affectations;
        }
        if (p.anneesOptions) {
          pRet.anneesOptions = p.anneesOptions;
        }
        if (p.unitesOptions) {
          pRet.unitesOptions = p.unitesOptions;
        }
        if (p.groupesOptions) {
          pRet.groupesOptions = p.groupesOptions;
        }
        if (p.matieresOptions) {
          pRet.matieresOptions = p.matieresOptions;
        }
        if (p.anneeid) {
          pRet.anneeid = p.anneeid;
        }
        if (p.semestreid) {
          pRet.semestreid = p.semestreid;
        }
        if (p.uniteid) {
          pRet.uniteid = p.uniteid;
        }
        if (p.groupeid) {
          pRet.groupeid = p.groupeid;
        }
        if (p.matiereid) {
          pRet.matiereid = p.matiereid;
        }
        let anneeid = pRet.anneeid;
        if (anneeid.length > 0) {
          const xx = pRet.anneesOptions.find(x => {
            return x.id === anneeid;
          });
          if (!xx) {
            anneeid = "";
            pRet.anneeid = "";
          }
        } // annee
        let semestreid = pRet.semestreid;
        if (semestreid.length > 0) {
          const xx = pRet.semestresOptions.find(x => {
            return x.id === semestreid;
          });
          if (!xx) {
            semestreid = "";
            pRet.semestreid = "";
          }
        } // semestre
        let groupeid = pRet.groupeid;
        if (groupeid.length > 0) {
          const xx = pRet.groupesOptions.find(x => {
            return x.id === groupeid;
          });
          if (!xx) {
            groupeid = "";
            pRet.groupeid = "";
          }
        } // groupe
        const uniteid = pRet.uniteid;
        if (uniteid.length > 0) {
          const xx = pRet.unitesOptions.find(x => {
            return x.id === uniteid;
          });
          if (!xx) {
            pRet.uniteid = "";
          }
        } // unite
        const matiereid = pRet.matiereid;
        if (matiereid.length > 0) {
          const xx = pRet.matieresOptions.find(x => {
            return x.id === matiereid;
          });
          if (!xx) {
            pRet.matiereid = "";
          }
        } // matiere
        pRet.affectationid = "";
        pRet.semestreStartDate = "";
        pRet.semestreEndDate = "";
        if (
          anneeid.length > 0 &&
          semestreid.length > 0 &&
          groupeid.length > 0
        ) {
          const px = pRet.affectations.find(x => {
            return (
              x.anneeid === anneeid &&
              x.semestreid === semestreid &&
              x.groupeid === groupeid
            );
          });
          if (px) {
            pRet.affectationid = px.id;
            pRet.semestreStartDate = px.startdate;
            pRet.semestreEndDate = px.enddate;
          }
        } // aff
      });
    default:
      return produce(state, pRet => {
        pRet.busy = false;
      });
  } // type
} // etudiantReducer
