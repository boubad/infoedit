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
import { IInfoState } from "./InfoState";

//
export const initialState: IInfoState = {
  appdata: {
    dataServerUrl: "http://services.diarra.ovh:5984",
    databaseName: "gteinfo"
  },
  appstatus: {
    error: "",
    status: ""
  },
  // tslint:disable-next-line:object-literal-sort-keys
  appstate: {
    anneeid: "",
    anneesOptions: [],
    busy:false,
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
    affectationid:'',
    affectations:[],
    ownerid:''
  },
  etudiants: {
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
  },
  // tslint:disable-next-line:object-literal-sort-keys
  controles: {
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
    etudiantsOptions:[],
    etudAffectations: [],
  },
  matieres: {
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
    previousId: "",
  },
  annees: {
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
    previousId: "",
  },
  groupes: {
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
    previousId: "",
  },
  unites: {
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
    previousId: "",
  },
  semestres: {
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
    previousId: "",
  },
  affectations: {
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
    previousId: "",
  },
  etudaffectations: {
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
    previousId: "",
  },
  outils: {
    freeEtudiantsOpts: [],
    // tslint:disable-next-line:object-literal-sort-keys
    busy: false,
    etudAffectations:[],
    importedEtudiants: [],
    
  }
}; // initialDataModel
//
