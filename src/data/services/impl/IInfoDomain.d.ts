export interface IItemDoc {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  _attachments?: any;
} // interface IInfoDoc
export interface IItemInfo extends IItemDoc {
  type?: string;
  ownerid?: string;
  observations?: string;
} // interface IItemInfo
export interface IItemSigleName extends IItemInfo {
  sigle?: string;
  name?: string;
} // IItemSigleName
//
export interface IItemAnnee extends IItemSigleName {
  startdate?: string;
  enddate?: string;
} // interface IItemAnnee
//
export interface IItemGroupe extends IItemSigleName {} // interface IItemGroupe
//
export interface IItemUnite extends IItemSigleName {} // interface IItemUnite
//
export interface IItemSemestre extends IItemSigleName {} // interface IItemUnite
//
export interface IItemMatiere extends IItemSigleName {
  uniteid?: string;
  modname?: string;
  coefficient?: number;
  ecs?: number;
} // interface IItemMatiere
//
export interface IItemEtudiant extends IItemInfo {
  lastname?: string;
  firstname?: string;
  email?: string;
  avatar?: string;
  status?: string;
} // interface IItemEtudiant
export interface IItemBaseAffectation extends IItemInfo {
  anneeid?: string;
  semestreid?: string;
  groupeid?: string;
} // IItemBaseAffectation
export interface IItemIntervalAffectation extends IItemBaseAffectation {
  startdate?: string;
  enddate?: string;
} // IItemIntervalAffectation
export interface IItemAffectation extends IItemIntervalAffectation {} // IItemAffectation
export interface IItemEtudAffectation extends IItemIntervalAffectation {
  affectationid?: string;
  etudiantid?: string;
} // interface  IItemEtudAffectation
export interface IItemMatiereAffectation extends IItemBaseAffectation {
  affectationid?: string;
  uniteid?: string;
  matiereid?: string;
} // interface IItemMatiereAffectation
export interface IItemControle extends IItemMatiereAffectation {
  date?: string;
  place?: string;
  duration?: string;
  coefficient?: number;
  name?: string;
} // interface IInfoControle
export interface IItemControleAffectation extends IItemMatiereAffectation {
  controleid?: string;
  etudaffectationid?: string;
  etudiantid?:string;
} // interface IItemControleAffectation
export interface IItemEvt extends IItemControleAffectation {
  evttype?: number;
  duration?: string;
} // interface IItemEvt
export interface IItemNote extends IItemControleAffectation {
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
