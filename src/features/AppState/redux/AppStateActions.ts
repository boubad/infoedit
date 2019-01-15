import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from '../../../redux/InfoState';
import { AppStateServices } from './AppStateServices';
/////////////////////////////////////
//
export const CHANGE_UNITE_BEGIN = "CHANGE_UNITE_BEGIN";
const changeUniteBeginAction = createAction(CHANGE_UNITE_BEGIN);
export const CHANGE_UNITE_SUCCESS = "CHANGE_UNITE_SUCCESS";
const changeUniteSuccessAction = createAction(CHANGE_UNITE_SUCCESS);
export const CHANGE_UNITE_FAIL = "CHANGE_UNITE_FAIL";
const changeUniteFailAction = createAction(CHANGE_UNITE_FAIL);
//
export function changeUnite(annee: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(changeUniteBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AppStateServices.changeUniteAsync(getState(), annee);
      doRequest.then(
        res => {
            dispatch(changeUniteSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(changeUniteFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveUnite
/////////////////////////////////////
//
export const CHANGE_SEMESTRE_BEGIN = "CHANGE_SEMESTRE_BEGIN";
const changeSemestreBeginAction = createAction(CHANGE_SEMESTRE_BEGIN);
export const CHANGE_SEMESTRE_SUCCESS = "CHANGE_SEMESTRE_SUCCESS";
const changeSemestreSuccessAction = createAction(CHANGE_SEMESTRE_SUCCESS);
export const CHANGE_SEMESTRE_FAIL = "CHANGE_SEMESTRE_FAIL";
const changeSemestreFailAction = createAction(CHANGE_SEMESTRE_FAIL);
//
export function changeSemestre(annee: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(changeSemestreBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AppStateServices.changeSemestreAsync(getState(), annee);
      doRequest.then(
        res => {
            dispatch(changeSemestreSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(changeSemestreFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // selectSemestre
////////////////////////////////////
//
export const CHANGE_MATIERE_BEGIN = "CHANGE_MATIERE_BEGIN";
const changeMatiereBeginAction = createAction(CHANGE_MATIERE_BEGIN);
export const CHANGE_MATIERE_SUCCESS = "CHANGE_MATIERE_SUCCESS";
const changeMatiereSuccessAction = createAction(CHANGE_MATIERE_SUCCESS);
export const CHANGE_MATIERE_FAIL = "CHANGE_MATIERE_FAIL";
const changeMatiereFailAction = createAction(CHANGE_MATIERE_FAIL);
//
export function changeMatiere(matiere: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(changeMatiereBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AppStateServices.changeMatiereAsync(getState(), matiere);
      doRequest.then(
        res => {
            dispatch(changeMatiereSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(changeMatiereFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // selectiere
////////////////////////////////////
//
export const CHANGE_GROUPE_BEGIN = "CHANGE_GROUPE_BEGIN";
const changeGroupeBeginAction = createAction(CHANGE_GROUPE_BEGIN);
export const CHANGE_GROUPE_SUCCESS = "CHANGE_GROUPE_SUCCESS";
const changeGroupeSuccessAction = createAction(CHANGE_GROUPE_SUCCESS);
export const CHANGE_GROUPE_FAIL = "CHANGE_GROUPE_FAIL";
const changeGroupeFailAction = createAction(CHANGE_GROUPE_FAIL);
//
export function changeGroupe(groupe: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(changeGroupeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AppStateServices.changeGroupeAsync(getState(), groupe);
      doRequest.then(
        res => {
            dispatch(changeGroupeSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(changeGroupeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // changeGroupe
//////////////////////////////////////////////////////
//
export const CHANGE_ANNEE_BEGIN = "CHANGE_ANNEE_BEGIN";
const changeAnneeBeginAction = createAction(CHANGE_ANNEE_BEGIN);
export const CHANGE_ANNEE_SUCCESS = "CHANGE_ANNEE_SUCCESS";
const changeAnneeSuccessAction = createAction(CHANGE_ANNEE_SUCCESS);
export const CHANGE_ANNEE_FAIL = "CHANGE_ANNEE_FAIL";
const changeAnneeFailAction = createAction(CHANGE_ANNEE_FAIL);
//
export function changeAnnee(id: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(changeAnneeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AppStateServices.changeAnneeAsync(getState(), id);
      doRequest.then(
        res => {
          dispatch(changeAnneeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(changeAnneeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveAnnee
///////////////////////////////////////////////////////////////
export const REFRESH_ALL_BEGIN = "REFRESH_ALL_BEGIN";
const refreshAllBeginAction = createAction(REFRESH_ALL_BEGIN);
export const REFRESH_ALL_SUCCESS = "REFRESH_ALL_SUCCESS";
const refreshAllSuccessAction = createAction(REFRESH_ALL_SUCCESS);
export const REFRESH_ALL_FAIL = "REFRESH_ALL_FAIL";
const refreshAllFailAction = createAction(REFRESH_ALL_FAIL);
//
export function refreshAll() : any {
  return (dispatch: Dispatch, getState:()=>IInfoState) => {
    dispatch(refreshAllBeginAction());
    const promise = new Promise((resolve, reject) => {
        const doRequest = AppStateServices.refreshAllAsync(getState());
        doRequest.then(
          (res) => {
            dispatch(refreshAllSuccessAction(res));
            resolve(res);
          },
          (err) => {
            dispatch(refreshAllFailAction(err));
            reject(err);
          },
        );
      });
      return promise;
  };
} // refreshAsync
//////////////////////////////////////////
