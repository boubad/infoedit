import { GetControle, GetEtudiant } from "../data/DataProcs";
import {
  IControleDoc,
  IEtudiantDoc,
  IEvtDoc,
  INoteDoc
} from "../data/DomainData";
import { DataPersistManager } from "../data/services/DataPersistManager";
import { DataStoreFactory } from "../data/services/DataStoreFactory";
import { IInfoState } from './InfoState';
import { IPayload } from "./IPayload";

//
export class BaseServices {
  //
  public static getPersistManager(state: IInfoState): DataPersistManager {
    const url = state.appdata.dataServerUrl;
    const name = state.appdata.databaseName;
    const pStore = DataStoreFactory.GetDataStore(url, name);
    return new DataPersistManager(pStore);
  } // getPersistManager
  //
  ////////////////
  public static async refreshControleAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pRet: IPayload = {
      controle: GetControle()
    };
    const pMan = BaseServices.getPersistManager(state);
    const p: IControleDoc = await pMan.fetchControleByIdAsync(id);
    p.notes = await pMan.getControleNotesAsync(id);
    p.evts = await pMan.getControleEvtsAsync(id);
    p.loaded = true;
    pRet.controle = p;
    const etudiantid = state.etudiants.current.id;
    if (etudiantid.length > 0) {
      const px = await pMan.fetchEtudiantByIdAsync(etudiantid);
      px.notes = await pMan.getEtudiantNotesAsync(etudiantid);
      px.evts = await pMan.getEtudiantEvtsAsync(etudiantid);
      px.affectations = await pMan.getEtudiantAffectationsAsync(etudiantid);
      px.loaded = true;
      pRet.etudiant = px;
    }
    return pRet;
  } // refreshControleAsync
  public static async refreshEtudiantAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pRet: IPayload = {
      etudiant: GetEtudiant()
    };
    const pMan = BaseServices.getPersistManager(state);
    const p: IEtudiantDoc = await pMan.fetchEtudiantByIdAsync(id);
    p.notes = await pMan.getEtudiantNotesAsync(id);
    p.evts = await pMan.getEtudiantEvtsAsync(id);
    p.affectations = await pMan.getEtudiantAffectationsAsync(p.id);
    p.loaded = true;
    pRet.etudiant = p;
    const controleid = state.controles.current.id;
    if (controleid.length > 0) {
      const px = await pMan.fetchControleByIdAsync(controleid);
      px.notes = await pMan.getControleNotesAsync(controleid);
      px.evts = await pMan.getControleEvtsAsync(controleid);
      px.loaded = true;
      pRet.controle = px;
    }
    return pRet;
  } // refreshEtudiantAsync
  public static async refreshNoteAsync(
    state: IInfoState,
    pNote: INoteDoc
  ): Promise<IPayload> {
    const pRet: IPayload = {};
    const id = pNote.id;
    const controleid = pNote.controleid;
    const etudiantid = pNote.etudiantid;
    const pMan = BaseServices.getPersistManager(state);
    pRet.note = await pMan.loadNoteByIdAsync(id);
    pRet.controleNotes = await pMan.getControleNotesAsync(controleid);
    pRet.etudiantNotes = await pMan.getEtudiantNotesAsync(etudiantid);
    return pRet;
  } // refreshNoteAsync
  public static async refreshEvtAsync(
    state: IInfoState,
    pEvt: IEvtDoc
  ): Promise<IPayload> {
    const pRet: IPayload = {};
    const id = pEvt.id;
    const controleid = pEvt.controleid;
    const etudiantid = pEvt.etudiantid;
    const pMan = BaseServices.getPersistManager(state);
    pRet.evt = await pMan.loadEvtByIdAsync(id);
    pRet.controleNotes = await pMan.getControleNotesAsync(controleid);
    pRet.etudiantNotes = await pMan.getEtudiantNotesAsync(etudiantid);
    return pRet;
  } // refreshEvtAsync
} // class BaseServices
