import { ETUDIANT_STATUS_FREE, GetEtudiant, GetNote } from "../DataProcs";
import { IControleDoc, IEtudiantDoc, IEvtDoc, INoteDoc, IOption } from "../DomainData";
import { IDataStore } from "./IDataStore";
import { TYPE_ETUD_AFFECTATION, TYPE_ETUDIANT, TYPE_EVT, TYPE_NOTE } from "./impl/DomainData";
import { IItemEtudiant, IItemEvt, IItemNote } from "./impl/IInfoDomain";
import { StatDataManager } from './StatDataManager';
//
export class DataPersistManager extends StatDataManager {
  //
  constructor(pStore: IDataStore) {
    super(pStore);
  } // constructor
  public async changeAnneeSemestreEtudiantsStatus(
    anneeid: string,
    semestreid: string,
    status: string
  ): Promise<void> {
    if (anneeid.length < 1 || semestreid.length < 1) {
      return;
    }
    const sel: any = {
      anneeid: { $eq: anneeid },
      semestreid: { $eq: semestreid },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    const pp = await this.pStore.findAllDocsBySelector(sel, ["etudiantid"]);
    const oTemp: Array<Promise<IItemEtudiant>> = [];
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      const id = x.etudiantid;
      oTemp.push(this.pStore.findDocById(id));
    } // i
    const ppz = await Promise.all(oTemp);
    const docs: IItemEtudiant[] = [];
    const nx = ppz.length;
    for (let i = 0; i < nx; ++i) {
      const p = ppz[i];
      const xold = p.status ? p.status : "";
      if (xold !== status) {
        p.status = xold;
        docs.push(p);
      }
    } // i
    if (docs.length < 1) {
      return;
    }
    await this.pStore.maintainsManyDocs(docs);
  } // changeAnneeSemestreEtudiantsStatus
  //
  public async importEtudsAsync(data: any[], ownerid:string): Promise<IEtudiantDoc[]> {
    const n = data.length;
    const oTemp: Array<Promise<any[]>> = [];
    const docs: IEtudiantDoc[] = [];
    for (let i = 0; i < n; i++) {
      const x: any = data[i];
      if (x ) {
        const lastname: string = x.lastname ? x.lastname.trim().toUpperCase()
            : "";
        let firstname: string = x.firstname ? x.firstname.trim(): "";
        if (lastname.length > 0 && firstname.length > 0) {
          const m = firstname.length;
          if (m > 1) {
            firstname =
              firstname.slice(0, 1).toUpperCase() + firstname.slice(1, m);
          } else {
            firstname = firstname.toUpperCase();
          }
          const pz = GetEtudiant();
          pz.ownerid = ownerid;
          pz.firstname = firstname;
          pz.lastname = lastname;
          pz.status = ETUDIANT_STATUS_FREE;
          const email = x.email ? x.email.trim() : "";
          if (email.length > 0) {
            pz.email = email;
          }
          const rem = x.observations ? x.observations : "";
          if (rem.length > 0) {
            pz.observations = rem;
          }
          pz.ident = x.ident ? x.ident : '';
          docs.push(pz);
          const sel: any = {
            firstname: { $eq: firstname },
            lastname: { $eq: lastname },
            type: { $eq: TYPE_ETUDIANT }
          };
          oTemp.push(this.pStore.findDocsBySelector(sel, 0, 1,["_id"]));
        } // fullname
      } // x
    } // i
    if (oTemp.length < 1) {
      return [];
    }
    const vv = await Promise.all(oTemp);
    const xdocs: IEtudiantDoc[] = [];
    const nx = vv.length;
    for (let i = 0; i < nx; i++) {
      const x = vv[i];
      if (x.length < 1) {
        xdocs.push(docs[i]);
      }
    } // i
    if (xdocs.length < 1) {
      return [];
    }
    const xtemp: Array<Promise<IEtudiantDoc>> = [];
    const ny = xdocs.length;
    for (let i = 0; i < ny; i++) {
      xtemp.push(this.saveEtudiantAsync(xdocs[i]));
    } // i
    return Promise.all(xtemp);
  }
  public async getAnneeSemestreGroupeEtudiantsOptionsAsync(
    anneeid: string,
    semestreid: string,
    groupeid: string
  ): Promise<IOption[]> {
    const sel: any = {
      anneeid: { $eq: anneeid },
      groupeid: { $eq: groupeid },
      semestreid: { $eq: semestreid },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    const pids = await this.pStore.findAllDocsBySelector(sel, ["etudiantid"]);
    const pRet: IOption[] = [];
    const n = pids.length;
    for (let i = 0; i < n; i++) {
      const x = pids[i];
      const id = x.etudiantid;
      const pEtud = await this.fetchEtudiantByIdAsync(id);
      if (pEtud.id.length > 0) {
        pRet.push({ id: pEtud.id, text: pEtud.fullname, url: pEtud.url });
      }
    } // i
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.text < b.text) {
          return -1;
        } else if (a.text > b.text) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getAnneeSemestreGroupeEtudiantsOptions
  public removeEvtAsync(p: IEvtDoc): Promise<void> {
    return this.pStore.removeDoc(p.id);
  } // removeEvtAsync
  public async maintainsEvtAsync(p: IEvtDoc): Promise<void> {
    const doc: any = {
      type: TYPE_EVT,
      // tslint:disable-next-line:object-literal-sort-keys
      observations: p.observations,
      controleid: p.controleid,
      etudiantid: p.etudiantid,
      duration: p.duration,
      evttype: p.genre,
      uniteid: p.uniteid,
      matiereid: p.matiereid,
      anneeid: p.anneeid,
      semestreid: p.semestreid,
      groupeid: p.groupeid,
      ownerid: p.ownerid,
      affectationid: p.affectationid,
      etudaffectationid: p.etudaffectationid
    };
    const pp: any[] = await this.pStore.findDocsBySelector(
      {
        type: { $eq: TYPE_EVT },
        // tslint:disable-next-line:object-literal-sort-keys
        controleid: { $eq: p.controleid },
        etudiantid: { $eq: p.etudiantid }
      },
      0,
      1,
      ["_id"]
    );
    if (pp.length > 0) {
      const x = pp[0];
      doc._id = x._id;
    } else if (p.id.trim().length > 0) {
      doc._id = p.id.trim();
    }
    await this.pStore.maintainsDoc(doc);
  } // maintainsEvtAsync
  public async getEtudiantEvtsAsync(id: string): Promise<IEvtDoc[]> {
    if (id.length < 1) {
      return [];
    }
    const pp: IItemEvt[] = await this.pStore.findAllDocsBySelector({
      etudiantid: { $eq: id },
      type: { $eq: TYPE_EVT }
    });
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const oTemp: Array<Promise<IEvtDoc>> = [];
    for (let i = 0; i < n; i++) {
      oTemp.push(this.convertEvtDocAsync(pp[i]));
    } // i
    const pRet: IEvtDoc[] = await Promise.all(oTemp);
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        } else if (a.date < b.date) {
          return 1;
        }
        if (a.controlename < b.controlename) {
          return -1;
        } else if (a.controlename > b.controlename) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // findByEtudiantIdAsync
  public async getControleEvtsAsync(id: string): Promise<IEvtDoc[]> {
    if (id.length < 1) {
      return [];
    }
    const pp: IItemEvt[] = await this.pStore.findAllDocsBySelector({
      type: { $eq: TYPE_EVT },
      // tslint:disable-next-line:object-literal-sort-keys
      controleid: { $eq: id }
    });
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const oTemp: Array<Promise<IEvtDoc>> = [];
    for (let i = 0; i < n; i++) {
      oTemp.push(this.convertEvtDocAsync(pp[i]));
    } // i
    const pRet: IEvtDoc[] = await Promise.all(oTemp);
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.fullname < b.fullname) {
          return -1;
        } else if (a.fullname > b.fullname) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getControleEvtsAsync
  public async checkControleNotesAsync(
    controleid: string
  ): Promise<IControleDoc> {
    const pCont = await this.fetchControleByIdAsync(controleid);
    if (pCont.rev.length < 1) {
      throw new TypeError("Controle not found");
    }
    const sel: any = {
      anneeid: { $eq: pCont.anneeid },
      groupeid: { $eq: pCont.groupeid },
      semestreid: { $eq: pCont.semestreid },
      type: { $eq: TYPE_ETUD_AFFECTATION }
    };
    const fields = ["_id","etudiantid"];
    const pp: any[] = await this.pStore.findAllDocsBySelector(sel, fields);
    const n = pp.length;
    if (n < 1) {
      return pCont;
    }
    const docs: INoteDoc[] = [];
    for (let i = 0; i < n; i++) {
      const v = pp[i];
      const etudid: string = v.etudiantid;
      const affid:string = v._id;
      const ppx: any[] = await this.pStore.findDocsBySelector(
        {
          type: { $eq: TYPE_NOTE },
          // tslint:disable-next-line:object-literal-sort-keys
          controleid: { $eq: controleid },
          etudiantid: { $eq: etudid }
        },
        0,
        1
      );
      if (ppx.length < 1) {
        const pz = GetNote();
        pz.ownerid = pCont.ownerid;
        pz.affectationid = pCont.affectationid;
        pz.etudaffectationid = affid;
        pz.etudiantid = etudid;
        pz.controleid = controleid;
        pz.uniteid = pCont.uniteid;
        pz.matiereid = pCont.matiereid;
        pz.anneeid = pCont.anneeid;
        pz.semestreid = pCont.semestreid;
        pz.groupeid = pCont.groupeid;
        docs.push(pz);
      }
    } // i
    if (docs.length > 0) {
      await this.maintainsManyNotesAsync(docs);
    } // docs
    pCont.notes = await this.getControleNotesAsync(controleid);
    pCont.evts = await this.getControleEvtsAsync(controleid);
    pCont.loaded = true;
    return pCont;
  } //  checkControleNotes
  public async getControleNotesAsync(id: string): Promise<INoteDoc[]> {
    if (id.length < 1) {
      return [];
    }
    const pp: IItemNote[] = await this.pStore.findAllDocsBySelector({
      type: { $eq: TYPE_NOTE },
      // tslint:disable-next-line:object-literal-sort-keys
      controleid: { $eq: id }
    });
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const oTemp: Array<Promise<INoteDoc>> = [];
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      oTemp.push(this.convertNoteDocAsync(x));
    } // i
    const pRet: INoteDoc[] = await Promise.all(oTemp);
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.fullname < b.fullname) {
          return -1;
        } else if (a.fullname > b.fullname) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getControleNotesAsync
  public async getEtudiantNotesAsync(id: string): Promise<INoteDoc[]> {
    if (id.length < 1) {
      return [];
    }
    const pp: IItemNote[] = await this.pStore.findAllDocsBySelector({
      etudiantid: { $eq: id },
      type: { $eq: TYPE_NOTE }
    });
    const n = pp.length;
    if (n < 1) {
      return [];
    }
    const oTemp: Array<Promise<INoteDoc>> = [];
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      oTemp.push(this.convertNoteDocAsync(x));
    } // i
    const pRet: INoteDoc[] = await Promise.all(oTemp);
    if (pRet.length > 1) {
      pRet.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        } else if (a.date < b.date) {
          return 1;
        }
        if (a.controlename < b.controlename) {
          return -1;
        } else if (a.controlename > b.controlename) {
          return 1;
        } else {
          return 0;
        }
      });
    } // sort
    return pRet;
  } // getEtudiantNotesAsync
  public async maintainsManyNotesAsync(notes: INoteDoc[]): Promise<void> {
    const docs: any[] = [];
    const n = notes.length;
    for (let i = 0; i < n; i++) {
      const p = notes[i];
      const x: IItemNote = {
        type: TYPE_NOTE,
        // tslint:disable-next-line:object-literal-sort-keys
        observations: p.observations,
        controleid: p.controleid,
        etudiantid: p.etudiantid,
        uniteid: p.uniteid,
        matiereid: p.matiereid,
        anneeid: p.anneeid,
        semestreid: p.semestreid,
        groupeid: p.groupeid,
        affectationid: p.affectationid,
        etudaffectationid: p.etudaffectationid,
        ownerid: p.ownerid
      };
      if (
        p.value !== undefined &&
        p.value !== null &&
        p.value >= 0.0 &&
        p.value <= 20.0
      ) {
        x.value = p.value;
      }
      if (p.id.trim().length > 0) {
        x._id = p.id;
      }
      if (p.rev.trim().length > 0){
        x._rev = p.rev;
      }
      docs.push(x);
    } // i
    this.pStore.maintainsManyDocs(docs);
  } // maintainsManyNotesAsync
  public async maintainsNoteAsync(p: INoteDoc): Promise<void> {
    if (p.controleid.length < 1 || p.etudiantid.length < 1) {
      throw new TypeError("Cannot save note");
    }
    const x: IItemNote = {
      type: TYPE_NOTE,
      // tslint:disable-next-line:object-literal-sort-keys
      observations: p.observations,
      controleid: p.controleid,
      etudiantid: p.etudiantid,
      uniteid: p.uniteid,
      matiereid: p.matiereid,
      anneeid: p.anneeid,
      semestreid: p.semestreid,
      groupeid: p.groupeid,
      affectationid: p.affectationid,
      etudaffectationid: p.etudaffectationid,
      ownerid: p.ownerid
    };
    if (
      p.value &&
      p.value >= 0.0 &&
      p.value <= 20.0
    ) {
      x.value = p.value;
    }
    const sel: any = {
      controleid: { $eq: x.controleid },
      etudiantid: { $eq: x.etudiantid },
      type: { $eq: TYPE_NOTE }
    };
    const pp: any[] = await this.pStore.findDocsBySelector(sel, 0, 1, ["_id"]);
    if (pp.length > 0) {
      const y = pp[0];
      x._id = y._id;
    } else if (p.id.trim().length > 0) {
      x._id = p.id.trim();
    }
    await this.pStore.maintainsDoc(x);
  } //  maintainsNoteAsync
} // class DataPersistManager
