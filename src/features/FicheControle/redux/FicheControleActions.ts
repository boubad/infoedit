import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from "../../../redux/InfoState";
import { FicheControleServices } from "./FicheControleServices";
///////////////////////////////
export const SHOW_CONTROLE_BEGIN = "SHOW_CONTROLE_BEGIN";
const showControleBeginAction = createAction(SHOW_CONTROLE_BEGIN);
export const SHOW_CONTROLE = "SHOW_CONTROLE";
const showControleSuccessAction = createAction(SHOW_CONTROLE);
export const SHOW_CONTROLE_FAIL = "SHOW_CONTROLE_FAIL";
const showControleFailAction = createAction(SHOW_CONTROLE_FAIL);
//
export function showControle(id: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(showControleBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = FicheControleServices.showControleAsync(getState(), id);
      doRequest.then(
        res => {
          dispatch(showControleSuccessAction(res));
          dispatch(push("/controle"));
          resolve(res);
        },
        err => {
          dispatch(showControleFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // showControle
/////////////////////////////
