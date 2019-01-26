import { FluxStandardAction } from "flux-standard-action";
import produce from "immer";
import { IMPORT_ETUDIANT_SUCCESS, REFRESHANNEESEMESTRE_STATUS_SUCCESS } from 'src/features/Outils/redux/OutilsActions';
import { GetEtudiant } from '../../../data/DataProcs';
import { IEtudiantDoc } from '../../../data/DomainData';
import { IEtudiantState } from '../../../redux/InfoState';
import { GetInitialEtudiantState } from '../../../redux/initialState';
import { IPayload } from '../../../redux/IPayload';
import { ETUDIANT_REMOVE_ATTACHMENT_SUCCESS, ETUDIANT_SAVE_ATTACHMENT_SUCCESS } from './EtudiantActions';
import {
  CANCEL_ETUDIANT_ITEM,
  CHANGE_ETUDIANT_FIELD,
  CHANGESTATUS_ETUDIANT_BEGIN,
  CHANGESTATUS_ETUDIANT_SUCCESS,
  CREATE_ETUDIANT_ITEM,
  ETUDIANT_REMOVE_ATTACHMENT_BEGIN,
  ETUDIANT_SAVE_ATTACHMENT_BEGIN,
  GOTO_PAGE_ETUDIANT_BEGIN,
  GOTO_PAGE_ETUDIANT_SUCCESS,
  REMOVE_ETUDIANT_ITEM_BEGIN,
  REMOVE_ETUDIANT_ITEM_SUCCESS,
  SAVE_ETUDIANT_ITEM_BEGIN,
  SAVE_ETUDIANT_ITEM_SUCCESS,
  SELECT_ETUDIANT_BEGIN,
  SELECT_ETUDIANT_EVT,
  SELECT_ETUDIANT_NOTE,
  SELECT_ETUDIANT_SUCCESS,
  SET_AVATAR_BEGIN,
  SET_AVATAR_SUCCESS
} from "./EtudiantActions";
//////////////////////////////////////////
function refreshEtudiant(
  state: IEtudiantState,
  p: IPayload
): IEtudiantState {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.etudiantStatus){
      pRet.etudiantStatus = p.etudiantStatus;
    }
    if (p.page) {
      pRet.currentPage = p.page;
    }
    if (p.etudiantsCount) {
      const n = p.etudiantsCount;
      pRet.itemsCount = n;
      const nc = pRet.pageSize;
      let np = Math.floor(n / nc);
      if (n % nc !== 0) {
        np = np + 1;
      }
      pRet.pagesCount = np;
    }
    if (p.etudiants) {
      pRet.pageData = p.etudiants;
    }
    if (p.etudiant) {
      pRet.current = p.etudiant;
      const bb: IEtudiantDoc[] = [];
      const pp = pRet.pageData;
      const n = pp.length;
      const id = p.etudiant.id;
      for (let i = 0; i < n; i++) {
        const x = pp[i];
        if (x.id === id) {
          bb.push(p.etudiant);
        } else {
          bb.push(x);
        }
      } // i
      pRet.pageData = bb;
    }
    if (p.note){
      pRet.note = p.note;
    }
    if (p.evt){
      pRet.evt = p.evt;
    }
    pRet.addMode = false;
  });
} // refreshEtudiant
/////////////////////////////////////////////
export function etudiantSubReducer(
  state: IEtudiantState,
  action: FluxStandardAction<IPayload>
): IEtudiantState {
  if (!state){
    return GetInitialEtudiantState();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case CHANGESTATUS_ETUDIANT_BEGIN:
    case SELECT_ETUDIANT_BEGIN:
    case SAVE_ETUDIANT_ITEM_BEGIN:
    case REMOVE_ETUDIANT_ITEM_BEGIN:
    case ETUDIANT_SAVE_ATTACHMENT_BEGIN:
    case ETUDIANT_REMOVE_ATTACHMENT_BEGIN:
    case SET_AVATAR_BEGIN:
    case GOTO_PAGE_ETUDIANT_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case CREATE_ETUDIANT_ITEM:
      return produce(state, pRet => {
        if (p.etudiant){
          pRet.previousId = pRet.current.id;
          pRet.current = p.etudiant;
          pRet.addMode = true;
        }
        pRet.busy = false;
      });
    case SELECT_ETUDIANT_NOTE:
      return produce(state, pRet => {
        if (p.note) {
          pRet.note = p.note;
        }
        if (p.id) {
          const id = p.id;
          const px = pRet.current.notes.find(x => {
            return x.id === id;
          });
          if (px !== undefined) {
            pRet.note = px;
          }
        }
        pRet.busy = false;
      });
    case SELECT_ETUDIANT_EVT:
      return produce(state, pRet => {
        if (p.evt) {
          pRet.evt = p.evt;
        }
        if (p.id) {
          const id = p.id;
          const px = pRet.current.evts.find(x => {
            return x.id === id;
          });
          if (px !== undefined) {
            pRet.evt = px;
          }
        }
        pRet.busy = false;
      });
    case CHANGESTATUS_ETUDIANT_SUCCESS:
    case SET_AVATAR_SUCCESS:
    case GOTO_PAGE_ETUDIANT_SUCCESS:
    case SELECT_ETUDIANT_SUCCESS:
    case SAVE_ETUDIANT_ITEM_SUCCESS:
    case REMOVE_ETUDIANT_ITEM_SUCCESS:
    case ETUDIANT_SAVE_ATTACHMENT_SUCCESS:
    case ETUDIANT_REMOVE_ATTACHMENT_SUCCESS:
    case IMPORT_ETUDIANT_SUCCESS:
    case  REFRESHANNEESEMESTRE_STATUS_SUCCESS:
      return refreshEtudiant(state, p);
    case REMOVE_ETUDIANT_ITEM_SUCCESS: {
      const px = refreshEtudiant(state, p);
      return produce(px, pRet => {
        pRet.current = GetEtudiant();
        pRet.busy = false;
      });
    }
    case CANCEL_ETUDIANT_ITEM:
      return produce(state, pRet => {
        pRet.busy = false;
        const id = pRet.previousId;
        pRet.addMode = false;
        const px = pRet.pageData.find(x => {
          return x.id === id;
        });
        if (px !== undefined) {
          pRet.current = Object.assign({}, px);
        } else {
          pRet.current = GetEtudiant();
        }
        pRet.previousId = "";
      });
    case CHANGE_ETUDIANT_FIELD:
      return produce(state, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.current;
          switch (p.field) {
            case "sup":
              pz.sup = val;
              pz.modified = true;
              break;
            case "redoublant":
              pz.redoublant = val;
              pz.modified = true;
              break;
            case "sexe":
              pz.sexe = val;
              pz.modified = true;
              break;
            case "email":
              pz.email = val;
              pz.modified = true;
              break;
            case "firstname":
              pz.firstname = val;
              pz.modified = true;
              break;
            case "lastname":
              pz.lastname = val;
              pz.modified = true;
              break;
            case "observations":
              pz.observations = val;
              pz.modified = true;
              break;
            case "status":
              pz.status = val;
              pz.modified = true;
            case "ident":
              pz.ident = val;
              pz.modified = true;
              break;
            case "data":
              pz.data = val;
              pz.modified = true;
              break;
            default:
              {
                const data = pz.data;
                data[p.field] = val;
                pz.data = data;
                pz.modified = true;
              }
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
} // etudiantSubReducer
