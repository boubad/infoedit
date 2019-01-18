import produce from "immer";
import {
  CHANGE_ANNEE_SUCCESS,
  CHANGE_GROUPE_SUCCESS,
  CHANGE_SEMESTRE_SUCCESS
} from "../../../features/AppState/redux/AppStateActions";
import {
  ETUDAFFECTATION_REMOVE_ATTACHMENT_SUCCESS,
  ETUDAFFECTATION_SAVE_ATTACHMENT_SUCCESS,
  GOTO_PAGE_ETUDAFFECTATION_SUCCESS,
  REMOVE_ETUDAFFECTATION_ITEM_SUCCESS,
  SAVE_ETUDAFFECTATION_ITEM_SUCCESS
} from "../../../features/EtudAffectation/redux/EtudAffectationActions";
import {
  CHANGESTATUS_ETUDIANT_SUCCESS,
  REMOVE_ETUDIANT_ITEM_SUCCESS,
  SAVE_ETUDIANT_ITEM_SUCCESS
} from "../../../features/Etudiant/redux/EtudiantActions";
import { IOutilsState } from "../../../redux/InfoState";
import { GetInitialOutilsState } from "../../../redux/initialState";
import { InfoAction } from "../../../redux/IPayload";
import {
  IMPORT_ETUDIANT_BEGIN,
  IMPORT_ETUDIANT_SUCCESS,
  REFRESHANNEESEMESTRE_STATUS_BEGIN,
  REFRESHANNEESEMESTRE_STATUS_SUCCESS} from "./OutilsActions";
//////////////////////////////////////////
export function outilsSubReducer(
  state: IOutilsState,
  action: InfoAction
): IOutilsState {
  if (!state) {
    return GetInitialOutilsState();
  }
  const p =
    action.payload !== undefined && action.payload !== null
      ? action.payload
      : {};
  switch (action.type) {
    case IMPORT_ETUDIANT_BEGIN:
    case REFRESHANNEESEMESTRE_STATUS_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case ETUDAFFECTATION_REMOVE_ATTACHMENT_SUCCESS:
    case ETUDAFFECTATION_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_ETUDAFFECTATION_SUCCESS:
    case CHANGE_SEMESTRE_SUCCESS:
    case CHANGE_ANNEE_SUCCESS:
    case CHANGE_GROUPE_SUCCESS:
    case SAVE_ETUDAFFECTATION_ITEM_SUCCESS:
    case REMOVE_ETUDAFFECTATION_ITEM_SUCCESS:
    case CHANGESTATUS_ETUDIANT_SUCCESS:
    case SAVE_ETUDIANT_ITEM_SUCCESS:
    case REMOVE_ETUDIANT_ITEM_SUCCESS:
    case IMPORT_ETUDIANT_SUCCESS:
    case REFRESHANNEESEMESTRE_STATUS_SUCCESS:
      return produce(state, pRet => {
        pRet.busy = false;
        if (p.importedEtudiants !== undefined) {
          pRet.importedEtudiants = p.importedEtudiants;
        }
        if (p.freeEtudiantsOpts) {
          pRet.freeEtudiantsOpts = p.freeEtudiantsOpts;
        }
        if (p.etudAffectations) {
          pRet.etudAffectations = p.etudAffectations;
        }
        if (p.importedEtudiants) {
          pRet.importedEtudiants = p.importedEtudiants;
        }
      });
    default:
      return produce(state, pRet => {
        pRet.busy = false;
      });
  } // type
} // anneeReducer
