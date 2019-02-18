import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';

export class FicheControleServices {
  public static async showControleAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    let pCont = state.controles.pageData.find((x) => {
      return (x.id === id);
    });
    if (pCont && pCont.loaded){
      return { ficheControle: pCont };
    }
    const pMan = BaseServices.getPersistManager(state);
    pCont = await pMan.loadControleByIdAsync(id);
    pCont.evts = await pMan.getControleEvtsAsync(id);
    pCont.notes = await pMan.getControleNotesAsync(id);
    pCont.loaded = true;
    return { ficheControle: pCont };
  } // showEtudiantAsync
}
