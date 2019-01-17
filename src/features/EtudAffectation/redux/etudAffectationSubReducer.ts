import produce from "immer";
import { GetEtudAffectation } from "../../../data/DataProcs";
import { IEtudAffectationDoc } from "../../../data/DomainData";
import {
  CHANGE_ANNEE_SUCCESS,
  CHANGE_GROUPE_SUCCESS,
  CHANGE_SEMESTRE_SUCCESS
} from "../../../features/AppState/redux/AppStateActions";
import {
  CHANGESTATUS_ETUDIANT_SUCCESS,
  REMOVE_ETUDIANT_ITEM_SUCCESS,
  SAVE_ETUDIANT_ITEM_SUCCESS
} from "../../../features/Etudiant/redux/EtudiantActions";
import { IBaseState } from "../../../redux/InfoState";
import { GetInitialEtudAffectationState } from "../../../redux/initialState";
import { IPayload } from "../../../redux/IPayload";
import { InfoAction } from "../../../redux/IPayload";
import {
  CANCEL_ETUDAFFECTATION_ITEM,
  CHANGE_ETUDAFFECTATION_FIELD,
  CREATE_ETUDAFFECTATION_ITEM,
  ETUDAFFECTATION_REMOVE_ATTACHMENT_BEGIN,
  ETUDAFFECTATION_REMOVE_ATTACHMENT_SUCCESS,
  ETUDAFFECTATION_SAVE_ATTACHMENT_BEGIN,
  ETUDAFFECTATION_SAVE_ATTACHMENT_SUCCESS,
  GOTO_PAGE_ETUDAFFECTATION_BEGIN,
  GOTO_PAGE_ETUDAFFECTATION_SUCCESS,
  REMOVE_ETUDAFFECTATION_ITEM_BEGIN,
  REMOVE_ETUDAFFECTATION_ITEM_SUCCESS,
  SAVE_ETUDAFFECTATION_ITEM_BEGIN,
  SAVE_ETUDAFFECTATION_ITEM_SUCCESS,
  SELECT_ETUDAFFECTATION_ITEM,
  SELECT_ETUDAFFECTATION_ITEM_BEGIN
} from "./EtudAffectationActions";
////////////////////////////////////
function refreshEtudAffectation(
  state: IBaseState<IEtudAffectationDoc>,
  p: IPayload
): IBaseState<IEtudAffectationDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.page) {
      pRet.currentPage = p.page;
    }
    if (p.etudAffectationsCount) {
      const n = p.etudAffectationsCount;
      pRet.itemsCount = n;
      if (n > pRet.pageSize) {
        pRet.pageSize = n;
      }
    }
    pRet.currentPage = 1;
    pRet.pagesCount = 1;
    if (p.etudAffectations) {
      pRet.pageData = p.etudAffectations;
    }
    if (p.etudAffectation) {
      pRet.current = p.etudAffectation;
    } else {
      pRet.current = GetEtudAffectation();
    }
    pRet.addMode = false;
  });
} // refreshEtudAffectation
/////////////////////////////////////////////
export function etudAffectationSubReducer(
  state: IBaseState<IEtudAffectationDoc>,
  action: InfoAction
): IBaseState<IEtudAffectationDoc> {
  if (!state) {
    return GetInitialEtudAffectationState();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SELECT_ETUDAFFECTATION_ITEM_BEGIN:
    case SAVE_ETUDAFFECTATION_ITEM_BEGIN:
    case REMOVE_ETUDAFFECTATION_ITEM_BEGIN:
    case ETUDAFFECTATION_SAVE_ATTACHMENT_BEGIN:
    case ETUDAFFECTATION_REMOVE_ATTACHMENT_BEGIN:
    case GOTO_PAGE_ETUDAFFECTATION_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case CREATE_ETUDAFFECTATION_ITEM:
      return produce(state, pRet => {
        if (p.etudAffectation) {
          pRet.addMode = true;
          pRet.previousId = pRet.current.id;
          pRet.current = p.etudAffectation;
        }
        pRet.busy = false;
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
      return refreshEtudAffectation(state, p);
    case CANCEL_ETUDAFFECTATION_ITEM:
      return produce(state, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find(x => {
          return x.id === id;
        });
        if (px) {
          pRet.current = Object.assign({}, px);
        } else {
          pRet.current = GetEtudAffectation();
        }
        pRet.previousId = "";
      });
    case SELECT_ETUDAFFECTATION_ITEM:
      return produce(state, pRet => {
        if (p.etudAffectation) {
          pRet.addMode = false;
          pRet.current = p.etudAffectation;
        }
        pRet.busy = false;
      });
    case CHANGE_ETUDAFFECTATION_FIELD:
      return produce(state, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = Object.assign({}, pRet.current);
          switch (p.field) {
            case "observations":
              pz.observations = val;
              pz.modified = true;
              pRet.current = pz;
              break;
            case "etudiantid":
              pz.etudiantid = val;
              pz.modified = true;
              pRet.current = pz;
              break;
            case "startdate":
              pz.startdate = val;
              pz.modified = true;
              pRet.current = pz;
              break;
            case "enddate":
              pz.enddate = val;
              pz.modified = true;
              pRet.current = pz;
              break;
            default:
              break;
          } // field
        } // p
        pRet.busy = false;
      });
    default:
      return produce(state, pRet => {
        pRet.busy = false;
      });
  } // type
} // affectationSubReducer
