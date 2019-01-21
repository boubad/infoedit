import {
  GetAffectation,
  GetAnnee,
  GetControle,
  GetEtudAffectation,
  GetEtudiant,
  GetEvt,
  GetGroupe,
  GetMatiere,
  GetNote,
  GetSemestre,
  GetUnite
} from "../data/DataProcs";
import {
  IAffectationDoc,
  IAnneeDoc,
  IEtudAffectationDoc,
  IGroupeDoc,
  IMatiereDoc,
  ISemestreDoc,
  IUniteDoc
} from "../data/DomainData";
import {
  IAppData,
  IAppState,
  IAppStatus,
  IBaseState,
  IControleState,
  IDetailState,
  IEtudiantState,
  IInfoState,
  IOutilsState,
  IStatState
} from "./InfoState";
///////////////////////////////////
export function GetInitialAppData(): IAppData {
  return {
    dataServerUrl: "http://services.diarra.ovh:5984",
    databaseName: "gteinfo"
  };
} // GetInitialAppData
export function GetInitialAppStatus(): IAppStatus {
  return {
    busy:false,
    error: "",
    status: ""
  };
} // GetInitialAppStatus
export function GetInitialAppState(): IAppState {
  return {
    anneeid: "",
    anneesOptions: [],
    busy: false,
    groupeid: "",
    groupesOptions: [],
    matiereid: "",
    matieresOptions: [],
    semestreid: "",
    semestresOptions: [],
    uniteid: "",
    unitesOptions: [],
    // tslint:disable-next-line:object-literal-sort-keys
    anneeStartDate: "",
    anneeEndDate: "",
    semestreStartDate: "",
    semestreEndDate: "",
    affectationid: "",
    affectations: [],
    ownerid: ""
  };
} // getInitialAppState
export function GetInitialAnneeState(): IBaseState<IAnneeDoc> {
  return {
    addMode: false,
    busy: false,
    displayPages: 5,
    // tslint:disable-next-line:object-literal-sort-keys
    current: GetAnnee(),
    currentPage: 0,
    itemsCount: 0,
    pagesCount: 0,
    pageData: [],
    pageSize: 20,
    previousId: ""
  };
} // GetInitialAnneeState
export function GetInitialAffectationState(): IBaseState<IAffectationDoc> {
  return {
    addMode: false,
    busy: false,
    displayPages: 5,
    // tslint:disable-next-line:object-literal-sort-keys
    current: GetAffectation(),
    currentPage: 0,
    itemsCount: 0,
    pagesCount: 0,
    pageData: [],
    pageSize: 20,
    previousId: ""
  };
} // GetInitialAffectationState
export function GetInitialEtudAffectationState(): IBaseState<
  IEtudAffectationDoc
> {
  return {
    addMode: false,
    busy: false,
    displayPages: 5,
    // tslint:disable-next-line:object-literal-sort-keys
    current: GetEtudAffectation(),
    currentPage: 0,
    itemsCount: 0,
    pagesCount: 0,
    pageData: [],
    pageSize: 20,
    previousId: ""
  };
} // GetInitialEtudAffectationState
export function GetInitialEtudiantState(): IEtudiantState {
  return {
    addMode: false,
    busy: false,
    displayPages: 5,
    // tslint:disable-next-line:object-literal-sort-keys
    current: GetEtudiant(),
    currentPage: 0,
    itemsCount: 0,
    pagesCount: 0,
    pageData: [],
    pageSize: 8,
    previousId: "",
    evt: GetEvt(),
    note: GetNote(),
    etudiantStatus: ""
  };
} // GetInitialEtudiantState
export function GetInitialControleState(): IControleState {
  return {
    addMode: false,
    busy: false,
    displayPages: 5,
    // tslint:disable-next-line:object-literal-sort-keys
    current: GetControle(),
    currentPage: 0,
    itemsCount: 0,
    pagesCount: 0,
    pageData: [],
    pageSize: 20,
    previousId: "",
    evt: GetEvt(),
    evtAddMode: false,
    note: GetNote(),
    etudiantsOptions: [],
    etudAffectations: []
  };
} // GetControleInitialState
export function GetInitialMatiereState(): IBaseState<IMatiereDoc> {
  return {
    addMode: false,
    busy: false,
    displayPages: 5,
    // tslint:disable-next-line:object-literal-sort-keys
    current: GetMatiere(),
    currentPage: 0,
    itemsCount: 0,
    pagesCount: 0,
    pageData: [],
    pageSize: 20,
    previousId: ""
  };
} // GetInitialMatiereState
export function GetInitialGroupeState(): IBaseState<IGroupeDoc> {
  return {
    addMode: false,
    busy: false,
    displayPages: 5,
    // tslint:disable-next-line:object-literal-sort-keys
    current: GetGroupe(),
    currentPage: 0,
    itemsCount: 0,
    pagesCount: 0,
    pageData: [],
    pageSize: 20,
    previousId: ""
  };
} // GetInitialGroupeState
export function GetInitialUniteState(): IBaseState<IUniteDoc> {
  return {
    addMode: false,
    busy: false,
    displayPages: 5,
    // tslint:disable-next-line:object-literal-sort-keys
    current: GetUnite(),
    currentPage: 0,
    itemsCount: 0,
    pagesCount: 0,
    pageData: [],
    pageSize: 20,
    previousId: ""
  };
} //  GetInitialUniteState
export function GetInitialSemestreState(): IBaseState<ISemestreDoc> {
  return {
    addMode: false,
    busy: false,
    displayPages: 5,
    // tslint:disable-next-line:object-literal-sort-keys
    current: GetSemestre(),
    currentPage: 0,
    itemsCount: 0,
    pagesCount: 0,
    pageData: [],
    pageSize: 20,
    previousId: ""
  };
} // GetInitialSemestreState
export function GetInitialOutilsState(): IOutilsState {
  return {
    freeEtudiantsOpts: [],
    // tslint:disable-next-line:object-literal-sort-keys
    busy: false,
    etudAffectations: [],
    importedEtudiants: []
  };
} // GetInitialOutilsState
export function GetInitialDetailState(): IDetailState {
  return ({
    busy:false,
    ficheControle: GetControle(),
    ficheEtudiant: GetEtudiant()
  });
}
//
export function GetInitialStatState(): IStatState {
  return ({
    busy:false,
    matiereStats: []
  });
}
//
export  const initialState: IInfoState = {
  appdata: GetInitialAppData(),
  appstatus: GetInitialAppStatus(),
  // tslint:disable-next-line:object-literal-sort-keys
  appstate: GetInitialAppState(),
  etudiants: GetInitialEtudiantState(),
  // tslint:disable-next-line:object-literal-sort-keys
  controles: GetInitialControleState(),
  matieres: GetInitialMatiereState(),
  annees: GetInitialAnneeState(),
  groupes: GetInitialGroupeState(),
  unites: GetInitialUniteState(),
  semestres: GetInitialSemestreState(),
  affectations: GetInitialAffectationState(),
  etudaffectations: GetInitialEtudAffectationState(),
  outils: GetInitialOutilsState(),
  details: GetInitialDetailState(),
  stats: GetInitialStatState()
}; // initialDataModel
//
