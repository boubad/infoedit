import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from '../../../redux/InfoState';
import { AnneeServices } from './AnneeServices';
//
export const CHANGE_ANNEE_FIELD = "CHANGE_ANNEE_FIELD";
export const changeAnneeField = createAction(CHANGE_ANNEE_FIELD);
//
export const CREATE_ANNEE_ITEM = "CREATE_ANNEE_ITEM";
const createAnneeAction = createAction(CREATE_ANNEE_ITEM);
export function createAnnee(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    const state = getState();
    dispatch(
      createAnneeAction({ annee: AnneeServices.createAnnee(state) })
    );
  };
} // createAnnee
//
export const CANCEL_ANNEE_ITEM = "CANCEL_ANNEE_ITEM";
export const cancelAnneeAction = createAction(CANCEL_ANNEE_ITEM);
//
export const SELECT_ANNEE_ITEM_BEGIN = "SELECT_ANNEE_ITEM_BEGIN";
const selectAnneeBeginAction = createAction(SELECT_ANNEE_ITEM_BEGIN);
export const SELECT_ANNEE_ITEM = "SELECT_ANNEE_ITEM";
export const selectAnneeSuccessAction = createAction(SELECT_ANNEE_ITEM);
export const SELECT_ANNEE_ITEM_FAIL = "SELECT_ANNEE_ITEM_FAIL";
const selectAnneeFailAction = createAction(SELECT_ANNEE_ITEM_FAIL);
//
export function selectAnnee(id:string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectAnneeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AnneeServices.selectAnneeAsync(getState(),id);
      doRequest.then(
        res => {
          dispatch(selectAnneeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectAnneeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // selectAnnee
///////////////////////////////////////////////////
export const SAVE_ANNEE_ITEM_BEGIN = "SAVE_ANNEE_ITEM_BEGIN";
const saveAnneeBeginAction = createAction(SAVE_ANNEE_ITEM_BEGIN);
export const SAVE_ANNEE_ITEM_SUCCESS = "SAVE_ANNEE_ITEM_SUCCESS";
const saveAnneeSuccessAction = createAction(SAVE_ANNEE_ITEM_SUCCESS);
export const SAVE_ANNEE_ITEM_FAIL = "SAVE_ANNEE_ITEM_FAIL";
const saveAnneeFailAction = createAction(SAVE_ANNEE_ITEM_FAIL);
//
export function saveAnnee(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveAnneeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AnneeServices.saveAnneeAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveAnneeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveAnneeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveAnnee
////////////////////////////////////////////////////////////////////////
export const REMOVE_ANNEE_ITEM_BEGIN = "REMOVE_ANNEE_ITEM_BEGIN";
const removeAnneeBeginAction = createAction(REMOVE_ANNEE_ITEM_BEGIN);
export const REMOVE_ANNEE_ITEM_SUCCESS = "REMOVE_ANNEE_ITEM_SUCCESS";
const removeAnneeSuccessAction = createAction(REMOVE_ANNEE_ITEM_SUCCESS);
export const REMOVE_ANNEE_ITEM_FAIL = "REMOVE_ANNEE_ITEM_FAIL";
const removeAnneeFailAction = createAction(REMOVE_ANNEE_ITEM_FAIL);
//
export function removeAnnee(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeAnneeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AnneeServices.removeAnneeAsync(getState());
      doRequest.then(
        res => {
          dispatch(removeAnneeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeAnneeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeAnnee
////////////////////////////////////////////////////////////////////////////
export const ANNEE_SAVE_ATTACHMENT_BEGIN = "ANNEE_SAVE_ATTACHMENT_BEGIN";
const anneeSaveAttachmentBeginAction = createAction(
  ANNEE_SAVE_ATTACHMENT_BEGIN
);
export const ANNEE_SAVE_ATTACHMENT_SUCCESS = "ANNEE_SAVE_ATTACHMENT_SUCCESS";
const anneeSaveAttachmentSuccessAction = createAction(
  ANNEE_SAVE_ATTACHMENT_SUCCESS
);
export const ANNEE_SAVE_ATTACHMENT_FAIL = "ANNEE_SAVE_ATTACHMENT_FAIL";
const anneeSaveAttachmentFailAction = createAction(ANNEE_SAVE_ATTACHMENT_FAIL);
//
export function saveAnneeAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(anneeSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AnneeServices.saveAnneeAttachmentAsync(
        getState(),
        name,
        mime,
        data
      );
      doRequest.then(
        res => {
          dispatch(anneeSaveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(anneeSaveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveAnneeAttachment
/////////////////////////////////////////////
export const ANNEE_REMOVE_ATTACHMENT_BEGIN = "ANNEE_REMOVE_ATTACHMENT_BEGIN";
const anneeRemoveAttachmentBeginAction = createAction(
  ANNEE_REMOVE_ATTACHMENT_BEGIN
);
export const ANNEE_REMOVE_ATTACHMENT_SUCCESS =
  "ANNEE_REMOVE_ATTACHMENT_SUCCESS";
const anneeRemoveAttachmentSuccessAction = createAction(
  ANNEE_REMOVE_ATTACHMENT_SUCCESS
);
export const ANNEE_REMOVE_ATTACHMENT_FAIL = "ANNEE_REMOVE_ATTACHMENT_FAIL";
const anneeRemoveAttachmentFailAction = createAction(
  ANNEE_REMOVE_ATTACHMENT_FAIL
);
export function removeAnneeAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(anneeRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AnneeServices.removeAnneeAttachmentAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(anneeRemoveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(anneeRemoveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeAnneeAttachment
/////////////////////////////
export const GOTO_PAGE_ANNEE_BEGIN = "GOTO_PAGE_ANNEE_BEGIN";
const gotoPageAnneeBeginAction = createAction(GOTO_PAGE_ANNEE_BEGIN);
export const GOTO_PAGE_ANNEE_SUCCESS = "GOTO_PAGE_ANNEE_SUCCESS";
const gotoPageAnneeSuccessAction = createAction(GOTO_PAGE_ANNEE_SUCCESS);
export const GOTO_PAGE_ANNEE_FAIL = "GOTO_PAGE_ANNEE_FAIL";
const gotoPageAnneeFailAction = createAction(GOTO_PAGE_ANNEE_FAIL);
//
export function gotoPageAnnee(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageAnneeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AnneeServices.gotoPageAnneeAsync(getState(), page);
      doRequest.then(
        res => {
          dispatch(gotoPageAnneeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(gotoPageAnneeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageAnnee
//////////////////////////////
export const REFRESH_ANNEE_BEGIN = "REFRESH_ANNEE_BEGIN";
const refreshAnneeBeginAction = createAction(REFRESH_ANNEE_BEGIN);
export const REFRESH_ANNEE_SUCCESS = "REFRESH_ANNEE_SUCCESS";
const refreshAnneeSuccessAction = createAction(REFRESH_ANNEE_SUCCESS);
export const REFRESH_ANNEE_FAIL = "REFRESH_ANNEE_FAIL";
const refreshAnneeFailAction = createAction(REFRESH_ANNEE_FAIL);
//
export function refreshAnnees(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(refreshAnneeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AnneeServices.refreshAnneesAsync(getState());
      doRequest.then(
        res => {
          dispatch(refreshAnneeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(refreshAnneeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // refreshAnnees
//////////////////////////////
