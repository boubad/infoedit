import { BaseServices } from "../../../redux/BaseServices";
import { IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";

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
