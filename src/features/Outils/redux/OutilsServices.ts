import { ETUDIANT_STATUS_FREE } from 'src/data/DataProcs';
import { BaseServices } from 'src/redux/BaseServices';
import { IInfoState } from 'src/redux/InfoState';
import { IPayload } from 'src/redux/IPayload';

export class OutilsServices {
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
  