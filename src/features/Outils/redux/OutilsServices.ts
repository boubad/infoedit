import { ETUDIANT_STATUS_FREE } from '../../../data/domain/DataProcs';
import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';

export class OutilsServices {
  //
  public static async getStatItemsTextAsync( state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const stringData = await pMan.getStatItemsTextAsync();
    return ({
      stringData,
    });
  }// getStatItemsTextAsync
  //
  public static async checkEtudiantsData( state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    await pMan.checkAllEtudiantsStatItem();
    return ({
      status: "Les données ont été mises à jour!"
    });
  }// checkEtudiantsData
  //
  public static async syncDataAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    await pMan.synchroData();
    return ({
      status: "Les données ont été mises à jour!"
    });
  } // syncDataAsync
  //
  public static async refreshAnneeSemestreEtudiantsStatus(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
    const status = state.etudiants.etudiantStatus;
    const nTotal = await pMan.getEtudiantsCountAsync(status);
    const page = 1;
    const count = state.etudiants.pageSize;
    const offset = 0;
    const etudiants = await pMan.getEtudiantsAsync(status, offset, count);
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    return {
      etudAffectations:affs,
      etudiantsOptions: opts,
      // tslint:disable-next-line:object-literal-sort-keys
       etudiantsCount: nTotal,
      etudiants,
     
      page,
      // tslint:disable-next-line:object-literal-sort-keys
      freeEtudiantsOpts: await pMan.getEtudiantsOptsByStatusAsync(
        ETUDIANT_STATUS_FREE
      )
    };
  } // refreshAnneeSemestreEtudiantsStatus
  public static async changeAnneeSemestreEtudiantsStatus(
    state: IInfoState,
    newstatus: string
  ): Promise<IPayload> {
    if (newstatus.trim().length < 1) {
      newstatus = ETUDIANT_STATUS_FREE;
    }
    const pMan = BaseServices.getPersistManager(state);
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
    await pMan.changeAnneeSemestreEtudiantsStatus(anneeid, semestreid, newstatus);
    const status = state.etudiants.etudiantStatus;
    const nTotal = await pMan.getEtudiantsCountAsync(status);
    const page = 1;
    const count = state.etudiants.pageSize;
    const offset = 0;
    const etudiants = await pMan.getEtudiantsAsync(status, offset, count);
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    return {
      // tslint:disable-next-line:object-literal-sort-keys
      etudAffectations:affs,
      etudiantsOptions: opts,
      // tslint:disable-next-line:object-literal-sort-keys
      etudiantsCount: nTotal,
      etudiants,
     
      page,
      // tslint:disable-next-line:object-literal-sort-keys
      freeEtudiantsOpts: await pMan.getEtudiantsOptsByStatusAsync(
        ETUDIANT_STATUS_FREE
      )
    };
  } // changeAnneeSemestreEtudiantsStatus
    public static async importEtudiantsAsync(
      state: IInfoState,
      data: any[]
    ): Promise<IPayload> {
      const pMan = BaseServices.getPersistManager(state);
      const pimports = await pMan.importEtudsAsync(data,state.appstate.ownerid);
    const status = state.etudiants.etudiantStatus;
    const nTotal = await pMan.getEtudiantsCountAsync(status);
    const page = 1;
    const count = state.etudiants.pageSize;
    const offset = 0;
    const etudiants = await pMan.getEtudiantsAsync(status, offset, count);
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    return {
      importedEtudiants: pimports,  
      // tslint:disable-next-line:object-literal-sort-keys
      etudAffectations:affs,
      etudiantsOptions: opts,
      // tslint:disable-next-line:object-literal-sort-keys
      etudiants,
      etudiantsCount: nTotal,
      page,
      // tslint:disable-next-line:object-literal-sort-keys
      freeEtudiantsOpts: await pMan.getEtudiantsOptsByStatusAsync(
        ETUDIANT_STATUS_FREE
      )
    };
    } // importEtudiantsAsync
    //
  } // class ImportEtudiantsServices
  