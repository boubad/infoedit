import { IInfoState } from '../../../data/state/InfoState';
import { IOption } from './../../../data/domain/DomainData.d';

import { IPayload } from '../../../data/state/IPayload';

import { GetInitialSemestre } from '../../../data/state/stores/StateProcs';

import { BaseServices } from '../../../data/state/services/BaseServices';

import { ISemestreDoc } from '../../../data/domain/DomainData';

//
export class SemestreServices {
  public static createSemestre(state: IInfoState): IPayload {
    return { semestre: GetInitialSemestre(state) };
  } // createSemestre
  public static async selectSemestreAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const sid = id.trim();
    if (sid.length < 1) {
      return { semestre: GetInitialSemestre(state) };
    }
    let px = state.semestres.pageData.find(x => {
      return x.id === sid;
    });
    if (px === undefined) {
      const pMan = BaseServices.getPersistManager(state);
      px = await pMan.fetchSemestreByIdAsync(sid);
    }
    return { semestre: px };
  } // selectSemestreAsync
  //
  public static async saveSemestreAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.semestres.current;
    const px = await pMan.saveSemestreAsync(p);
    const pRet = await SemestreServices.refreshSemestresAsync(state);
    pRet.semestre = px;
    return pRet;
  } // saveSemestreAsync

  public static async removeSemestreAsync(
    state: IInfoState
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.semestres.current.id;
    await pMan.removeSemestreAsync(id);
    return SemestreServices.refreshSemestresAsync(state);
  } // removeSemestreAsync
  public static async refreshSemestresAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getSemestresCountAsync();
    const anneeid = state.appstate.anneeid;
    const semestreid = state.appstate.semestreid;
    const groupeid = state.appstate.groupeid;
    const nx = await pMan.getEtudAffectationsCountAsync(anneeid,semestreid,groupeid);
    const affs = await pMan.getEtudAffectationsAsync(anneeid,semestreid,groupeid,0,nx);
    const opts = await pMan.getAnneeSemestreGroupeEtudiantsOptionsAsync(anneeid,semestreid,groupeid);
    const semestres = await pMan.getSemestresAsync(0, nTotal);
    const opts2:IOption[] = [{id:'',text:''}];
    semestres.forEach((x) =>{
      let stag = x.tag;
      if (stag.trim().length < 1){
        stag = x.sigle;
      }
       opts2.push({id:x.id,text:stag});
    });
    return {
      etudAffectations:affs,
      etudiantsOptions: opts,
      page:1,
      semestres,
      semestresCount: nTotal,
      semestresOptions: opts2
    };
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
