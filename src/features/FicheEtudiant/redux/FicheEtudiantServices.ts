import { IInfoState } from '../../../data/state/InfoState';
import { IPayload } from '../../../data/state/IPayload';
import { BaseServices } from '../../../data/state/services/BaseServices';

export class FicheEtudiantServices {
  public static async showEtudiantAsync(
    state: IInfoState,
    id: string
  ): Promise<IPayload> {
    let pEtud = state.etudiants.pageData.find((x) =>{
      return (x.id === id);
    });
    if (pEtud && pEtud.loaded){
      return { ficheEtudiant: pEtud };
    }
    const pMan = BaseServices.getPersistManager(state);
    pEtud = await pMan.loadEtudiantByIdAsync(id);
    pEtud.evts = await pMan.getEtudiantEvtsAsync(id);
    pEtud.notes = await pMan.getEtudiantNotesAsync(id);
    pEtud.affectations = await pMan.getEtudiantAffectationsAsync(id);
    pEtud.loaded = true;
    return { ficheEtudiant: pEtud };
  } // showEtudiantAsync
}
