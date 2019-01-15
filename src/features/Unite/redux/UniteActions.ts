import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from '../../../redux/InfoState';
import { UniteServices } from "./UniteServices";
//
export const CHANGE_UNITE_FIELD = "CHANGE_UNITE_FIELD";
export const changeUniteField = createAction(CHANGE_UNITE_FIELD);
//
export const CREATE_UNITE_ITEM = "CREATE_UNITE_ITEM";
export const createUniteAction = createAction(CREATE_UNITE_ITEM);
//
export const CANCEL_UNITE_ITEM = "CANCEL_UNITE_ITEM";
export const cancelUniteAction = createAction(CANCEL_UNITE_ITEM);
//
export const SELECT_UNITE_ITEM = "SELECT_UNITE_ITEM";
export const selectUnite = createAction(SELECT_UNITE_ITEM);
///////////////////////////////////////////////////
export const SAVE_UNITE_ITEM_BEGIN = "SAVE_UNITE_ITEM_BEGIN";
const saveUniteBeginAction = createAction(SAVE_UNITE_ITEM_BEGIN);
export const SAVE_UNITE_ITEM_SUCCESS = "SAVE_UNITE_ITEM_SUCCESS";
const saveUniteSuccessAction = createAction(SAVE_UNITE_ITEM_SUCCESS);
export const SAVE_UNITE_ITEM_FAIL = "SAVE_UNITE_ITEM_FAIL";
const saveUniteFailAction = createAction(SAVE_UNITE_ITEM_FAIL);
//
export function saveUnite(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveUniteBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = UniteServices.saveUniteAsync(getState());
      doRequest.then(
        res => {
            dispatch(saveUniteSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(saveUniteFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveUnite
////////////////////////////////////////////////////////////////////////
export const REMOVE_UNITE_ITEM_BEGIN = "REMOVE_UNITE_ITEM_BEGIN";
const removeUniteBeginAction = createAction(REMOVE_UNITE_ITEM_BEGIN);
export const REMOVE_UNITE_ITEM_SUCCESS = "REMOVE_UNITE_ITEM_SUCCESS";
const removeUniteSuccessAction = createAction(REMOVE_UNITE_ITEM_SUCCESS);
export const REMOVE_UNITE_ITEM_FAIL = "REMOVE_UNITE_ITEM_FAIL";
const removeUniteFailAction = createAction(REMOVE_UNITE_ITEM_FAIL);
//
export function removeUnite(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeUniteBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = UniteServices.removeUniteAsync(getState());
      doRequest.then(
        res => {
         
            dispatch(removeUniteSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(removeUniteFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeUnite
////////////////////////////////////////////////////////////////////////////
export const UNITE_SAVE_ATTACHMENT_BEGIN = "UNITE_SAVE_ATTACHMENT_BEGIN";
const anneeSaveAttachmentBeginAction = createAction(
  UNITE_SAVE_ATTACHMENT_BEGIN
);
export const UNITE_SAVE_ATTACHMENT_SUCCESS = "UNITE_SAVE_ATTACHMENT_SUCCESS";
const anneeSaveAttachmentSuccessAction = createAction(
  UNITE_SAVE_ATTACHMENT_SUCCESS
);
export const UNITE_SAVE_ATTACHMENT_FAIL = "UNITE_SAVE_ATTACHMENT_FAIL";
const anneeSaveAttachmentFailAction = createAction(UNITE_SAVE_ATTACHMENT_FAIL);
//
export function saveUniteAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(anneeSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = UniteServices.saveUniteAttachmentAsync(
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
} // saveUniteAttachment
/////////////////////////////////////////////
export const UNITE_REMOVE_ATTACHMENT_BEGIN = "UNITE_REMOVE_ATTACHMENT_BEGIN";
const anneeRemoveAttachmentBeginAction = createAction(
  UNITE_REMOVE_ATTACHMENT_BEGIN
);
export const UNITE_REMOVE_ATTACHMENT_SUCCESS =
  "UNITE_REMOVE_ATTACHMENT_SUCCESS";
const anneeRemoveAttachmentSuccessAction = createAction(
  UNITE_REMOVE_ATTACHMENT_SUCCESS
);
export const UNITE_REMOVE_ATTACHMENT_FAIL = "UNITE_REMOVE_ATTACHMENT_FAIL";
const anneeRemoveAttachmentFailAction = createAction(
  UNITE_REMOVE_ATTACHMENT_FAIL
);
export function removeUniteAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(anneeRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = UniteServices.removeUniteAttachmentAsync(
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
} // removeUniteAttachment
/////////////////////////////
export const GOTO_PAGE_UNITE_BEGIN = "GOTO_PAGE_UNITE_BEGIN";
const gotoPageUniteBeginAction = createAction(GOTO_PAGE_UNITE_BEGIN);
export const GOTO_PAGE_UNITE_SUCCESS = "GOTO_PAGE_UNITE_SUCCESS";
const gotoPageUniteSuccessAction = createAction(GOTO_PAGE_UNITE_SUCCESS);
export const GOTO_PAGE_UNITE_FAIL = "GOTO_PAGE_UNITE_FAIL";
const gotoPageUniteFailAction = createAction(GOTO_PAGE_UNITE_FAIL);
//
export function gotoPageUnite(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageUniteBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = UniteServices.gotoPageUniteAsync(getState(), page);
      doRequest.then(
        res => {
            dispatch(gotoPageUniteSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(gotoPageUniteFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageUnite
//////////////////////////////
export const REFRESH_UNITE_BEGIN = "REFRESH_UNITE_BEGIN";
const refreshUniteBeginAction = createAction(REFRESH_UNITE_BEGIN);
export const REFRESH_UNITE_SUCCESS = "REFRESH_UNITE_SUCCESS";
const refreshUniteSuccessAction = createAction(REFRESH_UNITE_SUCCESS);
export const REFRESH_UNITE_FAIL = "REFRESH_UNITE_FAIL";
const refreshUniteFailAction = createAction(REFRESH_UNITE_FAIL);
//
export function refreshUnites(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(refreshUniteBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = UniteServices.RefreshUnitesAsync(getState());
      doRequest.then(
        res => {
            dispatch(refreshUniteSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(refreshUniteFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageUnite
//////////////////////////////
