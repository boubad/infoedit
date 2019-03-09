export interface INoteStruct {
  ival:number;
  sval:string;
}// interface INoteStruct
export interface IAttachedDoc {
  docid: string;
  name: string;
  mime: string;
  isAvatar: boolean;
  url: string;
} // interface IAttachedDoc
export interface IStatItemDoc {
  id: string;
  rev: string;
  anneetag:string;
  ident:string;
  etudiantid:string;
  attachments: IAttachedDoc[];
  data:any;
}// interface IStatItemDoc
export interface IBaseDoc {
  id: string;
  rev: string;
  
  observations: string;
  modified: boolean;
  loaded: boolean;
  attachments: IAttachedDoc[];
} // interface IBaseDoc
export interface IInfoUserDoc extends IBaseDoc {
  lastname: string;
  firstname: string;
  email: string;
  avatar: string;
  status: string;
  sexe:string;
  url: string;
  fullname: string;
  password:string;
  username:string;
  role:string;
}// interface IInfoUserDoc
export interface ISigleNamedDoc extends IBaseDoc {
  sigle: string;
  name: string;
}// interface ISigleNamedDoc
export interface IAnneeDoc extends ISigleNamedDoc {
  startdate: string;
  enddate: string;
  displaystartdate: string;
  displayenddate: string;
  tag:string;
} // interface IAnneeDoc
export interface ISemestreDoc extends ISigleNamedDoc {
  tag:string;
} // interface IUniteDoc
// tslint:disable-next-line:no-empty-interface
export interface IUniteDoc extends ISigleNamedDoc {} // interface IUniteDoc
// tslint:disable-next-line:no-empty-interface
export interface IGroupeDoc extends ISigleNamedDoc {} // interface IGroupeDoc
export interface IDataVarDoc extends ISigleNamedDoc {
  modalvalues:string[];
  vartype:string;
  tag:string;
}// interface IDataVarDoc
//
export interface IMatiereDoc extends ISigleNamedDoc {
  uniteid: string;
  unitename: string;
  modname: string;
  coefficient: number;
  ecs: number;
  tag:string;
} // interface IMatiereDoc
export interface IBaseAffectationDoc extends IBaseDoc {
  anneeid: string;
  anneename: string;
  semestreid: string;
  semestrename: string;
  groupeid: string;
  groupename: string;
} //  interface IBaseAffectationDoc
export interface IItemIntervalDoc extends IBaseAffectationDoc {
  startdate: string;
  enddate: string;
  displaystartdate: string;
  displayenddate: string;
} // interface IItemIntervalDoc
// tslint:disable-next-line:no-empty-interface
export interface IAffectationDoc extends IItemIntervalDoc {} // interface IAffectationDoc
export interface IEtudAffectationDoc extends IItemIntervalDoc {
  affectationid: string;
  etudiantid: string;
  fullname: string;
  url: string;
  etudiantStatus: string;
} // interface IEtudAffectationDoc
export interface IEtudiantDoc extends IBaseDoc {
  ident:string;
  lastname: string;
  firstname: string;
  email: string;
  avatar: string;
  status: string;
  sexe:string;
  redoublant:string;
  sup:string;
  url: string;
  fullname: string;
  data:any;
  notes: INoteDoc[];
  evts: IEvtDoc[];
  affectations: IEtudAffectationDoc[];
} // interface IEtudiantDoc
export interface IItemMatiereAffectationDoc extends IBaseAffectationDoc {
  ownerid: string;
  affectationid: string;
  uniteid: string;
  unitename: string;
  matiereid: string;
  matierename: string;
} // interface IItemMatiereAffectation
export interface IControleDoc extends IItemMatiereAffectationDoc {
  date: string;
  displaydate: string;
  name: string;
  duration: string;
  place: string;
  coefficient: number;
  notes: INoteDoc[];
  evts: IEvtDoc[];
} // interface IControleDoc
export interface IControleAffectationDoc extends IItemMatiereAffectationDoc {
  controleid: string;
  controlename: string;
  date: string;
  displaydate: string;
  etudaffectationid: string;
  etudiantid: string;
  fullname: string;
  url: string;
} // interface IItemControleAffectation
export interface IEvtDoc extends IControleAffectationDoc {
  genre: number;
  genrestring: string;
  duration: string;
  justifie:boolean;
} // interface IEvtDoc
export interface INoteDoc extends IControleAffectationDoc {
  value: number | null;
  coefficient: number;
} // interface INoteDoc
export interface IImportEtudiant {
  ident?:string;
  lastname?: string;
  firstname?: string;
  email?: string;
  observations?: string;
} // interface IImportEtudiant
export interface IOption {
  id: string;
  text: string;
  url?: string;
} // interface IOption
//
export interface IMatiereDesc {
  id:string;
  name:string;
  unite:string;
  coefficient:number;
  count:number;
  total:number;
  value: number | null;
  notes:INoteDoc[];
  evts:IEvtDoc[];
}// interface IMatiereDesc
//
export interface IEtudiantDesc {
  etudiantid:string;
  ident:string;
  lastname:string;
  firstname:string;
  groupesigle:string;
  url:string;
  descs:Map<string,IMatiereDesc> | null;
  data:any;
}// interface IEtudiantDesc
export interface IExportEtudiantDesc {
  ident:string;
  groupe:string;
  lastname:string;
  firstname:string;
  note: number | null;
}// interface IExportEtudiantDesc
////////////////////////////////////////////
