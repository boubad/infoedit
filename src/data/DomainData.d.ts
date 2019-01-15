export interface IAttachedDoc {
  docid: string;
  name: string;
  mime: string;
  isAvatar: boolean;
  url: string;
} // interface IAttachedDoc
export interface IBaseDoc {
  id: string;
  rev: string;
  ownerid:string;
  observations: string;
  modified: boolean;
  loaded: boolean;
  attachments: IAttachedDoc[];
} // interface IBaseDoc
export interface ISigleNamedDoc extends IBaseDoc {
  sigle: string;
  name: string;
}
export interface ISemestreDoc extends ISigleNamedDoc {
  dummy?: any;
} // interface IUniteDoc
export interface IUniteDoc extends ISigleNamedDoc {
  dummy?: any;
} // interface IUniteDoc
export interface IGroupeDoc extends ISigleNamedDoc {
  dummy?: any;
} // interface IGroupeDoc
export interface IAnneeDoc extends ISigleNamedDoc {
  startdate: string;
  enddate: string;
} // interface IMatiereDoc
//
export interface IMatiereDoc extends IBaseDoc {
  sigle: string;
  name: string;
  uniteid: string;
  modname: string;
  coefficient: number;
  ecs: number;
  unitename:string;
} // interface IMatiereDoc
export interface IWorkDoc extends IBaseDoc {
  controleid: string;
  etudiantid: string;
  displaydate: string;
  controlename: string;
  fullname: string;
  url: string;
  date: string;
  matierename: string;
  semestrename: string;
  anneename: string;
  groupename: string;
  uniteid: string;
  matiereid: string;
  anneeid: string;
  semestreid: string;
  groupeid: string;
  affectationid:string;
  etudaffectationid:string;
} // interface IWorkDoc
export interface IEvtDoc extends IWorkDoc {
  genre: number;
  genrestring: string;
  duration: string;
} // interface IEvtDoc
export interface INoteDoc extends IWorkDoc {
  value: number | null;
  coefficient: number;
} // interface INoteDoc
export interface IEtudiantDoc extends IBaseDoc {
  lastname: string;
  firstname: string;
  email: string;
  avatar: string;
  status: string;
  url: string;
  fullname: string;
  notes: INoteDoc[];
  evts: IEvtDoc[];
  affectations: IEtudAffectationDoc[];
} // interface IEtudiantDoc
export interface IAffectationDoc extends IBaseDoc {
  anneeid: string;
  semestreid: string;
  groupeid: string;
  semestrename: string;
  anneename: string;
  groupename: string;
  startdate:string;
  enddate:string;
} // interface IEtudAffectation
export interface IEtudAffectationDoc extends IBaseDoc {
  affectationid: string;
  etudiantid: string;
  startdate: string;
  enddate: string;
  semestrename: string;
  anneename: string;
  groupename: string;
  fullname: string;
  url: string;
  anneeid: string;
  semestreid: string;
  groupeid: string;
  etudiantStatus: string;
}
export interface IControleDoc extends IBaseDoc {
  affectationid: string;
  matiereid: string;
  date: string;
  displaydate: string;
  name: string;
  duration: string;
  place: string;
  coefficient: number;
  notes: INoteDoc[];
  evts: IEvtDoc[];
  matierename: string;
  semestrename: string;
  anneename: string;
  groupename: string;
  uniteid: string;
  anneeid: string;
  semestreid: string;
  groupeid: string;
} // interface IControleDoc
export interface IImportEtudiant {
  lastname?: string;
  firstname?: string;
  email?: string;
  observations?: string;
} // interface IImportEtudiant
export interface IOption {
  id: string;
  text: string;
  url?: string;
} // interface IpOtion
////////////////////////////////////////////
