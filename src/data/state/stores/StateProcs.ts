import { DateToDisplay, ETUDIANT_STATUS_FREE, GetAffectation, GetAnnee, GetControle, GetDataVarDoc, GetEtudAffectation, GetEtudiant, GetEvt, GetGroupe, GetInfoUser, GetMatiere, GetNote, GetSemestre, GetUnite } from '../../../data/domain/DataProcs';
import { IAffectationDoc, IAnneeDoc, IControleDoc, IDataVarDoc, IEtudAffectationDoc, IEtudiantDoc, IEvtDoc, IGroupeDoc, IInfoUserDoc, IMatiereDoc, INoteDoc, ISemestreDoc, IUniteDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../InfoState';


export function FindNoteById(state: IInfoState, id: string): INoteDoc {
  let pz = state.etudiants.current.notes.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    pz = state.controles.current.notes.find(p => {
      return p.id === id;
    });
  }
  if (pz === undefined) {
    pz = GetInitialNote(state);
  }
  return pz;
} // FindNoteById
export function FindEvtById(state: IInfoState, id: string): IEvtDoc {
  let pz = state.etudiants.current.evts.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    pz = state.controles.current.evts.find(p => {
      return p.id === id;
    });
  }
  if (pz === undefined) {
    pz = GetInitialEvt(state);
  }
  return pz;
} // FindEvtById
export function FindEtudiantById(state: IInfoState, id: string): IEtudiantDoc {
  const pz = state.etudiants.pageData.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    return GetInitialEtudiant(state);
  } else {
    return Object.assign({}, pz);
  }
} // FindEtudiantById
export function FindControleById(state: IInfoState, id: string): IControleDoc {
  const pz = state.controles.pageData.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    return GetInitialControle(state);
  } else {
    return Object.assign({}, pz);
  }
} // FindControleById
//
export function FindMatiereById(state: IInfoState, id: string): IMatiereDoc {
  const pz = state.matieres.pageData.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    return GetInitialMatiere(state);
  } else {
    return Object.assign({}, pz);
  }
} // FindMatiereById
export function FindGroupeById(state: IInfoState, id: string): IGroupeDoc {
  const pz = state.groupes.pageData.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    return GetInitialGroupe(state);
  } else {
    return Object.assign({}, pz);
  }
} // FindGroupeById
export function FindUniteById(state: IInfoState, id: string): IUniteDoc {
  const pz = state.unites.pageData.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    return GetInitialUnite(state);
  } else {
    return Object.assign({}, pz);
  }
} // FindUniteById
export function FindSemestreById(state: IInfoState, id: string): ISemestreDoc {
  const pz = state.semestres.pageData.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    return GetInitialSemestre(state);
  } else {
    return Object.assign({}, pz);
  }
} // FindSemestreById
//
export function FindAnneeById(state: IInfoState, id: string): IAnneeDoc {
  const pz = state.annees.pageData.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    return GetInitialAnnee(state);
  } else {
    return Object.assign({}, pz);
  }
} // FindAnneeById
export function FindAffectationById(
  state: IInfoState,
  id: string
): IAffectationDoc {
  const pz = state.affectations.pageData.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    return GetInitialAffectation(state);
  } else {
    return Object.assign({}, pz);
  }
} // FindAffectationById
export function FindEtudAffectationById(
  state: IInfoState,
  id: string
): IEtudAffectationDoc {
  const pz = state.etudaffectations.pageData.find(p => {
    return p.id === id;
  });
  if (pz === undefined) {
    return GetInitialEtudAffectation(state);
  } else {
    return Object.assign({}, pz);
  }
} // FindEtudAffectationById
/////////////////////////////////////////////
export function GetInitialAffectation(state: IInfoState): IAffectationDoc {
  const pz = GetAffectation();
  pz.anneeid = state.annees.current.id;
  pz.semestreid = state.semestres.current.id;
  pz.startdate = state.annees.current.startdate;
  pz.enddate = state.annees.current.enddate;
  return pz;
} // GetInitialAffectation
export function GetInitialEtudAffectation(
  state: IInfoState
): IEtudAffectationDoc {
  const pz = GetEtudAffectation();
  const p = state.affectations.current;
  pz.affectationid = p.id;
  pz.anneeid = p.anneeid;
  pz.semestreid = p.semestreid;
  pz.groupeid = p.groupeid;
  pz.startdate = p.startdate;
  pz.enddate = p.enddate;
  return pz;
} // GetInitialAffectation
export function GetInitialAnnee(state: IInfoState): IAnneeDoc {
  const pz = GetAnnee();
  pz.startdate = new Date().toISOString().slice(0, 10);
  pz.enddate = new Date().toISOString().slice(0, 10);
  return pz;
} // GetInitialDate
//
export function GetInitialMatiere(state: IInfoState): IMatiereDoc {
  const pz = GetMatiere();
  pz.uniteid = state.unites.current.id;
  pz.coefficient=1.0;
  return pz;
} // GetInitialMatiere
export function GetInitialDataVar(state: IInfoState): IDataVarDoc {
  const pz = GetDataVarDoc();
  return pz;
} // GetInitialDataVarDo
export function GetInitialGroupe(state: IInfoState): IGroupeDoc {
  const pz = GetGroupe();
  return pz;
} // GetInitialGroupe
export function GetInitialUnite(state: IInfoState): IUniteDoc {
  const pz = GetUnite();
  return pz;
} // GetInitialUnite
export function GetInitialSemestre(state: IInfoState): ISemestreDoc {
  const pz = GetSemestre();
  return pz;
} // GetInitialUnite
//
export function GetInitialControle(state: IInfoState): IControleDoc {
  const pz = GetControle();
  const p = state.affectations.current;
  pz.affectationid = p.id;
  pz.anneeid = p.anneeid;
  pz.matiereid = state.matieres.current.id;
  pz.semestreid = p.semestreid;
  pz.groupeid = p.groupeid;
  pz.uniteid = state.matieres.current.uniteid;
  pz.coefficient = 1.0;
  pz.date = new Date().toISOString().slice(0, 10);
  pz.displaydate = DateToDisplay(pz.date);
  pz.ownerid = state.appstate.owner.id;
  return pz;
} // GetInitialControle
export function GetInitialEtudiant(state: IInfoState): IEtudiantDoc {
  const pz = GetEtudiant();
  pz.status = ETUDIANT_STATUS_FREE;
  return pz;
} // GetInitialEtudiant
export function GetInitialUser(state: IInfoState): IInfoUserDoc {
  const pz = GetInfoUser();
  pz.status = ETUDIANT_STATUS_FREE;
  return pz;
} // GetInitialEtudiant
export function GetInitialNote(state: IInfoState): INoteDoc {
  const pz = GetNote();
  const p = state.controles.current;
  pz.ownerid = p.ownerid;
  pz.affectationid = p.affectationid;
  pz.controleid = p.id;
  pz.date = p.date;
  pz.displaydate = p.displaydate;
  pz.coefficient = p.coefficient;
  pz.controleid = p.id;
  pz.anneeid = p.anneeid;
  pz.matiereid = p.matiereid;
  pz.semestreid = p.semestreid;
  pz.groupeid = p.groupeid;
  pz.uniteid = p.uniteid;
  pz.anneename = p.anneename;
  pz.semestrename = p.semestrename;
  pz.unitename = p.unitename;
  pz.matierename = p.matierename;
  pz.groupename = p.groupename;
  return pz;
} // GetInitialNote
export function GetInitialEvt(state: IInfoState): IEvtDoc {
  const pz = GetEvt();
  const p = state.controles.current;
  pz.ownerid = p.ownerid;
  pz.affectationid = p.affectationid;
  pz.controleid = p.id;
  pz.date = p.date;
  pz.displaydate = p.displaydate;
  pz.controleid = p.id;
  pz.anneeid = p.anneeid;
  pz.matiereid = p.matiereid;
  pz.semestreid = p.semestreid;
  pz.uniteid = p.uniteid;
  pz.groupeid = p.groupeid;
  pz.controlename = p.name;
  pz.anneename = p.anneename;
  pz.semestrename = p.semestrename;
  pz.matierename = p.matierename;
  pz.unitename = p.unitename;
  pz.duration = p.duration;
  return pz;
} // GetInitialEvt
