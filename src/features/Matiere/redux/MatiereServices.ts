import { IMatiereDoc } from "../../../data/DomainData";
import { BaseServices } from "../../../redux/BaseServices";
import { IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";
import { GetInitialMatiere } from '../../../redux/StateProcs';

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
    return this.refreshMatieresAsync(state);
  } // saveMatiereAsync

  public static async removeMatiereAsync(state: IInfoState): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const id = state.matieres.current.id;
    await pMan.removeMatiereAsync(id);
    return this.refreshMatieresAsync(state);
  } // removeMatiereAsync
  public static refreshMatieresAsync(state: IInfoState): Promise<IPayload> {
    return this.gotoPageMatiereAsync(state, state.matieres.currentPage);
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
