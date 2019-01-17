import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from "../../../redux/InfoState";
import { FicheEtudiantServices } from "./FicheEtudiantServices";
///////////////////////////////
export const SHOW_ETUDIANT_BEGIN = "SHOW_ETUDIANT_BEGIN";
const showEtudiantBeginAction = createAction(SHOW_ETUDIANT_BEGIN);
export const SHOW_ETUDIANT = "SHOW_ETUDIANT";
const showEtudiantSuccessAction = createAction(SHOW_ETUDIANT);
export const SHOW_ETUDIANT_FAIL = "SHOW_ETUDIANT_FAIL";
const showEtudiantFailAction = createAction(SHOW_ETUDIANT_FAIL);
//
export function showEtudiant(id: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(showEtudiantBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = FicheEtudiantServices.showEtudiantAsync(getState(), id);
      doRequest.then(
        res => {
          dispatch(showEtudiantSuccessAction(res));
          dispatch(push("/etuddetail"));
          resolve(res);
        },
        err => {
          dispatch(showEtudiantFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // showEtudiant
/////////////////////////////
