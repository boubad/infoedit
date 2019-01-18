import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from "src/redux/InfoState";
import { OutilsServices } from "./OutilsServices";
/////////////////////////////////////////////////////
export const SYNC_DATA_BEGIN = "SYNC_DATA_BEGIN";
const syncDataBeginAction = createAction(SYNC_DATA_BEGIN);
export const SYNC_DATA_SUCCESS = "SYNC_DATA_SUCCESS";
const syncDataSuccessAction = createAction(SYNC_DATA_SUCCESS);
export const SYNC_DATA_FAIL = "SYNC_DATA_FAIL";
const syncDataFailAction = createAction(SYNC_DATA_FAIL);
//
export function syncData(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(syncDataBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = OutilsServices.syncDataAsync(
        getState()
      );
      doRequest.then(
        res => {
          dispatch(syncDataSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(syncDataFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // syncData
///////////////////////////////////////////////
export const REFRESHANNEESEMESTRE_STATUS_BEGIN =
  "REFRESHANNEESEMESTRE_STATUS_BEGIN";
const refreshAnneeSemestreStatusBeginAction = createAction(
  REFRESHANNEESEMESTRE_STATUS_BEGIN
);
export const REFRESHANNEESEMESTRE_STATUS_SUCCESS =
  "REFRESHANNEESEMESTRE_STATUS_SUCCESS";
const refreshAnneeSemestreStatusSuccessAction = createAction(
  REFRESHANNEESEMESTRE_STATUS_SUCCESS
);
export const REFRESHANNEESEMESTRE_STATUS_FAIL =
  "REFRESHANNEESEMESTRE_STATUS_FAIL";
const refreshAnneeSemestreStatusFailAction = createAction(
  REFRESHANNEESEMESTRE_STATUS_FAIL
);
//
export function refreshAnneeSemestreEtudiantsStatus(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(refreshAnneeSemestreStatusBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = OutilsServices.refreshAnneeSemestreEtudiantsStatus(
        getState()
      );
      doRequest.then(
        res => {
          dispatch(refreshAnneeSemestreStatusSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(refreshAnneeSemestreStatusFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // refreshAnneeSemestreEtudiantsStatus
////////////////////////////////////////////
export const CHANGEANNEESEMESTRE_STATUS_BEGIN =
  "CHANGEANNEESEMESTRE_STATUS_BEGIN";
const changeAnneeSemestreStatusBeginAction = createAction(
  CHANGEANNEESEMESTRE_STATUS_BEGIN
);
export const CHANGEANNEESEMESTRE_STATUS_SUCCESS =
  "CHANGEANNEESEMESTRE_STATUS_SUCCESS";
const changeAnneeSemestreStatusSuccessAction = createAction(
  CHANGEANNEESEMESTRE_STATUS_SUCCESS
);
export const CHANGEANNEESEMESTRE_STATUS_FAIL =
  "CHANGEANNEESEMESTRE_STATUS_FAIL";
const changeAnneeSemestreStatusFailAction = createAction(
  CHANGEANNEESEMESTRE_STATUS_FAIL
);
//
export function changeAnneeSemestreEtudiantsStatus(status: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(changeAnneeSemestreStatusBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = OutilsServices.changeAnneeSemestreEtudiantsStatus(
        getState(),
        status
      );
      doRequest.then(
        res => {
          dispatch(changeAnneeSemestreStatusSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(changeAnneeSemestreStatusFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // importEtudiants
///////////////////////////////////////
export const IMPORT_ETUDIANT_BEGIN = "IMPORT_ETUDIANT_BEGIN";
const importEtudiantBeginAction = createAction(IMPORT_ETUDIANT_BEGIN);
export const IMPORT_ETUDIANT_SUCCESS = "IMPORT_ETUDIANT_SUCCESS";
const importEtudiantSuccessAction = createAction(IMPORT_ETUDIANT_SUCCESS);
export const IMPORT_ETUDIANT_FAIL = "IMPORT_ETUDIANT_FAIL";
const importEtudiantFailAction = createAction(IMPORT_ETUDIANT_FAIL);
//
export function importEtudiants(data: any[]): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(importEtudiantBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = OutilsServices.importEtudiantsAsync(getState(), data);
      doRequest.then(
        res => {
          dispatch(importEtudiantSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(importEtudiantFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // importEtudiants
///////////////////////////////////////////////////
