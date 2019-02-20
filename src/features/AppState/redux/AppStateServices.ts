import { GetMatiere } from '../../../data/domain/DataProcs';
import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';
import { GetInitialAffectation, GetInitialAnnee, GetInitialControle, GetInitialEtudAffectation, GetInitialGroupe, GetInitialMatiere, GetInitialSemestre} from '../../../data/state/stores/StateProcs';
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
        pRet.matiereid = matiereid;
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
        const semestreid = state.semestres.current.id;
        const anneeid = state.annees.current.id;
        const groupeid = state.groupes.current.id;
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
    const semestreid = state.semestres.current.id;
    const anneeid = state.annees.current.id;
    if (anneeid.length < 1 || semestreid.length < 1) {
      return pRet;
    }
    pRet.semestreid = semestreid;
    pRet.anneeid = anneeid;
    const n = await pMan.getAffectationsCountAsync(anneeid, semestreid);  
    pRet.affectationsCount = n;
    const affs = await pMan.getAffectationsAsync(anneeid, semestreid, 0, n);
    pRet.affectations = affs;
    const cur = affs.find((x) =>{
      return (x.groupeid === groupeid) && (x.semestreid === semestreid) && (x.anneeid === anneeid);
    });  
    if (cur !== undefined){
      pRet.affectation = cur;
    }  
    pRet.etudAffectationsCount = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    pRet.etudAffectations = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,state.etudaffectations.pageSize);  
    pRet.etudiantsOptions  = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(
      anneeid,
      semestreid,
      groupeid
    );
    const matiereid = state.matieres.current.id;
    if (matiereid.length < 1) {
      return pRet;
    }
    pRet.matiereid = matiereid;
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
    const anneeid = state.annees.current.id;
    if (anneeid.length < 1) {
      return pRet;
    }
    pRet.anneeid = anneeid;
    const n = await pMan.getAffectationsCountAsync(anneeid, semestreid);  
    pRet.affectationsCount = n;
    const affs = await pMan.getAffectationsAsync(anneeid, semestreid, 0, n);
    pRet.affectations = affs;
    const matiereid = state.matieres.current.id;
    if (matiereid.length < 1){
      return pRet;
    }
    pRet.matiereid = matiereid;
    pRet.etudiantDescs =  await pMan.getAnneeSemestreMatiereStats(
      anneeid,
      matiereid,
      semestreid,
    );
    const groupeid = state.groupes.current.id;
    if (groupeid.length < 1) {
      return pRet;
    }
    pRet.groupeid = groupeid;
    const cur = affs.find((x) =>{
      return (x.groupeid === groupeid) && (x.semestreid === semestreid) && (x.anneeid === anneeid);
    });  
    if (cur !== undefined){
      pRet.affectation = cur;
    }  
   pRet.etudAffectationsCount = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    pRet.etudAffectations = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,state.etudaffectations.pageSize);  
    pRet.etudiantsOptions  = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(
      anneeid,
      semestreid,
      groupeid
    );
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
    const semestreid = state.semestres.current.id;
    if (semestreid.length < 1) {
      return pRet;
    }
    pRet.semestreid = semestreid;
    const n = await pMan.getAffectationsCountAsync(anneeid, semestreid);  
    pRet.affectationsCount = n;
    const affs = await pMan.getAffectationsAsync(anneeid, semestreid, 0, n);
    pRet.affectations = affs;
    const groupeid = state.groupes.current.id;
    if (groupeid.length < 1) {
      return pRet;
    }
    pRet.groupeid = groupeid;
    const cur = affs.find((x) =>{
      return (x.groupeid === groupeid) && (x.semestreid === semestreid) && (x.anneeid === anneeid);
    });  
    if (cur !== undefined){
      pRet.affectation = cur;
    }  
    pRet.etudAffectationsCount = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    pRet.etudAffectations = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,state.etudaffectations.pageSize);  
    pRet.etudiantsOptions  = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(
      anneeid,
      semestreid,
      groupeid
    );
    const matiereid = state.matieres.current.id;
    if (matiereid.length < 1) {
      return pRet;
    }
    pRet.matiereid = matiereid;
    pRet.etudiantDescs =  await pMan.getAnneeSemestreMatiereStats(
      anneeid,
      matiereid,
      semestreid,
    );
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
  public static async RefreshGlobalOptionsAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const pRet: IPayload = {
      };
      {
        const n = await pMan.getAnneesCountAsync();
        pRet.annees = await pMan.getAnneesAsync(0,n);
      } // annees
      {
        const n = await pMan.getSemestresCountAsync();
        pRet.semestres = await pMan.getSemestresAsync(0,n);
      } // semestres
      {
        const n = await pMan.getGroupesCountAsync();
        pRet.groupes = await pMan.getGroupesAsync(0,n);
      } // groupes
      {
        const n = await pMan.getUnitesCountAsync();
        pRet.unites = await pMan.getUnitesAsync(0,n);
      } // unites
      {
        const n = await pMan.getMatieresCountAsync();
        pRet.matieres = await pMan.getMatieresAsync(undefined,0,n);
      } // matieres
      {
        const n = await pMan.getDataVarsCountAsync();
        pRet.dataVars =  await pMan.getDataVarsAsync(0,n);
      } // unites
    return pRet;
  } // refreshGlobalOptionsAsync
} // class EtudiantServices
