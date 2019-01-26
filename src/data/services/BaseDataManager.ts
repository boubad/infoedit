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

import { DateToDisplay, GetDataVarDoc, GetStatItem } from '../DataProcs';
import {
  IAffectationDoc,
  IAnneeDoc,
  IAttachedDoc,
  IControleDoc,
  IDataVarDoc,
  IEtudAffectationDoc,
  IEtudiantDoc,
  IEvtDoc,
  IGroupeDoc,
  IMatiereDoc,
  INoteDoc,
  IOption,
  ISemestreDoc,
  ISigleNamedDoc,
  IStatItemDoc,
  IUniteDoc
} from "../DomainData";
import { IDataStore } from "./IDataStore";
import {
  IItemAffectation,
  IItemAnnee,
  IItemAttInfo,
  IItemControle,
  IItemDataVar,
  IItemEtudAffectation,
  IItemEtudiant,
  IItemEvt,
  IItemGroupe,
  IItemMatiere,
  IItemNote,
  IItemSemestre,
  IItemStat,
  IItemUnite
} from "./impl/IInfoDomain";
import {
  TYPE_AFFECTATION,
  TYPE_ANNEE,
  TYPE_CONTROLE,
  TYPE_DATAVAR,
  TYPE_ETUD_AFFECTATION,
  TYPE_ETUDIANT,
  TYPE_EVT,
  TYPE_GROUPE,
  TYPE_MATIERE,
  TYPE_NOTE,
  TYPE_SEMESTRE,
  TYPE_STAT,
  TYPE_UNITE
} from "./impl/InfoDomainData";
import { LocalStoreManager } from "./impl/local/LocalStoreManager";
//
export class BaseDataManager {
  public static sortSigleNamedDoc(bb: ISigleNamedDoc[]) {
    if (bb.length > 1) {
      bb.sort((x1, x2) => {
        if (x1.name > x2.name) {
          return 1;
        } else if (x1.name < x2.name) {
          return -1;
        } else {
          return 0;
        }
      });
    } // sort
  } // sortSigleNamedDoc
  public static sortOptions(bb: IOption[], bDesc = false) {
    if (bb.length > 1) {
      if (bDesc === true) {
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
  } // sortOptions
  //
  protected pStore: IDataStore;
  //
  private dataVarsOptions: IOption[] = [];
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
  private etudAffectationsMap: Map<string, IEtudAffectationDoc> = new Map<
    string,
    IEtudAffectationDoc
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
  private evtsMap: Map<string, IEvtDoc> = new Map<string, IEvtDoc>();
  private notesMap: Map<string, INoteDoc> = new Map<string, INoteDoc>();
  private dataVarsMap: Map<string, IDataVarDoc> = new Map<
    string,
    IDataVarDoc
  >();
  //

  constructor(pStore: IDataStore) {
    this.pStore = pStore;
  } // constructor
  //
  public async synchroData(): Promise<void> {
    await this.pStore.synchroData();
  } // synchroData
  //
  public async getDataVarOptionsAsync(): Promise<IOption[]> {
    const sel: any = {
      type: { $eq: TYPE_DATAVAR }
    };
    const pRet: IOption[] = [{ id: "", text: "" }];
    const fields = ["sigle", "name", "observations"];
    const pp = await this.pStore.findAllDocsBySelector(sel, fields);
    const n = pp.length;
    if (n < 1) {
      return pRet;
    }
    const bb: IOption[] = [];
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      const pz: IOption = {
        id: x.sigle,
        text: x.name
      };
      if (x.observations) {
        pz.url = x.observations;
      }
      bb.push(pz);
    } // i
    BaseDataManager.sortOptions(bb);
    for (let i = 0; i < n; i++) {
      pRet.push(bb[i]);
    }
    return pRet;
  } // getDataVarOptionsAsync
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
  //////////////////////////
  public async loadStatItemByIdAsync(id: string): Promise<IStatItemDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_STAT }
    };
    const data: IItemNote[] = await this.pStore.findDocsBySelector(sel, 0, 1);
    if (data.length > 0) {
      return await this.convertStatItemDoc(data[0]);
    } else {
      return GetStatItem();
    }
  } // loadStatItemByIdAsync
  public async loadNoteByIdAsync(id: string): Promise<INoteDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_NOTE }
    };
    const data: IItemNote[] = await this.pStore.findDocsBySelector(sel, 0, 1);
    if (data.length > 0) {
      return await this.convertNoteDocAsync(data[0]);
    } else {
      return GetNote();
    }
  } // loadEvtByIdAsync
  public async loadEvtByIdAsync(id: string): Promise<IEvtDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_EVT }
    };
    const data: IItemEvt[] = await this.pStore.findDocsBySelector(sel, 0, 1);
    if (data.length > 0) {
      return await this.convertEvtDocAsync(data[0]);
    } else {
      return GetEvt();
    }
  } // loadEvtByIdAsync
  public async loadUniteByIdAsync(id: string): Promise<IUniteDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_UNITE }
    };
    const data: IItemUnite[] = await this.pStore.findDocsBySelector(sel, 0, 1);
    if (data.length > 0) {
      return this.convertUniteDoc(data[0]);
    } else {
      return GetUnite();
    }
  } // loadUniteByIdAsyn
  public async loadSemestreByIdAsync(id: string): Promise<ISemestreDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_SEMESTRE }
    };
    const data: IItemSemestre[] = await this.pStore.findDocsBySelector(
      sel,
      0,
      1
    );
    if (data.length > 0) {
      return this.convertSemestreDoc(data[0]);
    } else {
      return GetSemestre();
    }
  } // loadSemestreByIdAsyn
  public async loadMatiereByIdAsync(id: string): Promise<IMatiereDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_MATIERE }
    };
    const data: IItemMatiere[] = await this.pStore.findDocsBySelector(
      sel,
      0,
      1
    );
    if (data.length > 0) {
      return await this.convertMatiereDocAsync(data[0]);
    } else {
      return GetMatiere();
    }
  } // loadByIdAsyn
  public async loadGroupeByIdAsync(id: string): Promise<IGroupeDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_GROUPE }
    };
    const data: IItemGroupe[] = await this.pStore.findDocsBySelector(sel, 0, 1);
    if (data.length > 0) {
      return this.convertGroupeDoc(data[0]);
    } else {
      return GetGroupe();
    }
  } // loadGroupeByIdAsyn
  //
  public async loadEtudiantByIdAsync(id: string): Promise<IEtudiantDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_ETUDIANT }
    };
    const data: IItemEtudiant[] = await this.pStore.findDocsBySelector(
      sel,
      0,
      1
    );
    if (data.length > 0) {
      return this.convertEtudiantDocAsync(data[0]);
    } else {
      return GetEtudiant();
    }
  } // loadByIdAsync
  //
  public async loadEtudAffectationByIdAsync(
    id: string
  ): Promise<IEtudAffectationDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    const data: IItemEtudAffectation[] = await this.pStore.findDocsBySelector(
      sel,
      0,
      1
    );
    if (data.length > 0) {
      return this.convertEtudAffectationDocAsync(data[0]);
    } else {
      return GetEtudAffectation();
    }
  } // loadByIdAsync
  public async loadControleByIdAsync(id: string): Promise<IControleDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_CONTROLE }
    };
    const data: IItemControle[] = await this.pStore.findDocsBySelector(
      sel,
      0,
      1
    );
    if (data.length > 0) {
      return this.convertControleDocAsync(data[0]);
    } else {
      return GetControle();
    }
  } // loadByIdAsyn
  public async loadAnneeByIdAsync(id: string): Promise<IAnneeDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_ANNEE }
    };
    const data: IItemAnnee[] = await this.pStore.findDocsBySelector(sel);
    if (data.length > 0) {
      return this.convertAnneeDoc(data[0]);
    }
    return GetAnnee();
  } // loadAneeByIdAsync
  //
  public async loadAffectationByIdAsync(id: string): Promise<IAffectationDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_AFFECTATION }
    };
    const pp: IItemAffectation[] = await this.pStore.findDocsBySelector(
      sel,
      0,
      1
    );
    if (pp.length > 0) {
      return this.convertAffectationDocAsync(pp[0]);
    }
    return GetAffectation();
  } // loadByIdAsync
  public async loadDataVarByIdAsync(id: string): Promise<IDataVarDoc> {
    const sel: any = {
      _id: { $eq: id },
      type: { $eq: TYPE_DATAVAR }
    };
    const pp: IDataVarDoc[] = await this.pStore.findDocsBySelector(sel, 0, 1);
    if (pp.length > 0) {
      return this.convertDataVarDoc(pp[0]);
    }
    return GetDataVarDoc();
  } // loadByIdAsync
  /////////////////////////////
  public async fetchDataVarByIdAsync(sid: string): Promise<IDataVarDoc> {
    const pz = this.dataVarsMap.get(sid);
    if (pz) {
      return pz;
    } else {
      return this.loadDataVarByIdAsync(sid);
    }
  } // fetchDataVarByIdAsync
  public async fetchNoteByIdAsync(sid: string): Promise<INoteDoc> {
    const pz = this.notesMap.get(sid);
    if (pz) {
      return pz;
    } else {
      return this.loadNoteByIdAsync(sid);
    }
  } // fetchNoteByIdAsync
  public async fetchEvtByIdAsync(sid: string): Promise<IEvtDoc> {
    const pz = this.evtsMap.get(sid);
    if (pz) {
      return pz;
    } else {
      return this.loadEvtByIdAsync(sid);
    }
  } // fetchEvtByIdAsync
  public async fetchControleByIdAsync(sid: string): Promise<IControleDoc> {
    const pz = this.controlesMap.get(sid);
    if (pz) {
      return pz;
    } else {
      return this.loadControleByIdAsync(sid);
    }
  } // fetchControleByIdAsync
  public async fetchEtudAffectationByIdAsync(
    id: string
  ): Promise<IEtudAffectationDoc> {
    const pz = this.etudAffectationsMap.get(id);
    if (pz) {
      return pz;
    } else {
      return this.loadEtudAffectationByIdAsync(id);
    }
  } // fetchEtudAffectationByIdAsync
  public async fetchAffectationByIdAsync(id: string): Promise<IAffectationDoc> {
    const pz = this.affectationsMap.get(id);
    if (pz) {
      return pz;
    } else {
      return this.loadAffectationByIdAsync(id);
    }
  } // fetchAffectationByIdAsync
  public async fetchMatiereByIdAsync(id: string): Promise<IMatiereDoc> {
    const pz = this.matieresMap.get(id);
    if (pz) {
      return pz;
    } else {
      return this.loadMatiereByIdAsync(id);
    }
  } // fetchMatiereByIdAsync
  public async fetchGroupeByIdAsync(id: string): Promise<IGroupeDoc> {
    const pz = this.groupesMap.get(id);
    if (pz) {
      return pz;
    } else {
      return this.loadGroupeByIdAsync(id);
    }
  } // fetchSemestreByIdAsync
  public async fetchSemestreByIdAsync(id: string): Promise<ISemestreDoc> {
    const pz = this.semestresMap.get(id);
    if (pz) {
      return pz;
    } else {
      return this.loadSemestreByIdAsync(id);
    }
  } // fetchSemestreByIdAsync
  public async fetchUniteByIdAsync(id: string): Promise<IUniteDoc> {
    const pz = this.unitesMap.get(id);
    if (pz) {
      return pz;
    } else {
      return this.loadUniteByIdAsync(id);
    }
  } // fetchUniteByIdAsync
  public async fetchAnneeByIdAsync(id: string): Promise<IAnneeDoc> {
    const pz = this.anneesMap.get(id);
    if (pz) {
      return pz;
    } else {
      return this.loadAnneeByIdAsync(id);
    }
  } // fetchAnneeByIdAsync
  public async fetchEtudiantByIdAsync(id: string): Promise<IEtudiantDoc> {
    const pz = this.etudiantsMap.get(id);
    if (pz) {
      return pz;
    } else {
      return this.loadEtudiantByIdAsync(id);
    }
  } // fetchEtudiantByIdAsync
//////////////////////////////////////////

  protected async convertEvtDocAsync(p: IItemEvt): Promise<IEvtDoc> {
    this.register(p._id as string, p);
    const pRet = GetEvt();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
    pRet.affectationid = p.affectationid ? p.affectationid : "";
    pRet.etudaffectationid = p.etudaffectationid ? p.etudaffectationid : "";
    pRet.observations = p.observations ? p.observations : "";
    pRet.etudiantid = p.etudiantid ? p.etudiantid : "";
    pRet.controleid = p.controleid ? p.controleid : "";
    pRet.genre = p.evttype ? p.evttype : EvtGenre.Inconnu;
    pRet.genrestring = ConvertEvtTypeToString(pRet.genre);
    pRet.duration = p.duration ? p.duration : "";
    pRet.justifie = (p.justifie) ? p.justifie : false;
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
    if (pRet.id.length > 0) {
      this.evtsMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertEvtDocAsync
  protected async convertNoteDocAsync(p: IItemNote): Promise<INoteDoc> {
    this.register(p._id as string, p);
    const pRet = GetNote();
    pRet.ownerid = p.ownerid ? p.ownerid : "";
    pRet.affectationid = p.affectationid ? p.affectationid : "";
    pRet.etudaffectationid = p.etudaffectationid ? p.etudaffectationid : "";
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
    if (pRet.id.length > 0) {
      this.notesMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertNoteDocAsync
  //
  protected async convertEtudAffectationDocAsync(
    p: IItemEtudAffectation
  ): Promise<IEtudAffectationDoc> {
    this.register(p._id as string, p);
    const pRet = GetEtudAffectation();
    pRet.ownerid = p.ownerid ? p.ownerid : "";
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
    if (pRet.startdate.length < 1 || pRet.enddate.length) {
      pRet.startdate = aff.startdate;
      pRet.enddate = aff.enddate;
    }
    pRet.displayenddate = DateToDisplay(pRet.enddate);
    pRet.displaystartdate = DateToDisplay(pRet.startdate);
    if (pRet.id.length > 0) {
      this.etudAffectationsMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertEtudAffectationDocAsync
  protected async convertAffectationDocAsync(
    p: IItemAffectation
  ): Promise<IAffectationDoc> {
    this.register(p._id as string, p);
    const pRet = GetAffectation();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
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
    if (pRet.startdate.length < 1 || pRet.enddate.length < 1) {
      pRet.startdate = an.startdate;
      pRet.enddate = an.enddate;
    }
    const g = await this.fetchGroupeByIdAsync(pRet.groupeid);
    pRet.groupename = g.name;
    pRet.displayenddate = DateToDisplay(pRet.enddate);
    pRet.displaystartdate = DateToDisplay(pRet.startdate);
    if (pRet.id.length > 0) {
      this.affectationsMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertAffectationDocAsync
  //
  protected async convertMatiereDocAsync(
    p: IItemMatiere
  ): Promise<IMatiereDoc> {
    this.register(p._id as string, p);
    const pRet = GetMatiere();
    pRet.modified = false;
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
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
    if (pRet.id.length > 0) {
      this.matieresMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertMatiereDocAsync
  protected async convertControleDocAsync(
    p: IItemControle
  ): Promise<IControleDoc> {
    this.register(p._id as string, p);
    const pRet = GetControle();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
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
    if (pRet.id.length > 0) {
      this.controlesMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertControleDocAsync
  protected convertAnneeDoc(p: IItemAnnee): IAnneeDoc {
    this.register(p._id as string, p);
    const pRet = GetAnnee();
    pRet.modified = false;
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
    pRet.observations = p.observations ? p.observations : "";
    pRet.startdate = p.startdate ? p.startdate : "";
    pRet.enddate = p.enddate ? p.enddate : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.name = p.name ? p.name : "";
    pRet.displayenddate = DateToDisplay(pRet.enddate);
    pRet.displaystartdate = DateToDisplay(pRet.startdate);
    pRet.attachments = this.getDocAttachments(p);
    if (pRet.id.length > 0) {
      this.anneesMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertAnneeDoc
  protected async convertEtudiantDocAsync(
    p: IItemEtudiant
  ): Promise<IEtudiantDoc> {
    this.register(p._id as string, p);
    const pRet = GetEtudiant();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
    pRet.observations = p.observations ? p.observations : "";
    pRet.lastname = p.lastname ? p.lastname : "";
    pRet.firstname = p.firstname ? p.firstname : "";
    pRet.email = p.email ? p.email : "";
    pRet.fullname = (pRet.lastname + " " + pRet.firstname).trim();
    pRet.avatar = p.avatar ? p.avatar : "";
    pRet.status = p.status ? p.status : "";
    pRet.ident = p.ident ? p.ident : "";
    pRet.data = p.data ? p.data : {};
    pRet.sexe = (p.sexe) ? p.sexe: '';
    pRet.redoublant = (p.redoublant)? p.redoublant: '';
    pRet.sup = (p.sup) ? p.sup: '';
    pRet.url = this.pStore.formBlobUrl(pRet.id, pRet.avatar);
    pRet.attachments = this.getDocAttachments(p);
    if (pRet.id.length > 0) {
      await this.checkEtudiantVars(pRet);
      this.etudiantsMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertEtudiantDocAsync
  protected convertSemestreDoc(p: IItemSemestre): ISemestreDoc {
    this.register(p._id as string, p);
    const pRet = GetSemestre();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
    pRet.observations = p.observations ? p.observations : "";
    pRet.name = p.name ? p.name : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.attachments = this.getDocAttachments(p);
    if (pRet.id.length > 0) {
      this.semestresMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertSemestreDoc
  protected convertDataVarDoc(p: IItemDataVar): IDataVarDoc {
    this.register(p._id as string, p);
    const pRet = GetDataVarDoc();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
    pRet.observations = p.observations ? p.observations : "";
    pRet.name = p.name ? p.name : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.modalkeys = p.modalkeys ? p.modalkeys : [];
    pRet.modelvalues = p.modelvalues ? p.modelvalues : [];
    pRet.vartype = p.vartype ? p.vartype : "";
    pRet.attachments = this.getDocAttachments(p);
    if (pRet.id.length > 0) {
      this.dataVarsMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertDataVarDoc
  protected convertUniteDoc(p: IItemUnite): IUniteDoc {
    this.register(p._id as string, p);
    const pRet = GetUnite();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
    pRet.observations = p.observations ? p.observations : "";
    pRet.name = p.name ? p.name : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.attachments = this.getDocAttachments(p);
    if (pRet.id.length > 0) {
      this.unitesMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertUniteDoc
  protected convertGroupeDoc(p: IItemGroupe): IGroupeDoc {
    this.register(p._id as string, p);
    const pRet = GetGroupe();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.ownerid = p.ownerid ? p.ownerid : "";
    pRet.observations = p.observations ? p.observations : "";
    pRet.name = p.name ? p.name : "";
    pRet.sigle = p.sigle ? p.sigle : "";
    pRet.attachments = this.getDocAttachments(p);
    if (pRet.id.length > 0) {
      this.groupesMap.set(pRet.id, pRet);
    }
    return pRet;
  } // convertGroupeDoc
  protected convertStatItemDoc(p: IItemStat): IStatItemDoc {
    this.register(p._id as string, p);
    const pRet = GetStatItem();
    pRet.id = p._id ? p._id : "";
    pRet.rev = p._rev ? p._rev : "";
    pRet.data = (p.data) ? p.data : {};
    pRet.attachments = this.getDocAttachments(p);
    return pRet;
  } // convertStatItemDoc
  private getDocAttachments(p: any): IAttachedDoc[] {
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
  private register(id: string, data: any) {
    LocalStoreManager.put(id, data);
  } // register
  private async checkEtudiantVars(pEtud: IEtudiantDoc) {
    if (this.dataVarsOptions.length < 1) {
      this.dataVarsOptions = await this.getDataVarOptionsAsync();
    }
    const data = pEtud.data;
    this.dataVarsOptions.forEach(opt => {
      const key = opt.id;
      if (key.length > 0) {
        if (!data.hasOwnProperty(key)) {
          data[key] = "";
        }
      } // key
    });
    pEtud.data = data;
  } // checkEtudiantVars
  private async getItemsOptionsAsync(
    sel: any,
    bDesc?: boolean
  ): Promise<IOption[]> {
    const pRet: IOption[] = [{ id: "", text: "" }];
    const fields = ["_id", "name"];
    const pp = await this.pStore.findAllDocsBySelector(sel, fields);
    const n = pp.length;
    if (n < 1) {
      return pRet;
    }
    const bb: IOption[] = [];
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      bb.push({ id: x._id, text: x.name });
    } // i
    BaseDataManager.sortOptions(bb);
    for (let i = 0; i < n; i++) {
      pRet.push(bb[i]);
    }
    return pRet;
  } // getItemsOptionsAsync
} // class BaseDataManager
