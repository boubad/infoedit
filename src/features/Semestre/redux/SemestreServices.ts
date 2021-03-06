import { ISemestreDoc } from "../../../data/DomainData";
import { BaseServices } from "../../../redux/BaseServices";
import { IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";
//
export class SemestreServices {
  //
  public static async saveSemestreAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.semestres.current;
    await pMan.saveSemestreAsync(p);
    return this.refreshSemestresAsync(state);
  } // saveSemestreAsync

  public static async removeSemestreAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.semestres.current.id;
    await pMan.removeSemestreAsync(id);
    return this.refreshSemestresAsync(state);
  } // removeSemestreAsync
  public static refreshSemestresAsync(state: IInfoState): Promise<IPayload> {
    return this.gotoPageSemestreAsync(state, state.semestres.currentPage);
  } // RefreshControles
  public static async gotoPageSemestreAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getSemestresCountAsync();
    if (page < 1) {
      page = 1;
    }
    const count = state.semestres.pageSize;
    let offset = (page - 1) * count;
    if (offset + count > nTotal) {
      offset = nTotal - count;
      if (offset < 0) {
        offset = 0;
      }
    }
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    const semestres = await pMan.getSemestresAsync(offset, count);
    return {
      etudAffectations:affs,
      etudiantsOptions: opts,
      page,
      semestres,
      semestresCount: nTotal,
      semestresOptions: await pMan.getSemestresOptionsAsync()
    };
  } // gotoPageControle
  //
  public static async saveSemestreAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.semestres.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    const pz = await pMan.loadSemestreByIdAsync(id);
    const bb: ISemestreDoc[] = [];
    const pp = state.semestres.pageData;
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      if (x.id === id) {
        bb.push(pz);
      } else {
        bb.push(x);
      }
    } // i
    return {
      semestre: pz,
      semestres: bb
    };
  } // saveSemestreAttachment
  //
  public static async removeSemestreAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.semestres.current.id;
    await pMan.removeAttachmentAsync(id, name);
    const pz = await pMan.loadSemestreByIdAsync(id);
    const bb: ISemestreDoc[] = [];
    const pp = state.semestres.pageData;
    const n = pp.length;
    for (let i = 0; i < n; i++) {
      const x = pp[i];
      if (x.id === id) {
        bb.push(pz);
      } else {
        bb.push(x);
      }
    } // i
    return {
      semestre: pz,
      semestres: bb
    };
  } // removeSemestreAttachmentAsync
  //
} // class SemestreServices
