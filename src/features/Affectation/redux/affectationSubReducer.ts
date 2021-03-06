import produce from "immer";
import { GetAffectation } from 'src/data/DataProcs';
import { IAffectationDoc } from 'src/data/DomainData';
import { CHANGE_ANNEE_SUCCESS, CHANGE_SEMESTRE_SUCCESS } from 'src/features/AppState/redux/AppStateActions';
import { IBaseState, IInfoState } from 'src/redux/InfoState';
import { IPayload } from 'src/redux/IPayload';
import { GetInitialAffectation } from 'src/redux/StateProcs';
import { InfoAction } from '../../../redux/IPayload';
import {
  AFFECTATION_REMOVE_ATTACHMENT_BEGIN,
  AFFECTATION_REMOVE_ATTACHMENT_SUCCESS,
  AFFECTATION_SAVE_ATTACHMENT_BEGIN,
  AFFECTATION_SAVE_ATTACHMENT_SUCCESS,
  CANCEL_AFFECTATION_ITEM,
  CHANGE_AFFECTATION_FIELD,
  CREATE_AFFECTATION_ITEM,
  GOTO_PAGE_AFFECTATION_BEGIN,
  GOTO_PAGE_AFFECTATION_SUCCESS,
  REMOVE_AFFECTATION_ITEM_BEGIN,
  REMOVE_AFFECTATION_ITEM_SUCCESS,
  SAVE_AFFECTATION_ITEM_BEGIN,
  SAVE_AFFECTATION_ITEM_SUCCESS,
  SELECT_AFFECTATION_ITEM
} from "./AffectationActions";
////////////////////////////////////
function refreshAffectation(
  state: IBaseState<IAffectationDoc>,
  p: IPayload
): IBaseState<IAffectationDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.page){
      pRet.currentPage = p.page;
    }
    if (p.affectationsCount) {
      const n = p.affectationsCount;
      pRet.itemsCount = n;
      if (n > pRet.pageSize){
        pRet.pageSize = n;
      }
    }
    pRet.currentPage = 1;
    pRet.pagesCount = 1;
    if (p.affectations) {
      pRet.pageData = p.affectations;
    }
    if (p.affectation) {
      pRet.current = p.affectation;
    } else {
      pRet.current = GetAffectation();
    }
    pRet.addMode = false;
  });
} // refreshAffectation
/////////////////////////////////////////////
export function affectationSubReducer(
  state: IInfoState,
  action: InfoAction
): IBaseState<IAffectationDoc> {
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SAVE_AFFECTATION_ITEM_BEGIN:
    case REMOVE_AFFECTATION_ITEM_BEGIN:
    case AFFECTATION_SAVE_ATTACHMENT_BEGIN:
    case AFFECTATION_REMOVE_ATTACHMENT_BEGIN:
    case GOTO_PAGE_AFFECTATION_BEGIN:
      return produce(state.affectations, pRet => {
        pRet.busy = true;
      });
    case CREATE_AFFECTATION_ITEM:
      return produce(state.affectations, pRet => {
        pRet.addMode = true;
        pRet.previousId = pRet.current.id;
        pRet.current = GetInitialAffectation(state);
        pRet.busy = false;
      });
    case AFFECTATION_REMOVE_ATTACHMENT_SUCCESS:
    case AFFECTATION_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_AFFECTATION_SUCCESS:
    case CHANGE_SEMESTRE_SUCCESS:
    case CHANGE_ANNEE_SUCCESS:
    case SAVE_AFFECTATION_ITEM_SUCCESS:
    case REMOVE_AFFECTATION_ITEM_SUCCESS:
      return refreshAffectation(state.affectations, p);
    case SELECT_AFFECTATION_ITEM:
    return produce(state.affectations, pRet => {
      pRet.busy = false;
      if (p.id){
        const id = p.id;
        const px = state.affectations.pageData.find((x) =>{
            return (x.id === id);
        });
        if (px){
          pRet.current = Object.assign({},px);
          pRet.addMode = false;
        }else {
          pRet.current = GetAffectation();
        }
      }// id
    });
    case CANCEL_AFFECTATION_ITEM:
      return produce(state.affectations, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find((x) =>{
          return (x.id === id);
        });
        if (px){
          pRet.current = Object.assign({},px);
        } else {
          pRet.current = GetAffectation();
        }
        pRet.previousId = "";
      });
    case CHANGE_AFFECTATION_FIELD:
      return produce(state.affectations, pRet => {
        if (p.field && p.value ) {
          const val = p.value;
          const pz = Object.assign({}, pRet.current);
          switch (p.field) {
            case "observations":
              pz.observations = val;
              pz.modified = true;
              pRet.current = pz;
              break;
            case "groupeid":
              pz.groupeid = val;
              pz.modified = true;
              pRet.current = pz;
              break;
            case "semestreid":
              pz.semestreid = val;
              pz.modified = true;
              pRet.current = pz;
              break;
            case "anneeid":
              pz.anneeid = val;
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
      return produce(state.affectations, pRet => {
        pRet.busy = false;
      });
  } // type
} // affectationSubReducer
