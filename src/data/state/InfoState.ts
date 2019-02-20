import { IAffectationDoc, IAnneeDoc, IControleDoc, IDataVarDoc, IEtudAffectationDoc, IEtudiantDesc, IEtudiantDoc, IEvtDoc, IGroupeDoc, IMatiereDoc, INoteDoc, IOption, ISemestreDoc, IUniteDoc } from '../domain/DomainData';

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
  readonly stringData:string[];
 
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
  readonly datavars: IBaseState<IDataVarDoc>;
} // interface IInfoState
//