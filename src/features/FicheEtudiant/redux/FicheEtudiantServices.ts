import { BaseServices } from "../../../redux/BaseServices";
import { IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";

export class FicheEtudiantServices {
  public static async showEtudiantAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    const pMan = BaseServices.getPersistManager(state);
    const pEtud = await pMan.loadEtudiantByIdAsync(id);
    pEtud.evts = await pMan.getEtudiantEvtsAsync(id);
    pEtud.notes = await pMan.getEtudiantNotesAsync(id);
    pEtud.affectations = await pMan.getEtudiantAffectationsAsync(id);
    pEtud.loaded = true;
    return { ficheEtudiant: pEtud };
  } // showEtudiantAsync
}
