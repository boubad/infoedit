import { IMatiereDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';
import { GetInitialMatiere } from '../../../data/state/stores/StateProcs';
import { IOption } from './../../../data/domain/DomainData.d';

//
export class MatiereServices {
  public static createMatiere(state: IInfoState): IPayload {
    return { matiere: GetInitialMatiere(state) };
  } // createGroupe
  public static async selectMatiereAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const sid = id.trim();
    if (sid.length < 1) {
      return { matiere: GetInitialMatiere(state) };
    }
    let px = state.matieres.pageData.find(x => {
      return x.id === sid;
    });
    if (px === undefined) {
      const pMan = BaseServices.getPersistManager(state);
      px = await pMan.fetchMatiereByIdAsync(sid);
    }
    return { matiere: px };
  } // selectMatiereAsync
  //
  public static async saveMatiereAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const p = state.matieres.current;
    await pMan.saveMatiereAsync(p);
    return MatiereServices.refreshMatieresAsync(state);
  } // saveMatiereAsync

  public static async removeMatiereAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.matieres.current.id;
    await pMan.removeMatiereAsync(id);
    return MatiereServices.refreshMatieresAsync(state);
  } // removeMatiereAsync
  public static async refreshMatieresAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getMatieresCountAsync();
    const matieres = await pMan.getMatieresAsync(
      undefined,0,nTotal);
     const vv:IOption[] = [];
     matieres.forEach((x) =>{
       let s = x.tag;
       if (s.trim().length < 1) {
         s = x.sigle;
       }
      vv.push({id:x.id,text:s,url:x.uniteid});
     }); 
    return {
      matieres,
      matieresCount: nTotal,
      matieresOptions: vv,
      page:1
    };
  } // RefreshControles
  public static async gotoPageMatiereAsync(
    state: IInfoState,
    page: number
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const nTotal = await pMan.getMatieresCountAsync(state.appstate.uniteid);
    if (page < 1) {
      page = 1;
    }
    const count = state.matieres.pageSize;
    let offset = (page - 1) * count;
    if (offset + count > nTotal) {
      offset = nTotal - count;
      if (offset < 0) {
        offset = 0;
      }
    }
    const matieres = await pMan.getMatieresAsync(
      state.appstate.uniteid,
      offset,
      count
    );
    return {
      matieres,
      matieresCount: nTotal,
      matieresOptions: await pMan.getAnneesOptionsAsync(),
      page
    };
  } // gotoPageControle
  //
  public static async saveMatiereAttachmentAsync(
    state: IInfoState,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.matieres.current.id;
    await pMan.saveAttachmentAsync(id, name, mime, data);
    const pz = await pMan.loadMatiereByIdAsync(id);
    const bb: IMatiereDoc[] = [];
    const pp = state.matieres.pageData;
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
      matiere: pz,
      matieres: bb
    };
  } // saveMatiereAttachment
  //
  public static async removeMatiereAttachmentAsync(
    state: IInfoState,
    name: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.matieres.current.id;
    await pMan.removeAttachmentAsync(id, name);
    const pz = await pMan.loadMatiereByIdAsync(id);
    const bb: IMatiereDoc[] = [];
    const pp = state.matieres.pageData;
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
      matiere: pz,
      matieres: bb
    };
  } // removeMatiereAttachmentAsync
} // class MatiereServices
