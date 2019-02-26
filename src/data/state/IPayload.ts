import { FluxStandardAction } from "flux-standard-action";
import { Dispatch } from "redux";
import { IAffectationDoc, IAnneeDoc, IControleDoc, IDataVarDoc, IEtudAffectationDoc, IEtudiantDesc, IEtudiantDoc, IEvtDoc, IGroupeDoc, IInfoUserDoc, IMatiereDoc, INoteDoc, IOption, ISemestreDoc, IUniteDoc } from '../domain/DomainData';

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
  matiereSigle?:string;
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
  //
  etudiantDescs?: IEtudiantDesc[];
  dataLabel?:string;
  dataValue?:any;
  dataVarsOptions?:IOption[];
  //
  dataVarsCount?:number;
  dataVar?:IDataVarDoc;
  dataVars?:IDataVarDoc[];
  datavarid?:string;
  //
  stringData?:string[];
  //
  usersCount?:number;
  user?:IInfoUserDoc;
  users?:IInfoUserDoc[];
  userid?:string;
  //
} // interface IPayload
////////////////////////////////
export type InfoAction = FluxStandardAction<IPayload>;
export type InfoDispatch = Dispatch<FluxStandardAction<IPayload>>;
////////////////////
