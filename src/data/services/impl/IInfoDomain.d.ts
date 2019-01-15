export interface IItemDoc {
  _id: string;
  _rev: string;
  _deleted:boolean;
} // interface IInfoDoc
//
export interface IItemAnnee  {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  startdate?: string;
  enddate?: string;
  sigle?:string;
  name?: string;
} // interface IItemAnnee
//
export interface IItemGroupe {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  sigle?:string;
  name?: string;
} // interface IItemGroupe
//
export interface IItemUnite  {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  sigle?:string;
  name?: string;
} // interface IItemUnite
//
export interface IItemSemestre {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  sigle?:string;
  name?: string;
} // interface IItemUnite
//
export interface IItemMatiere  {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  sigle?:string;
  name?: string;
  uniteid?: string;
  modname?: string;
  coefficient?: number;
  ecs?: number;
} // interface IInfoDoc
//
export interface IItemEtudiant {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  lastname?: string;
  firstname?: string;
  email?: string;
  avatar?: string;
  status?:string;
}
export interface IItemAffectation {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  anneeid?:string;
  semestreid?:string;
  groupeid?:string; 
  startdate?:string;
  enddate?:string;
}// interface IEtudAffectation
export interface IItemEtudAffectation {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  affectationid?:string;
  etudiantid?:string;
  startdate?:string;
  enddate?:string;
  anneeid?:string;
  semestreid?:string;
  groupeid?:string; 
}
export interface IItemControle  {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  affectationid?:string;
  matiereid?:string;
  date?: string;
  place?: string;
  duration?: string;
  coefficient?: number;
  name?: string;
  uniteid?:string;
  semestreid?:string;
  anneeid?:string;
  groupeid?:string;
} // interface IInfoControle
export interface IItemEvt  {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  controleid?:string;
  etudiantid?:string;
  evttype?: number;
  duration?: string;
  uniteid?:string;
  matiereid?:string;
  anneeid?:string;
  groupeid?:string;
  semestreid?:string;
  affectationid?:string;
  etudaffectationid?:string;
}
export interface IItemNote {
  _id?: string;
  _rev?: string;
  _attachments?: any;
  type?: string;
  ownerid?:string;
  observations?: string;
  controleid?:string;
  etudiantid?:string;
  value?: number;
  uniteid?:string;
  matiereid?:string;
  anneeid?:string;
  groupeid?:string;
  semestreid?:string;
  affectationid?:string;
  etudaffectationid?:string;
}
interface IAttInfo {
  content_type?: string;
  data?: string;
  digest?: string;
  encoded_length?: number;
  encoding?: string;
  length?: number;
  revpos?: number;
  stub?: boolean;
}

