import {
  ConvertEvtTypeToString,
  EvtGenre,
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
} from "../DataProcs";

import { DateToDisplay } from "../DataProcs";
import {
  IAffectationDoc,
  IAnneeDoc,
  IAttachedDoc,
  IControleDoc,
  IEtudAffectationDoc,
  IEtudiantDoc,
  IEvtDoc,
  IGroupeDoc,
  IMatiereDoc,
  INoteDoc,
  IOption,
  ISemestreDoc,
  IUniteDoc
} from "../DomainData";
import { IDataStore } from "./IDataStore";
import {
  TYPE_ANNEE,
  TYPE_GROUPE,
  TYPE_MATIERE,
  TYPE_SEMESTRE,
  TYPE_UNITE
} from "./impl/DomainData";
import {
  IItemAffectation,
  IItemAnnee,
  IItemAttInfo,
  IItemControle,
  IItemEtudAffectation,
  IItemEtudiant,
  IItemEvt,
  IItemGroupe,
  IItemMatiere,
  IItemNote,
  IItemSemestre,
  IItemUnite
} from "./impl/IInfoDomain";
//
export class BaseDataManager {
  protected pStore: IDataStore;
  //
  private semestresMap: Map<string, ISemestreDoc> = new Map<
    string,
    ISemestreDoc
  >();
  private groupesMap: Map<string, IGroupeDoc> = new Map<string, IGroupeDoc>();
  private unitesMap: Map<string, IUniteDoc> = new Map<string, IUniteDoc>();
  private anneesMap: Map<string, IAnneeDoc> = new Map<string, IAnneeDoc>();
  private affectationsMap: Map<string, IAffectationDoc> = new Map<
    string,
    IAffectationDoc
  >();
  private etudiantsMap: Map<string, IEtudiantDoc> = new Map<
    string,
    IEtudiantDoc
  >();
  private matieresMap: Map<string, IMatiereDoc> = new Map<
    string,
    IMatiereDoc
  >();
  private controlesMap: Map<string, IControleDoc> = new Map<
    string,
    IControleDoc
  >();
  //
  constructor(pStore: IDataStore) {
    this.pStore = pStore;
  } // constructor
  //
  public async synchroData(): Promise<void> {
    await this.pStore.synchroData();
  }// synchroData
  //
  public async getMatieresOptionsAsync(uniteid: string): Promise<IOption[]> {
    if (uniteid.trim().length < 1) {
      return [{ id: "", text: "" }];
    }
    const sel: any = {
      type: { $eq: TYPE_MATIERE },
      uniteid: { $eq: uniteid.trim() }
    };
    return this.getItemsOptionsAsync(sel);
  } // getUnitesOptionsAsync
  public getAnneesOptionsAsync(): Promise<IOption[]> {
    return this.getItemsOptionsAsync({ type: { $eq: TYPE_ANNEE } }, true);
  } // getUnitesOptionsAsync
  public getSemestresOptionsAsync(): Promise<IOption[]> {
    return this.getItemsOptionsAsync({ type: { $eq: TYPE_SEMESTRE } });
  } // getSemestresOptionsAsync
  public getGroupesOptionsAsync(): Promise<IOption[]> {
    return this.getItemsOptionsAsync({ type: { $eq: TYPE_GROUPE } });
  } // getGroupesOptionsAsync
  public getUnitesOptionsAsync(): Promise<IOption[]> {
    return this.getItemsOptionsAsync({ type: { $eq: TYPE_UNITE } });
  } // getUnitesOptionsAsync

  public async saveAttachmentAsync(
    docid: string,
    attname: string,
    attype: string,
    atdata: Blob | Buffer
  ): Promise<void> {
    await this.pStore.maintainsBlob(docid, attname, attype, atdata);
  } // saveAttachmentAsync
  public removeAttachmentAsync(docid: string, attname: string): Promise<void> {
    return this.pStore.removeBlob(docid, attname);
  } // removeAttachmentAsync
  public async fetchControleByIdAsync(sid: string): Promise<IControleDoc> {
    const pz = this.controlesMap.get(sid);
    if (pz) {
      return pz;
    } else {
      const pp = await this.pStore.findDocById(sid);
      return this.convertControleDocAsync(pp);
    }
  } // fetchControleByIdAsync
  public async fetchAffectationByIdAsync(id: string): Promise<IAffectationDoc> {
    const pz = this.affectationsMap.get(id);
    if (pz !== undefined) {
      return pz;
    } else {
      const pp = await this.pStore.findDocById(id);
      return this.convertAffectationDocAsync(pp);
    }
  } // fetchAffectationByIdAsync
  public async fetchMatiereByIdAsync(id: string): Promise<IMatiereDoc> {
    const pz = this.matieresMap.get(id);
    if (pz !== undefined) {
      return pz;
    } else {
      const pp = await this.pStore.findDocById(id);
      return this.convertMatiereDocAsync(pp);
    }
  } // fetchMatiereByIdAsync
  public async fetchGroupeByIdAsync(id: string): Promise<IGroupeDoc> {
    const pz = this.groupesMap.get(id);
    if (pz !== undefined) {
      return pz;
    } else {
      const pp = await this.pStore.findDocById(id);
      return this.convertGroupeDoc(pp);
    }
  } // fetchSemestreByIdAsync
  public async fetchSemestreByIdAsync(id: string): Promise<ISemestreDoc> {
    const pz = this.semestresMap.get(id);
    if (pz !== undefined) {
      return pz;
    } else {
      const pp = await this.pStore.findDocById(id);
      return this.convertSemestreDoc(pp);
    }
  } // fetchSemestreByIdAsync
  public async fetchUniteByIdAsync(id: string): Promise<IUniteDoc> {
    const pz = this.unitesMap.get(id);
    if (pz !== undefined) {
      return pz;
    } else {
      const pp = await this.pStore.findDocById(id);
      return this.convertUniteDoc(pp);
    }
  } // fetchUniteByIdAsync
  public async fetchAnneeByIdAsync(id: string): Promise<IAnneeDoc> {
    const pz = this.anneesMap.get(id);
    if (pz !== undefined) {
      return pz;
    } else {
      const pp = await this.pStore.findDocById(id);
      return this.convertAnneeDoc(pp);
    }
  } // fetchAnneeByIdAsync
  public async fetchEtudiantByIdAsync(id: string): Promise<IEtudiantDoc> {
    const pz = this.etudiantsMap.get(id);
    if (pz !== undefined) {
      return pz;
    } else {
      const pp = await this.pStore.findDocById(id);
      return this.convertEtudiantDoc(pp);
    }
  } // fetchEtudiantByIdAsync
  protected async getItemsOptionsAsync(
    sel: any,
    bDesc?: boolean
  ): Promise<IOption[]> {
    const pRet: IOption[] = [{ id: "", text: "" }];
    const fields = ["_id", "name"];
    const pp = await this.pStore.findAllDocsBySelector(sel, fields);
    let n = pp.length;
    if (n < 1) {
      return pRet;
    }
    const bb: IOption[] = [];
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      bb.push({ id: x._id, text: x.name });
    } // i
    if (bb.length > 1) {
      if (bDesc && bDesc === true) {
        bb.sort((x1, x2) => {
          if (x1.text > x2.text) {
            return -1;
          } else if (x1.text < x2.text) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        bb.sort((x1, x2) => {
          if (x1.text > x2.text) {
            return 1;
          } else if (x1.text < x2.text) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    }
    n = bb.length;
    for (let i = 0; i < n; i++) {
      pRet.push(bb[i]);
    }
    return pRet;
  } // getItemsOptionsAsync
  protected async convertEvtDocAsync(p: IItemEvt): Promise<IEvtDoc> {
    const pRet = GetEvt();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.affectationid = (p.affectationid) ? p.affectationid : '';
    pRet.etudaffectationid = (p.etudaffectationid) ? p.etudaffectationid : '';
    pRet.observations = p.observations ? p.observations : "";
    pRet.etudiantid = p.etudiantid ? p.etudiantid : "";
    pRet.controleid = p.controleid ? p.controleid : "";
    pRet.genre = p.evttype ? p.evttype : EvtGenre.Inconnu;
    pRet.genrestring = ConvertEvtTypeToString(pRet.genre);
    pRet.duration = p.duration ? p.duration : "";
    pRet.attachments = this.getDocAttachments(p);
    pRet.semestreid = p.semestreid ? p.semestreid : "";
    pRet.anneeid = p.anneeid ? p.anneeid : "";
    pRet.groupeid = p.groupeid ? p.groupeid : "";
    pRet.uniteid = p.uniteid ? p.uniteid : "";
    pRet.matiereid = p.matiereid ? p.matiereid : "";
    const pEtud = await this.fetchEtudiantByIdAsync(pRet.etudiantid);
    pRet.fullname = pEtud.fullname;
    pRet.url = pEtud.url;
    const x = await this.fetchControleByIdAsync(pRet.controleid);
    pRet.displaydate = x.displaydate;
    pRet.controlename = x.name;
    pRet.date = x.date;
    pRet.displaydate = x.displaydate;
    pRet.matierename = x.matierename;
    pRet.semestrename = x.semestrename;
    pRet.anneename = x.anneename;
    pRet.groupename = x.groupename;
    pRet.unitename = x.unitename;
    return pRet;
  } // convertEvtDocAsync
  protected async convertNoteDocAsync(p: IItemNote): Promise<INoteDoc> {
    const pRet = GetNote();
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.affectationid = (p.affectationid) ? p.affectationid : '';
    pRet.etudaffectationid = (p.etudaffectationid) ? p.etudaffectationid : '';
    pRet.controleid = p.controleid ? p.controleid : "";
    pRet.etudiantid = p.etudiantid ? p.etudiantid : "";
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.observations = p.observations ? p.observations : "";
    if (p.value) {
      pRet.value = p.value;
    } 
    pRet.semestreid = p.semestreid ? p.semestreid : "";
    pRet.anneeid = p.anneeid ? p.anneeid : "";
    pRet.groupeid = p.groupeid ? p.groupeid : "";
    pRet.uniteid = p.uniteid ? p.uniteid : "";
    pRet.matiereid = p.matiereid ? p.matiereid : "";
    pRet.attachments = this.getDocAttachments(p);
    const x = await this.fetchEtudiantByIdAsync(pRet.etudiantid);
    pRet.fullname = x.fullname;
    pRet.url = x.url;
    const xx = await this.fetchControleByIdAsync(pRet.controleid);
    pRet.coefficient = xx.coefficient;
    pRet.displaydate = xx.displaydate;
    pRet.controlename = xx.name;
    pRet.date = xx.date;
    pRet.displaydate = xx.displaydate;
    pRet.matierename = xx.matierename;
    pRet.semestrename = xx.semestrename;
    pRet.anneename = xx.anneename;
    pRet.groupename = xx.groupename;
    pRet.unitename = xx.unitename;
    return pRet;
  } // convertNoteDocAsync
  //
  protected async convertEtudAffectationDocAsync(
    p: IItemEtudAffectation
  ): Promise<IEtudAffectationDoc> {
    const pRet = GetEtudAffectation();
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.observations = p.observations ? p.observations : "";
    pRet.attachments = this.getDocAttachments(p);
    pRet.affectationid = p.affectationid ? p.affectationid : "";
    pRet.etudiantid = p.etudiantid ? p.etudiantid : "";
    pRet.startdate = p.startdate ? p.startdate : "";
    pRet.enddate = p.enddate ? p.enddate : "";
    pRet.semestreid = p.semestreid ? p.semestreid : "";
    pRet.anneeid = p.anneeid ? p.anneeid : "";
    pRet.groupeid = p.groupeid ? p.groupeid : "";
    const pEtud = await this.fetchEtudiantByIdAsync(pRet.etudiantid);
    pRet.fullname = pEtud.fullname;
    pRet.url = pEtud.url;
    pRet.etudiantStatus = pEtud.status;
    const aff = await this.fetchAffectationByIdAsync(pRet.affectationid);
    pRet.anneename = aff.anneename;
    pRet.semestrename = aff.semestrename;
    pRet.groupename = aff.groupename;
    if (pRet.startdate.length < 1 || pRet.enddate.length){
      pRet.startdate = aff.startdate;
      pRet.enddate = aff.enddate;
    }
    pRet.displayenddate = DateToDisplay(pRet.enddate);
    pRet.displaystartdate = DateToDisplay(pRet.startdate);
    return pRet;
  } // convertEtudAffectationDocAsync
  protected async convertAffectationDocAsync(
    p: IItemAffectation
  ): Promise<IAffectationDoc> {
    const pRet = GetAffectation();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.observations = p.observations ? p.observations : "";
    pRet.attachments = this.getDocAttachments(p);
    pRet.semestreid = p.semestreid ? p.semestreid : "";
    pRet.anneeid = p.anneeid ? p.anneeid : "";
    pRet.groupeid = p.groupeid ? p.groupeid : "";
    pRet.startdate = p.startdate ? p.startdate : "";
    pRet.enddate = p.enddate ? p.enddate : "";
    
    const sem = await this.fetchSemestreByIdAsync(pRet.semestreid);
    pRet.semestrename = sem.name;
    const an = await this.fetchAnneeByIdAsync(pRet.anneeid);
    pRet.anneename = an.name;
    if (pRet.startdate.length < 1 || pRet.enddate.length < 1){
      pRet.startdate = an.startdate;
      pRet.enddate = an.enddate;
    }
    const g = await this.fetchGroupeByIdAsync(pRet.groupeid);
    pRet.groupename = g.name;
    pRet.displayenddate = DateToDisplay(pRet.enddate);
    pRet.displaystartdate = DateToDisplay(pRet.startdate);
    this.affectationsMap.set(pRet.id, pRet);
    return pRet;
  } // convertAffectationDocAsync
  //
  protected async convertMatiereDocAsync(
    p: IItemMatiere
  ): Promise<IMatiereDoc> {
    const pRet = GetMatiere();
    pRet.modified = false;
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.observations = p.observations ? p.observations : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.name = p.name ? p.name : "";
    pRet.uniteid = p.uniteid ? p.uniteid : "";
    pRet.modname = p.modname ? p.modname : "";
    pRet.coefficient =
      p.coefficient && p.coefficient > 0.0 ? p.coefficient : 1.0;
    pRet.ecs = p.ecs && p.ecs >= 0.0 ? p.ecs : 0.0;
    const un = await this.fetchUniteByIdAsync(pRet.uniteid);
    pRet.unitename = un.name;
    pRet.attachments = this.getDocAttachments(p);
    this.matieresMap.set(pRet.id, pRet);
    return pRet;
  } // convertMatiereDocAsync
  protected async convertControleDocAsync(
    p: IItemControle
  ): Promise<IControleDoc> {
    const pRet = GetControle();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.observations = p.observations ? p.observations : "";
    pRet.date = p.date ? p.date : "";
    pRet.displaydate = DateToDisplay(pRet.date);
    pRet.name = p.name ? p.name : "";
    pRet.duration = p.duration ? p.duration : "";
    pRet.place = p.place ? p.place : "";
    pRet.coefficient = p.coefficient ? p.coefficient : 1.0;
    pRet.attachments = this.getDocAttachments(p);
    pRet.matiereid = p.matiereid ? p.matiereid : "";
    pRet.affectationid = p.affectationid ? p.affectationid : "";
    pRet.semestreid = p.semestreid ? p.semestreid : "";
    pRet.anneeid = p.anneeid ? p.anneeid : "";
    pRet.groupeid = p.groupeid ? p.groupeid : "";
    pRet.uniteid = p.uniteid ? p.uniteid : "";
    const mat = await this.fetchMatiereByIdAsync(pRet.matiereid);
    pRet.matierename = mat.name;
    const aff = await this.fetchAffectationByIdAsync(pRet.affectationid);
    pRet.anneename = aff.anneename;
    pRet.semestrename = aff.semestrename;
    pRet.groupename = aff.groupename;
    this.controlesMap.set(pRet.id, pRet);
    return pRet;
  } // convertControleDocAsync
  protected convertAnneeDoc(p: IItemAnnee): IAnneeDoc {
    const pRet = GetAnnee();
    pRet.modified = false;
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.observations = p.observations ? p.observations : "";
    pRet.startdate = p.startdate ? p.startdate : "";
    pRet.enddate = p.enddate ? p.enddate : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.name = p.name ? p.name : "";
    pRet.displayenddate = DateToDisplay(pRet.enddate);
    pRet.displaystartdate = DateToDisplay(pRet.startdate);
    pRet.attachments = this.getDocAttachments(p);
    this.anneesMap.set(pRet.id, pRet);
    return pRet;
  } // convertAnneeDoc
  protected convertEtudiantDoc(p: IItemEtudiant): IEtudiantDoc {
    const pRet = GetEtudiant();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.observations = p.observations ? p.observations : "";
    pRet.lastname = p.lastname ? p.lastname : "";
    pRet.firstname = p.firstname ? p.firstname : "";
    pRet.email = p.email ? p.email : "";
    pRet.fullname = (pRet.lastname + " " + pRet.firstname).trim();
    pRet.avatar = p.avatar ? p.avatar : "";
    pRet.status = p.status ? p.status : "";
    pRet.url = this.pStore.formBlobUrl(pRet.id, pRet.avatar);
    pRet.attachments = this.getDocAttachments(p);
    this.etudiantsMap.set(pRet.id, pRet);
    return pRet;
  } // convertEtudiantDoc
  protected convertSemestreDoc(p: IItemSemestre): ISemestreDoc {
    const pRet = GetSemestre();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.observations = p.observations ? p.observations : "";
    pRet.name = p.name ? p.name : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.attachments = this.getDocAttachments(p);
    this.semestresMap.set(pRet.id, pRet);
    return pRet;
  } // convertSemestreDoc
  protected convertUniteDoc(p: IItemUnite): IUniteDoc {
    const pRet = GetUnite();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.observations = p.observations ? p.observations : "";
    pRet.name = p.name ? p.name : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.attachments = this.getDocAttachments(p);
    this.unitesMap.set(pRet.id, pRet);
    return pRet;
  } // convertUniteDoc
  protected convertGroupeDoc(p: IItemGroupe): IGroupeDoc {
    const pRet = GetGroupe();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = (p.ownerid) ? p.ownerid : '';
    pRet.observations = p.observations ? p.observations : "";
    pRet.name = p.name ? p.name : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.attachments = this.getDocAttachments(p);
    this.groupesMap.set(pRet.id, pRet);
    return pRet;
  } // convertGroupeDoc
  protected getDocAttachments(p: any): IAttachedDoc[] {
    const pRet: IAttachedDoc[] = [];
    const docid: string = p._id ? p._id : "";
    const aa: any = p._attachments;
    const savatar: string = p.avatar ? p.avatar.trim() : "";
    if (aa) {
      // tslint:disable-next-line:forin
      for (const key in aa) {
        const info: IItemAttInfo = aa[key];
        const pz: IAttachedDoc = {
          docid,
          name: key,
          // tslint:disable-next-line:object-literal-sort-keys
          mime: info.content_type ? info.content_type : "",
          isAvatar: key === savatar,
          url: this.pStore.formBlobUrl(docid, key)
        };
        pRet.push(pz);
      } // key
    } // aa
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getDocAttachments
} // class BaseDataManager
