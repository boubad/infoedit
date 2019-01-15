import produce from "immer";
import { GetAnnee } from '../../../data/DataProcs';
import { IAnneeDoc } from '../../../data/DomainData';
import { IBaseState, IInfoState } from '../../../redux/InfoState';
import { InfoAction, IPayload } from '../../../redux/IPayload';
import { CHANGE_ANNEE_SUCCESS } from '../../AppState/redux/AppStateActions';
import {
  ANNEE_REMOVE_ATTACHMENT_BEGIN,
  ANNEE_REMOVE_ATTACHMENT_SUCCESS,
  ANNEE_SAVE_ATTACHMENT_BEGIN,
  ANNEE_SAVE_ATTACHMENT_SUCCESS,
  CANCEL_ANNEE_ITEM,
  CHANGE_ANNEE_FIELD,
  CREATE_ANNEE_ITEM,
  GOTO_PAGE_ANNEE_BEGIN,
  GOTO_PAGE_ANNEE_SUCCESS,
  REFRESH_ANNEE_BEGIN,
  REFRESH_ANNEE_SUCCESS,
  REMOVE_ANNEE_ITEM_BEGIN,
  REMOVE_ANNEE_ITEM_SUCCESS,
  SAVE_ANNEE_ITEM_BEGIN,
  SAVE_ANNEE_ITEM_SUCCESS,
  SELECT_ANNEE_ITEM
} from "./AnneeActions";
//////////////////////////////////////////
function refreshAnnee(
  state: IBaseState<IAnneeDoc>,
  p: IPayload
): IBaseState<IAnneeDoc> {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.page){
      pRet.currentPage = p.page;
    }
    if (p.anneesCount) {
      const n = p.anneesCount;
      pRet.itemsCount = n;
      const nc = pRet.pageSize;
      let np = Math.floor(n / nc);
      if ((n % nc) !== 0){
        np = np + 1;
      }
      pRet.pagesCount = np;
    }
    if (p.annees) {
      pRet.pageData = p.annees;
    }
    if (p.annee) {
      pRet.current = p.annee;
    } else {
      pRet.current = GetAnnee();
    }
    pRet.addMode = false;
  });
} // refreshAnnee
/////////////////////////////////////////////
export function anneeSubReducer(
  state: IInfoState,
  action: InfoAction
): IBaseState<IAnneeDoc> {
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SAVE_ANNEE_ITEM_BEGIN:
    case REMOVE_ANNEE_ITEM_BEGIN:
    case ANNEE_SAVE_ATTACHMENT_BEGIN:
    case ANNEE_REMOVE_ATTACHMENT_BEGIN:
    case GOTO_PAGE_ANNEE_BEGIN:
    case REFRESH_ANNEE_BEGIN:
      return produce(state.annees, pRet => {
        pRet.busy = true;
      });
    case CHANGE_ANNEE_SUCCESS:
     return produce(state.annees,(pRet) =>{
      pRet.busy = false;
      if (p.annee){
        pRet.current = p.annee;
        pRet.addMode = false;
      }
     });
    case SELECT_ANNEE_ITEM:
      return produce(state.annees,(pRet)=>{
        pRet.busy = false;
        if (p.id){
          const id = p.id;
          const px = state.annees.pageData.find((x) =>{
              return (x.id === id);
          });
          if (px){
            pRet.current = Object.assign({},px);
            pRet.addMode = false;
          }else {
            pRet.current = GetAnnee();
          }
        }// id
      });
    case CREATE_ANNEE_ITEM:
      return produce(state.annees, pRet => {
        pRet.busy = false;
        pRet.addMode = true;
        pRet.current = GetAnnee();
      });
    case REFRESH_ANNEE_SUCCESS:
    case ANNEE_REMOVE_ATTACHMENT_SUCCESS:
    case ANNEE_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_ANNEE_SUCCESS:
    case REMOVE_ANNEE_ITEM_SUCCESS:
    case SAVE_ANNEE_ITEM_SUCCESS:
      return refreshAnnee(state.annees, p);
    case CANCEL_ANNEE_ITEM:
      return produce(state.annees, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find((x) =>{
          return (x.id === id);
        });
        if (px){
          pRet.current = Object.assign({},px);
        } else {
          pRet.current = GetAnnee();
        }
        pRet.previousId = "";
      });
    case CHANGE_ANNEE_FIELD:
      return produce(state.annees, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.current;
          switch (p.field) {
            case "observations":
              pz.observations = val;
              pz.modified = true;
              break;
            case "startdate":
              pz.startdate = val;
              pz.modified = true;
              break;
            case "enddate":
              pz.enddate = val;
              pz.modified = true;
              break;
            case "name":
              pz.name = val;
              pz.modified = true;
              break;
            case "sigle":
              pz.sigle = val;
              pz.modified = true;
              break;
            default:
              break;
          } // field
        } // p
        pRet.busy = false;
      });
    default:
       return produce(state.annees,(pRet)=>{
        pRet.busy = false;
       });
  } // type
} // anneeReducer
