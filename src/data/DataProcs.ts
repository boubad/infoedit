import * as moment from "moment";
import { IAffectationDoc, IAnneeDoc, IControleDoc, IEtudAffectationDoc, IEtudiantDoc, IEvtDoc, IGroupeDoc, IMatiereDoc, INoteDoc, ISemestreDoc, IUniteDoc } from './DomainData';
//
////////////////////////
export function DateToDisplay(date:string) : string {
  return  moment(date).format("DD/MM/YYYY");
}// DateToDisplay
///////////////////////////
export enum EvtGenre {
  Absence = 0,
  Retard = 1,
  Comportement = 2,
  Discipline = 3,
  Autre = 4,
  Inconnu = 5
} // enum EvtGenre
export const ETUDIANT_STATUS_FREE = 'free';
export const ETUDIANT_STATUS_BUSY = 'busy';
export const ETUDIANT_STATUS_DONE = 'done';
export const ETUDIANT_STATUS_DEMISSION = 'demmission';
//
export function ConvertEvtTypeToString(etype?: EvtGenre): string {
  let stype = "";
  if (etype !== undefined && etype !== null) {
    switch (etype) {
      case EvtGenre.Absence:
        stype = "Absence";
        break;
      case EvtGenre.Autre:
        stype = "Autre";
        break;
      case EvtGenre.Discipline:
        stype = "Discipline";
        break;
      case EvtGenre.Comportement:
        stype = "Comportement";
        break;
      case EvtGenre.Retard:
        stype = "Retard";
        break;
      case EvtGenre.Inconnu:
        stype = "Inconnu";
        break;
      default:
        break;
    } // etype
  } // etype
  return stype;
} // convertEvtTypeToString
//
export function GetGroupe(): IGroupeDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        name: "",
        sigle: "",
        modified: false,
        attachments: [],
        loaded: false,
        ownerid:''
      }
    );
  } // GetGroupe
  export function GetUnite(): IUniteDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        name: "",
        sigle: "",
        modified: false,
        attachments: [],
        loaded: false,
        ownerid:''
      }
    );
  } // GetUnite
  //
  export function GetSemestre(): ISemestreDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        name: "",
        sigle: "",
        modified: false,
        attachments: [],
        loaded: false,
        ownerid:''
      }
    );
  } // GetSemestre
  //
  export function GetMatiere(): IMatiereDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        name: "",
        modified: false,
        modname: "",
        coefficient: 1.0,
        ecs: 0,
        attachments: [],
        sigle: "",
        uniteid: "",
        loaded: false,
        unitename:'',
        ownerid:''
      }
    );
  } // GetMatiere
  //
  export function GetEtudiant(): IEtudiantDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        modified: false,
        lastname: "",
        firstname: "",
        email: "",
        avatar: "",
        url: "",
        fullname: "",
        notes: [],
        evts: [],
        attachments: [],
        loaded: false,
        status:'',
        affectations:[],
        ownerid:''
      }
    );
  } // GetEtudiant
  //
  export function GetAnnee(): IAnneeDoc {
    return Object.assign(
      {},
      {
        enddate: "",
        id: "",
        modified: false,
        observations: "",
        rev: "",
        startdate: "",
        // tslint:disable-next-line:object-literal-sort-keys
        name: "",
        attachments: [],
        loaded: false,
        sigle: "",
        ownerid:''
      }
    );
  } // GetAnnee
  export function GetAffectation(): IAffectationDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        type: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        attachments: [],
        semestreid: "",
        anneeid: "",
        groupeid: "",
        semestrename: "",
        anneename: "",
        groupename: "",
        modified: false,
        loaded: false,
        startdate:'',
        enddate:'',
        ownerid:''
      }
    );
  } // GetAffectation
  export function GetEtudAffectation(): IEtudAffectationDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        attachments: [],
        affectationid: "",
        etudiantid: "",
        startdate: "",
        enddate: "",
        loaded: false,
        modified: false,
        semestrename: "",
        anneename: "",
        groupename: "",
        fullname: "",
        url: "",
        anneeid: "",
        uniteid: "",
        groupeid: "",
        semestreid: "",
        etudiantStatus:"",
        ownerid:''
      }
    );
  } // GetAffectation
  export function GetEvt(): IEvtDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        modified: false,
        date: "",
        displaydate: "",
        controlename: "",
        fullname: "",
        url: "",
        genre: 5,
        genrestring: "",
        duration: "",
        attachments: [],
        loaded: false,
        matierename: "",
        semestrename: "",
        anneename: "",
        groupename: "",
        controleid: "",
        etudiantid: "",
        anneeid: "",
        uniteid: "",
        groupeid: "",
        semestreid: "",
        matiereid: "",
        ownerid:'',
        affectationid:'',
        etudaffectationid:'',
      }
    );
  } // GetEvt
  //
  export function GetNote(): INoteDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        modified: false,
        date: "",
        displaydate: "",
        controlename: "",
        fullname: "",
        url: "",
        value: null,
        attachments: [],
        loaded: false,
        matierename: "",
        semestrename: "",
        unitename: "",
        anneename: "",
        groupename: "",
        controleid: "",
        etudiantid: "",
        coefficient: 1.0,
        anneeid: "",
        uniteid: "",
        groupeid: "",
        semestreid: "",
        matiereid: "",
        ownerid:'',
        affectationid:'',
        etudaffectationid:'',
      }
    );
  } // GetNote
  //
  export function GetControle(): IControleDoc {
    return Object.assign(
      {},
      {
        id: "",
        rev: "",
        // tslint:disable-next-line:object-literal-sort-keys
        observations: "",
        modified: false,
        affectationid: "",
        matiereid: "",
        date: "",
        displaydate: "",
        name: "",
        duration: "",
        place: "",
        coefficient: 1.0,
        notes: [],
        evts: [],
        attachments: [],
        loaded: false,
        matierename: "",
        semestrename: "",
        unitename: "",
        anneename: "",
        groupename: "",
        anneeid: "",
        uniteid: "",
        groupeid: "",
        semestreid: "",
        ownerid:''
      }
    );
  } // GetControle
  //
  