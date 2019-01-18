import { FluxStandardAction } from "flux-standard-action";
import { Dispatch } from "redux";
//
import {
  IAffectationDoc,
  IAnneeDoc,
  IControleDoc,
  IEtudAffectationDoc,
  IEtudiantDoc,
  IEvtDoc,
  IGroupeDoc,
  IMatiereDoc,
  INoteDoc,
  IOption,
  ISemestreDoc,
  IUniteDoc
} from "../data/DomainData";

export interface IPayload {
  semestreid?: string;
  semestre?: ISemestreDoc;
  semestresOptions?: IOption[];
  semestres?: ISemestreDoc[];
  semestresCount?: number;
  groupeid?: string;
  groupesOptions?: IOption[];
  uniteid?: string;
  unitesOptions?: IOption[];
  page?: number;
  id?: string;
  field?: string;
  value?: any;
  matieres?: IMatiereDoc[];
  matiereid?: string;
  matiere?: IMatiereDoc;
  etudiants?: IEtudiantDoc[];
  etudiantsOptions?: IOption[];
  anneesOptions?: IOption[];
  matieresOptions?: IOption[];
  controles?: IControleDoc[];
  etudiant?: IEtudiantDoc;
  etudiantid?: string;
  controlesOptions?: IOption[];
  controle?: IControleDoc;
  controleid?: string;
  note?: INoteDoc;
  evt?: IEvtDoc;
  error?: string;
  status?: string;
  anneesCount?: number;
  matieresCount?: number;
  etudiantsCount?: number;
  controlesCount?: number;
  etudiantEvts?: IEvtDoc[];
  controleEvts?: IEvtDoc[];
  controleNotes?: INoteDoc[];
  etudiantNotes?: INoteDoc[];
  annee?: IAnneeDoc;
  annees?: IAnneeDoc[];
  anneeid?: string;
  groupes?: IGroupeDoc[];
  unites?: IUniteDoc[];
  groupesCount?: number;
  unitesCount?: number;
  groupe?: IGroupeDoc;
  unite?: IUniteDoc;
  importedEtudiants?: IEtudiantDoc[];
  affectations?: IAffectationDoc[];
  etudAffectations?: IEtudAffectationDoc[];
  affectationid?: string;
  //
  affectation?: IAffectationDoc;
  affectationsCount?: number;
  etudAffectation?: IEtudAffectationDoc;
  etudAffectationsCount?: number;
  totalEtudiantsCount?: number;
  etudAffectationid?: string;
  etudiantStatus?: string;
  affectationStartDate?: string;
  affectationEndDate?: string;
  anneeStartDate?: string;
  anneeEndDate?: string;
  semestreStartDate?: string;
  semestreEndDate?: string;
  freeEtudiantsOpts?:IOption[];
  ficheEtudiant?:IEtudiantDoc;
  ficheControle?:IControleDoc;
} // interface IPayload
////////////////////////////////
export type InfoAction = FluxStandardAction<IPayload>;
export type InfoDispatch = Dispatch<FluxStandardAction<IPayload>>;
////////////////////
