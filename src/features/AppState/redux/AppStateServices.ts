import { GetMatiere } from '../../../data/DataProcs';
import { BaseServices } from "../../../redux/BaseServices";
import { IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";
import {
  GetInitialAffectation,
  GetInitialAnnee,
  GetInitialControle,
  GetInitialEtudAffectation,
  GetInitialGroupe,
  GetInitialMatiere,
  GetInitialSemestre,
  GetInitialUnite
} from "../../../redux/StateProcs";
//

//
export class AppStateServices {
    //
    public static async changeMatiereAsync(
        state: IInfoState,
        matiereid: string
      ): Promise<IPayload> {
        const pRet: IPayload = {
          controle: GetInitialControle(state),
          controles: [],
          controlesCount: 0,
          etudiantDescs:[],
          matiere: GetInitialMatiere(state),
          matiereid: "",
          // tslint:disable-next-line:object-literal-sort-keys
          matiereSigle:"",
        };
        if (matiereid.length < 1) {
          return pRet;
        }
        const pMan = BaseServices.getPersistManager(state);  
        const mat = state.matieres.pageData.find((x)=>{
          return (x.id === matiereid);
        });  
        if (mat !== undefined){
          pRet.matiere = Object.assign({},mat);
        } else {
          pRet.matiere = await pMan.fetchMatiereByIdAsync(matiereid);
        }  
        const pMat = (pRet.matiere) ? pRet.matiere : GetMatiere();
        pRet.matiereSigle = pMat.sigle;
        pRet.matiereid = matiereid;
        const semestreid = state.appstate.semestreid;
        const anneeid = state.appstate.anneeid;
        const groupeid = state.appstate.groupeid;
        if (anneeid.length < 1 || semestreid.length < 1 || groupeid.length < 1) {
          return pRet;
        }
        const count3 = await pMan.getControlesCountAsync(
          anneeid,
          semestreid,
          groupeid,
          matiereid
        );
        pRet.controlesCount = count3;
        pRet.controles = await pMan.getControlesAsync(
          anneeid,
          semestreid,
          groupeid,
          matiereid,
          0,
          count3
        );
        pRet.etudiantDescs = await pMan.getAnneeSemestreMatiereStats(
          anneeid,
          semestreid,
          matiereid
        );
        return pRet;
      } // ChangeMatiereAsync
    //
  public static async changeUniteAsync(
    state: IInfoState,
    uniteid: string
  ): Promise<IPayload> {
    const pRet: IPayload = {
      controle: GetInitialControle(state),
      controles: [],
      controlesCount: 0,
      etudiantDescs:[],
      matiereid:'',
      matieresCount:0,
      // tslint:disable-next-line:object-literal-sort-keys
      matiereSigle:'',
      // tslint:disable-next-line:object-literal-sort-keys
      matieres:[],
      matieresOptions:[],
      unite: GetInitialUnite(state),
      uniteid: "",
    };
    if (uniteid.length < 1) {
      return pRet;
    }
    pRet.uniteid = uniteid;
    const pMan = BaseServices.getPersistManager(state);
    const un = state.unites.pageData.find((x)=>{
          return (x.id === uniteid);
        });  
        if (un !== undefined){
          pRet.unite = Object.assign({},un);
        } else {
          pRet.unite = await pMan.fetchUniteByIdAsync(uniteid);
        }    
    pRet.matieresCount = await pMan.getMatieresCountAsync(uniteid);
    pRet.matieres = await pMan.getMatieresAsync(uniteid,0,state.matieres.pageSize);
    pRet.matieresOptions = await pMan.getMatieresOptionsAsync(uniteid);
    return pRet;
  } // ChangeUniteAsync
  //
  public static async changeGroupeAsync(
    state: IInfoState,
    groupeid: string
  ): Promise<IPayload> {
    const pRet: IPayload = {
      controle: GetInitialControle(state),
      controles: [],
      controlesCount: 0,
      etudAffectation:GetInitialEtudAffectation(state),
      etudAffectations: [],
      etudAffectationsCount: 0,
      etudiantsOptions:[],
      groupe: GetInitialGroupe(state),
      groupeid: ""
    };
    if (groupeid.length < 1) {
      return pRet;
    }
    pRet.groupeid = groupeid;
    const pMan = BaseServices.getPersistManager(state);  
     const grp = state.groupes.pageData.find((x)=>{
          return (x.id === groupeid);
        });  
        if (grp !== undefined){
          pRet.groupe = Object.assign({},grp);
        } else {
          pRet.groupe = await pMan.fetchGroupeByIdAsync(groupeid);
        }     
    const semestreid = state.appstate.semestreid;
    const anneeid = state.appstate.anneeid;
    if (anneeid.length < 1 || semestreid.length < 1) {
      return pRet;
    }
    pRet.etudAffectationsCount = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    pRet.etudAffectations = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,state.etudaffectations.pageSize);  
    pRet.etudiantsOptions  = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(
      anneeid,
      semestreid,
      groupeid
    );
    const matiereid = state.appstate.matiereid;
    if (matiereid.length < 1) {
      return pRet;
    }
   pRet.controlesCount = await pMan.getControlesCountAsync(
      anneeid,
      semestreid,
      groupeid,
      matiereid
    );
   pRet.controles = await pMan.getControlesAsync(
      anneeid,
      semestreid,
      groupeid,
      matiereid,
      0,
      state.controles.pageSize
    );
    return pRet;
  } // ChangeGroupeAsync
  //
  public static async changeSemestreAsync(
    state: IInfoState,
    semestreid: string
  ): Promise<IPayload> {
    const pRet: IPayload = {
      affectation: GetInitialAffectation(state),
      affectations: [],
      affectationsCount: 0,
      controle: GetInitialControle(state),
      controles: [],
      controlesCount: 0,
      etudAffectation:GetInitialEtudAffectation(state),
      etudAffectations: [],
      etudAffectationsCount: 0,
      etudiantDescs:[],
      etudiantsOptions:[],
      semestre: GetInitialSemestre(state),
      semestreid: "",
    };
    if (semestreid.length < 1) {
      return pRet;
    }
    pRet.semestreid = semestreid;
     const pMan = BaseServices.getPersistManager(state);  
     const sem = state.semestres.pageData.find((x)=>{
          return (x.id === semestreid);
        });  
        if (sem !== undefined){
          pRet.semestre = Object.assign({},sem);
        } else {
          pRet.semestre = await pMan.fetchSemestreByIdAsync(semestreid);
        }       
    const anneeid = state.appstate.anneeid;
    if (anneeid.length < 1) {
      return pRet;
    }
    const n = await pMan.getAffectationsCountAsync(anneeid, semestreid);  
    pRet.affectationsCount = n;
    const affs = await pMan.getAffectationsAsync(anneeid, semestreid, 0, n);
    const startDate = state.appstate.anneeStartDate;
    const endDate = state.appstate.anneeEndDate;
    const nx = affs.length;
    for (let i = 0; i < nx; i++){
      const x = affs[i];
      if (x.startdate.length < 1){
         x.startdate = startDate;
      }
      if (x.enddate.length < 1){
        x.enddate = endDate;
      }
    }// i
    pRet.affectations = affs;
    const matiereid = state.appstate.matiereid;
    pRet.etudiantDescs =  await pMan.getAnneeSemestreMatiereStats(
      anneeid,
      matiereid,
      semestreid,
    );
    const groupeid = state.appstate.groupeid;
    
    if (groupeid.length < 1) {
      return pRet;
    }
   pRet.etudAffectationsCount = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    pRet.etudAffectations = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,state.etudaffectations.pageSize);  
    pRet.etudiantsOptions  = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(
      anneeid,
      semestreid,
      groupeid
    );
    if (matiereid.length < 1) {
      return pRet;
    }
   pRet.controlesCount = await pMan.getControlesCountAsync(
      anneeid,
      semestreid,
      groupeid,
      matiereid
    );
   pRet.controles = await pMan.getControlesAsync(
      anneeid,
      semestreid,
      groupeid,
      matiereid,
      0,
      state.controles.pageSize
    );
    return pRet;
  } // ChangeSemestreAsync
  //
  public static async changeAnneeAsync(
    state: IInfoState,
    anneeid: string
  ): Promise<IPayload> {
    const pRet: IPayload = {
      affectation: GetInitialAffectation(state),
      affectations: [],
      affectationsCount: 0,
      annee: GetInitialAnnee(state),
      anneeEndDate:'',
      anneeid: "",
      // tslint:disable-next-line:object-literal-sort-keys
      anneeStartDate:'',
      controle: GetInitialControle(state),
      controles: [],
      controlesCount: 0,
      etudAffectation:GetInitialEtudAffectation(state),
      etudAffectations: [],
      etudAffectationsCount: 0,
      etudiantDescs:[],
      etudiantsOptions:[],
    };
    if (anneeid.length < 1) {
      return pRet;
    }
    pRet.anneeid = anneeid;
    const pMan = BaseServices.getPersistManager(state);  
    let an = state.annees.pageData.find((x)=>{
          return (x.id === anneeid);
        });  
        if (an === undefined){
          an = await pMan.fetchAnneeByIdAsync(anneeid);
        }     
    pRet.annee = an; 
    pRet.anneeStartDate = an.startdate;
    pRet.anneeEndDate = an.enddate;
    const semestreid = state.appstate.semestreid;
    if (semestreid.length < 1) {
      return pRet;
    }
    const n = await pMan.getAffectationsCountAsync(anneeid, semestreid);  
    pRet.affectationsCount = n;
    const affs = await pMan.getAffectationsAsync(anneeid, semestreid, 0, n);
    const startDate = state.appstate.anneeStartDate;
    const endDate = state.appstate.anneeEndDate;
    const nx = affs.length;
    for (let i = 0; i < nx; i++){
      const x = affs[i];
      if (x.startdate.length < 1){
         x.startdate = startDate;
      }
      if (x.enddate.length < 1){
        x.enddate = endDate;
      }
    }// i
    pRet.affectations = affs;
    const groupeid = state.appstate.groupeid;
    if (groupeid.length < 1) {
      return pRet;
    }
    const cur = affs.find((x) =>{
      return (x.id === groupeid);
    });  
    if (cur !== undefined){
      pRet.semestreStartDate = cur.startdate;
      pRet.semestreEndDate = cur.enddate;
    }  
    pRet.etudAffectationsCount = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    pRet.etudAffectations = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,state.etudaffectations.pageSize);  
    pRet.etudiantsOptions  = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(
      anneeid,
      semestreid,
      groupeid
    );
    const matiereid = state.appstate.matiereid;
    pRet.etudiantDescs =  await pMan.getAnneeSemestreMatiereStats(
      anneeid,
      matiereid,
      semestreid,
    );
    if (matiereid.length < 1) {
      return pRet;
    }
   pRet.controlesCount = await pMan.getControlesCountAsync(
      anneeid,
      semestreid,
      groupeid,
      matiereid
    );
   pRet.controles = await pMan.getControlesAsync(
      anneeid,
      semestreid,
      groupeid,
      matiereid,
      0,
      state.controles.pageSize
    );
    return pRet;
  } // ChangeAnneeAsync
  ////////////////////////////////////////////
  public static async refreshAllAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const pRet: IPayload = {
      };
    pRet.anneesOptions= await pMan.getAnneesOptionsAsync();
    pRet.semestresOptions = await pMan.getSemestresOptionsAsync();
    pRet.groupesOptions = await pMan.getGroupesOptionsAsync();
    pRet.unitesOptions = await pMan.getUnitesOptionsAsync();
    return pRet;
  } // RefreshGlobalOptions
} // class EtudiantServices
