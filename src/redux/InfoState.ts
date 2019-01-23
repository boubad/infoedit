import {
  IAffectationDoc,
  IAnneeDoc,
  IControleDoc,
  IEtudAffectationDoc,
  IEtudiantDesc,
  IEtudiantDoc,
  IEvtDoc,
  IGroupeDoc,
  IMatiereDoc,
  INoteDoc,
  IOption,
  ISemestreDoc,
  IUniteDoc
} from "../data/DomainData";

//
export interface IAppData {
  readonly dataServerUrl: string;
  readonly databaseName: string;
} // interface IAppData
export interface IAppStatus {
  readonly busy:boolean;
  readonly error: string;
  readonly status: string;
} // interface IAppStatus
export interface IAppState {
  readonly busy:boolean;
  readonly semestreid: string;
  readonly groupeid: string;
  readonly matiereid: string;
  readonly anneeid: string;
  readonly uniteid: string;
  readonly matiereSigle:string;
  readonly matieresOptions: IOption[];
  readonly anneesOptions: IOption[];
  readonly groupesOptions: IOption[];
  readonly semestresOptions: IOption[];
  readonly unitesOptions: IOption[];
  readonly anneeStartDate: string;
  readonly anneeEndDate: string;
  readonly semestreStartDate: string;
  readonly semestreEndDate: string;
  readonly affectations: IAffectationDoc[];
  readonly affectationid: string;
  readonly ownerid:string;
} // interface IAppState
export interface IBaseState<T> {
  readonly busy: boolean;
  readonly addMode: boolean;
  readonly displayPages: number;
  readonly current: T;
  readonly currentPage: number;
  readonly itemsCount: number;
  readonly pagesCount: number;
  readonly pageData: T[];
  readonly pageSize: number;
  readonly previousId: string;
} // interface IBaseState<T>
export interface IBaseDetailState<T> extends IBaseState<T> {
  readonly evt: IEvtDoc;
  readonly note: INoteDoc;
} // interface IBaseDetailState<T>
export interface IEtudiantState extends IBaseDetailState<IEtudiantDoc> {
  readonly etudiantStatus: string;
}
export interface IControleState extends IBaseDetailState<IControleDoc> {
  readonly evtAddMode: boolean;
  readonly etudiantsOptions: IOption[];
  readonly etudAffectations: IEtudAffectationDoc[];
}
export interface IOutilsState {
  readonly busy: boolean;
  readonly importedEtudiants: IEtudiantDoc[];
  readonly freeEtudiantsOpts: IOption[];
  readonly etudAffectations: IEtudAffectationDoc[];
 
} // interface IOutilsState
export interface IDetailState {
  busy:boolean;
  ficheEtudiant:IEtudiantDoc;
  ficheControle:IControleDoc;
}// interface IDetailState
export interface  IStatState {
  busy:boolean;
  matiereStats: IEtudiantDesc[];
};
export interface IInfoState {
  readonly appstatus: IAppStatus;
  readonly appdata: IAppData;
  readonly appstate: IAppState;
  readonly etudiants: IEtudiantState;
  readonly controles: IControleState;
  readonly matieres: IBaseState<IMatiereDoc>;
  readonly annees: IBaseState<IAnneeDoc>;
  readonly groupes: IBaseState<IGroupeDoc>;
  readonly unites: IBaseState<IUniteDoc>;
  readonly semestres: IBaseState<ISemestreDoc>;
  readonly affectations: IBaseState<IAffectationDoc>;
  readonly etudaffectations: IBaseState<IEtudAffectationDoc>;
  readonly outils: IOutilsState;
  readonly details: IDetailState;
  readonly stats: IStatState;
} // interface IInfoState
//