import produce from "immer";
import { GetControle, GetEvt, GetNote } from '../../../data/domain/DataProcs';
import { IControleDoc } from '../../../data/domain/DomainData';
import { IControleState } from '../../../data/state/InfoState';
import { InfoAction, IPayload } from '../../../data/state/IPayload';
import { GetInitialControleState } from '../../../data/state/stores/initialState';
import { REMOVE_ANNEE_ITEM_SUCCESS } from "../../../features/Annee/redux/AnneeActions";
import {
  CHANGE_ANNEE_SUCCESS,
  CHANGE_GROUPE_SUCCESS,
  CHANGE_MATIERE_SUCCESS,
  CHANGE_SEMESTRE_SUCCESS,
} from "../../../features/AppState/redux/AppStateActions";
import {
  REMOVE_ETUDIANT_ITEM_SUCCESS,
  SAVE_ETUDIANT_ITEM_SUCCESS
} from "../../../features/Etudiant/redux/EtudiantActions";
import { REMOVE_GROUPE_ITEM_SUCCESS } from "../../../features/Groupe/redux/GroupeActions";
import { REMOVE_MATIERE_ITEM_SUCCESS } from "../../../features/Matiere/redux/MatiereActions";
import { REFRESHANNEESEMESTRE_STATUS_SUCCESS } from "../../../features/Outils/redux/OutilsActions";
import { REMOVE_SEMESTRE_ITEM_SUCCESS } from "../../../features/Semestre/redux/SemestreActions";
import { REMOVE_UNITE_ITEM_SUCCESS } from "../../../features/Unite/redux/UniteActions";
import {
  CANCEL_CONTROLE_EVT,
  CANCEL_CONTROLE_ITEM,
  CANCEL_CONTROLE_NOTE,
  CHANGE_CONTROLE_EVT_FIELD,
  CHANGE_CONTROLE_FIELD,
  CHANGE_CONTROLE_NOTE_FIELD,
  CONTROLE_CHECKNOTES_BEGIN,
  CONTROLE_CHECKNOTES_SUCCESS,
  CONTROLE_REMOVE_ATTACHMENT_BEGIN,
  CONTROLE_REMOVE_ATTACHMENT_SUCCESS,
  CONTROLE_REMOVE_EVT_ATTACHMENT_BEGIN,
  CONTROLE_REMOVE_EVT_ATTACHMENT_SUCCESS,
  CONTROLE_REMOVE_NOTE_ATTACHMENT_BEGIN,
  CONTROLE_REMOVE_NOTE_ATTACHMENT_SUCCESS,
  CONTROLE_SAVE_ATTACHMENT_BEGIN,
  CONTROLE_SAVE_ATTACHMENT_SUCCESS,
  CONTROLE_SAVE_EVT_ATTACHMENT_BEGIN,
  CONTROLE_SAVE_EVT_ATTACHMENT_SUCCESS,
  CONTROLE_SAVE_ITEM_BEGIN,
  CONTROLE_SAVE_NOTE_ATTACHMENT_BEGIN,
  CONTROLE_SAVE_NOTE_ATTACHMENT_SUCCESS,
  CREATE_CONTROLE_EVT,
  CREATE_CONTROLE_ITEM,
  GOTO_PAGE_CONTROLE_BEGIN,
  GOTO_PAGE_CONTROLE_SUCCESS,
  REMOVE_CONTROLE_EVT_BEGIN,
  REMOVE_CONTROLE_EVT_SUCCESS,
  REMOVE_CONTROLE_ITEM_BEGIN,
  REMOVE_CONTROLE_ITEM_SUCCESS,
  SAVE_CONTROLE_EVT_BEGIN,
  SAVE_CONTROLE_EVT_SUCCESS,
  SAVE_CONTROLE_ITEM_SUCCESS,
  SAVE_CONTROLE_NOTE_BEGIN,
  SAVE_CONTROLE_NOTE_SUCCESS,
  SELECT_CONTROLE_BEGIN,
  SELECT_CONTROLE_EVT,
  SELECT_CONTROLE_NOTE,
  SELECT_CONTROLE_SUCCESS
} from "./ControleActions";

//////////////////////////////////////
function findControleById(state: IControleState, id: string): IControleDoc {
  let pz = state.pageData.find(x => {
    return x.id === id;
  });
  if (pz === undefined) {
    pz = GetControle();
  }
  return pz;
} // findMatiereById
////////////////////////////////////////
function refreshEvt(state: IControleState, p: IPayload): IControleState {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.evt) {
      pRet.evt = p.evt;
    }
    const controleid = pRet.evt.controleid;
    if (pRet.current.id === controleid) {
      if (p.controleEvts) {
        pRet.current.evts = p.controleEvts;
      }
    }
    const ppx = pRet.pageData;
    const nx = ppx.length;
    for (let i = 0; i < nx; i++) {
      const x = ppx[i];
      if (x.id === controleid) {
        pRet.evt.date = x.date;
        pRet.evt.displaydate = x.displaydate;
        pRet.evt.controlename = x.name;
        if (p.controleEvts !== undefined) {
          pRet.pageData[i].evts = p.controleEvts;
        }
        break;
      } // found
    } // i
    pRet.evt.modified = false;
  });
} // refreshEvt
function refreshNote(state: IControleState, p: IPayload): IControleState {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.note) {
      pRet.note = p.note;
    }
    const controleid = pRet.note.controleid;
    if (pRet.current.id === controleid) {
      if (p.controleNotes) {
        pRet.current.notes = p.controleNotes;
      }
    }
    const ppx = pRet.pageData;
    const nx = ppx.length;
    for (let i = 0; i < nx; i++) {
      const x = ppx[i];
      if (x.id === controleid) {
        pRet.note.date = x.date;
        pRet.note.displaydate = x.displaydate;
        pRet.note.controlename = x.name;
        pRet.note.coefficient = x.coefficient;
        if (p.controleNotes !== undefined) {
          pRet.pageData[i].notes = p.controleNotes;
        }
        break;
      } // found
    } // i
    pRet.note.modified = false;
  });
} // refreshNote
//////////////////////////////////////////
function refreshControle(state: IControleState, p: IPayload): IControleState {
  return produce(state, pRet => {
    pRet.busy = false;
    if (p.etudiantsOptions) {
      pRet.etudiantsOptions = p.etudiantsOptions;
    }
    if (p.etudAffectations) {
      pRet.etudAffectations = p.etudAffectations;
    }
    if (p.page) {
      pRet.currentPage = p.page;
    }
    if (p.controlesCount) {
      const n = p.controlesCount;
      pRet.itemsCount = n;
      const nc = pRet.pageSize;
      let np = Math.floor(n / nc);
      if (n % nc !== 0) {
        np = np + 1;
      }
      pRet.pagesCount = np;
    }
    if (p.controles) {
      pRet.pageData = p.controles;
    }
    if (p.controle) {
      pRet.current = p.controle;
      pRet.evt = GetEvt();
      pRet.note = GetNote();
      pRet.evtAddMode = false;
      pRet.current.modified = false;
      const bb: IControleDoc[] = [];
      const pp = pRet.pageData;
      const n = pp.length;
      const id = p.controle.id;
      for (let i = 0; i < n; i++) {
        const x = pp[i];
        if (x.id === id) {
          bb.push(p.controle);
        } else {
          bb.push(x);
        }
      } // i
      pRet.pageData = bb;
    }
  });
} // refreshControle
/////////////////////////////////////////////
export function controleSubReducer(
  state: IControleState,
  action: InfoAction
): IControleState {
  if (!state) {
    return GetInitialControleState();
  }
  const p = action.payload ? action.payload : {};
  switch (action.type) {
    case SELECT_CONTROLE_BEGIN:
    case CONTROLE_SAVE_ITEM_BEGIN:
    case REMOVE_CONTROLE_ITEM_BEGIN:
    case CONTROLE_SAVE_ATTACHMENT_BEGIN:
    case CONTROLE_REMOVE_ATTACHMENT_BEGIN:
    case CONTROLE_CHECKNOTES_BEGIN:
    case GOTO_PAGE_CONTROLE_BEGIN:
    case SAVE_CONTROLE_EVT_BEGIN:
    case REMOVE_CONTROLE_EVT_BEGIN:
    case SAVE_CONTROLE_NOTE_BEGIN:
    case CONTROLE_SAVE_NOTE_ATTACHMENT_BEGIN:
    case CONTROLE_REMOVE_NOTE_ATTACHMENT_BEGIN:
    case CONTROLE_SAVE_EVT_ATTACHMENT_BEGIN:
    case CONTROLE_REMOVE_EVT_ATTACHMENT_BEGIN:
      return produce(state, pRet => {
        pRet.busy = true;
      });
    case CREATE_CONTROLE_ITEM:
      return produce(state, pRet => {
        if (p.controle) {
          pRet.previousId = pRet.current.id;
          pRet.current = p.controle;
          pRet.addMode = true;
        }
        pRet.busy = false;
      });
    case CREATE_CONTROLE_EVT:
      return produce(state, pRet => {
        if (p.evt) {
          pRet.evt = p.evt;
          pRet.evtAddMode = true;
          pRet.evt.controleid = pRet.current.id;
          pRet.evt.etudiantid = pRet.current.id;
        }
        pRet.busy = false;
      });
    case SELECT_CONTROLE_NOTE:
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
    case SELECT_CONTROLE_EVT:
      return produce(state, pRet => {
        if (p.evt) {
          pRet.evt = p.evt;
          pRet.evtAddMode = false;
        }
        if (p.id) {
          const id = p.id;
          const px = pRet.current.evts.find(x => {
            return x.id === id;
          });
          if (px) {
            pRet.evt = px;
            pRet.evtAddMode = false;
          }
        }
        pRet.busy = false;
      });
    case CANCEL_CONTROLE_EVT:
      return produce(state, pRet => {
        pRet.evtAddMode = false;
        pRet.busy = false;
      });
    case CANCEL_CONTROLE_NOTE:
      return produce(state, pRet => {
        pRet.busy = false;
      });
    case CONTROLE_REMOVE_NOTE_ATTACHMENT_SUCCESS:
    case CONTROLE_SAVE_NOTE_ATTACHMENT_SUCCESS:
    case SAVE_CONTROLE_NOTE_SUCCESS:
      return refreshNote(state, p);
    case CONTROLE_REMOVE_EVT_ATTACHMENT_SUCCESS:
    case CONTROLE_SAVE_EVT_ATTACHMENT_SUCCESS:
    case REMOVE_CONTROLE_EVT_SUCCESS:
    case SAVE_CONTROLE_EVT_SUCCESS:
      refreshEvt(state, p);
    case CHANGE_ANNEE_SUCCESS:
    case REMOVE_ANNEE_ITEM_SUCCESS:
    case CONTROLE_CHECKNOTES_SUCCESS:
    case CONTROLE_REMOVE_ATTACHMENT_SUCCESS:
    case CONTROLE_SAVE_ATTACHMENT_SUCCESS:
    case GOTO_PAGE_CONTROLE_SUCCESS:
    case SELECT_CONTROLE_SUCCESS:
    case CHANGE_SEMESTRE_SUCCESS:
    case REMOVE_SEMESTRE_ITEM_SUCCESS:
    case REMOVE_UNITE_ITEM_SUCCESS:
    case CHANGE_GROUPE_SUCCESS:
    case REMOVE_GROUPE_ITEM_SUCCESS:
    case CHANGE_MATIERE_SUCCESS:
    case REMOVE_MATIERE_ITEM_SUCCESS:
    case SAVE_CONTROLE_ITEM_SUCCESS:
    case SAVE_ETUDIANT_ITEM_SUCCESS:
    case REMOVE_ETUDIANT_ITEM_SUCCESS:
    case REFRESHANNEESEMESTRE_STATUS_SUCCESS:
      return refreshControle(state, p);
    case REMOVE_CONTROLE_ITEM_SUCCESS: {
      const px = refreshControle(state, p);
      return produce(px, pRet => {
        pRet.current = GetControle();
        pRet.busy = false;
      });
    }
    case CANCEL_CONTROLE_ITEM:
      return produce(state, pRet => {
        const id = pRet.previousId;
        pRet.addMode = false;
        pRet.current = findControleById(pRet, id);
        pRet.previousId = "";
        pRet.busy = false;
      });
    case CHANGE_CONTROLE_FIELD:
      return produce(state, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.current;
          switch (p.field) {
            case "duration":
              pz.duration = val;
              pz.modified = true;
              break;
            case "coefficient":
              pz.coefficient = val;
              pz.modified = true;
              break;
            case "place":
              pz.place = val;
              pz.modified = true;
              break;
            case "observations":
              pz.observations = val;
              pz.modified = true;
              break;
            case "date":
              pz.date = val;
              pz.modified = true;
              break;
            case "name":
              pz.name = val;
              pz.modified = true;
              break;
            case "semestreid":
              pz.semestreid = val;
              pz.modified = true;
              break;
            case "groupeid":
              pz.groupeid = val;
              pz.modified = true;
              break;
            case "matiereid":
              pz.matiereid = val;
              pz.modified = true;
              break;
            case "uniteid":
              pz.uniteid = val;
              pz.modified = true;
              break;
            case "anneeid":
              pz.anneeid = val;
              pz.modified = true;
              break;
            case "affectationid":
              pz.affectationid = val;
              pz.modified = true;
              break;
            default:
              break;
          } // field
        } // p
        pRet.busy = false;
      });
    case CHANGE_CONTROLE_EVT_FIELD:
      return produce(state, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.evt;
          switch (p.field) {
            case "justifie":
            {
              const s = "" + val;
              const ss = s.trim().toUpperCase();
              const b = (ss === "O") ? true : false;
              pz.justifie = b;
              pz.modified = true;
            }
              break;
            case "evttype":
              pz.genre = val;
              pz.modified = true;
              break;
            case "genre":
              pz.genre = val;
              pz.modified = true;
              break;
            case "duration":
              pz.duration = val;
              pz.modified = true;
              break;
            case "etudiantid":
              {
                pz.etudiantid = val;
                pz.modified = true;
                const px = pRet.etudiantsOptions.find(x => {
                  return x.id === pz.etudiantid;
                });
                if (px) {
                  pz.fullname = px.text;
                  pz.url = px.url ? px.url : "";
                }
                const py = pRet.etudAffectations.find(x => {
                  return x.etudiantid === pz.etudiantid;
                });
                if (py) {
                  pz.etudaffectationid = py.id;
                } else {
                  pz.etudaffectationid = "";
                }
              }
              break;
            case "controleid":
              pz.controleid = val;
              pz.modified = true;
              break;
            case "observations":
              pz.observations = val;
              pz.modified = true;
              break;
            default:
              break;
          } // field
        } // p
        pRet.busy = false;
      });
    case CHANGE_CONTROLE_NOTE_FIELD:
      return produce(state, pRet => {
        if (p.field && p.value) {
          const val = p.value;
          const pz = pRet.note;
          switch (p.field) {
            case "value":
              pz.value = val;
              pz.modified = true;
              break;
            case "observations":
              pz.observations = val;
              pz.modified = true;
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
} // controleReducer
