//
export interface IItemDataVar {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  sigle?: string;
  name?: string;
  modalkeys?: string[];
  modelvalues?: number[];
  vartype?: string;
} // interface IItemDataVar
export interface IItemAnnee {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  sigle?: string;
  name?: string;
  startdate?: string;
  enddate?: string;
} // interface IItemAnnee
//
export interface IItemGroupe {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  sigle?: string;
  name?: string;
} // interface IItemGroupe
//
export interface IItemUnite {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  sigle?: string;
  name?: string;
} // interface IItemUnite
//
export interface IItemSemestre {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  sigle?: string;
  name?: string;
} // interface IItemUnite
//
export interface IItemMatiere {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  sigle?: string;
  name?: string;
  uniteid?: string;
  modname?: string;
  coefficient?: number;
  ecs?: number;
} // interface IItemMatiere
//
export interface IItemEtudiant {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  lastname?: string;
  firstname?: string;
  email?: string;
  avatar?: string;
  status?: string;
  ident?: string;
  data?: string;
  sexe?:string;
  redoublant?:string;
  sup?:string;
} // interface IItemEtudiant
export interface IItemAffectation {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  anneeid?: string;
  semestreid?: string;
  groupeid?: string;
  startdate?: string;
  enddate?: string;
} // IItemAffectation
export interface IItemEtudAffectation {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  anneeid?: string;
  semestreid?: string;
  groupeid?: string;
  startdate?: string;
  enddate?: string;
  affectationid?: string;
  etudiantid?: string;
} // interface  IItemEtudAffectation

export interface IItemControle {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  anneeid?: string;
  semestreid?: string;
  groupeid?: string;
  affectationid?: string;
  uniteid?: string;
  matiereid?: string;
  date?: string;
  place?: string;
  duration?: string;
  coefficient?: number;
  name?: string;
} // interface IInfoControle

export interface IItemEvt {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  anneeid?: string;
  semestreid?: string;
  groupeid?: string;
  affectationid?: string;
  uniteid?: string;
  matiereid?: string;
  controleid?: string;
  etudaffectationid?: string;
  etudiantid?: string;
  evttype?: number;
  duration?: string;
  justifie?:boolean;
} // interface IItemEvt
export interface IItemNote {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  type?: string;
  ownerid?: string;
  observations?: string;
  anneeid?: string;
  semestreid?: string;
  groupeid?: string;
  affectationid?: string;
  uniteid?: string;
  matiereid?: string;
  controleid?: string;
  etudaffectationid?: string;
  etudiantid?: string;
  value?: number | null;
} // interface IItemNote
export interface IItemAttInfo {
  content_type?: string;
  data?: string;
  digest?: string;
  encoded_length?: number;
  encoding?: string;
  length?: number;
  revpos?: number;
  stub?: boolean;
} // interface IItemAttInfo
export interface IItemStat {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
  etudiantid?:string;
  type?: string;
  data?: any;
}// interface IItemStat
///////////////////////////
// eof: IInfoDomain.d.ts
