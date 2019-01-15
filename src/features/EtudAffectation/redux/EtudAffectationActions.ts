import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from "../../../redux/InfoState";
import { EtudAffectationServices } from "./EtudAffectationServices";
//
export const CHANGE_ETUDAFFECTATION_FIELD = "CHANGE_ETUDAFFECTATION_FIELD";
export const changeEtudAffectationField = createAction(
  CHANGE_ETUDAFFECTATION_FIELD
);
//
export const CREATE_ETUDAFFECTATION_ITEM = "CREATE_ETUDAFFECTATION_ITEM";
export const createEtudAffectationAction = createAction(
  CREATE_ETUDAFFECTATION_ITEM
);
//
export const CANCEL_ETUDAFFECTATION_ITEM = "CANCEL_ETUDAFFECTATION_ITEM";
export const cancelEtudAffectationAction = createAction(
  CANCEL_ETUDAFFECTATION_ITEM
);
//
export const SELECT_ETUDAFFECTATION_ITEM = "SELECT_ETUDAFFECTATION_ITEM";
export const selectEtudAffectation = createAction(SELECT_ETUDAFFECTATION_ITEM);
//////////////////////////////////////////////////////////
export const SAVE_ETUDAFFECTATION_ITEM_BEGIN =
  "SAVE_ETUDAFFECTATION_ITEM_BEGIN";
const saveEtudAffectationBeginAction = createAction(
  SAVE_ETUDAFFECTATION_ITEM_BEGIN
);
export const SAVE_ETUDAFFECTATION_ITEM_SUCCESS =
  "SAVE_ETUDAFFECTATION_ITEM_SUCCESS";
const saveEtudAffectationSuccessAction = createAction(
  SAVE_ETUDAFFECTATION_ITEM_SUCCESS
);
export const SAVE_ETUDAFFECTATION_ITEM_FAIL = "SAVE_ETUDAFFECTATION_ITEM_FAIL";
const saveEtudAffectationFailAction = createAction(
  SAVE_ETUDAFFECTATION_ITEM_FAIL
);
//
export function saveEtudAffectation(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveEtudAffectationBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudAffectationServices.saveEtudAffectationAsync(
        getState()
      );
      doRequest.then(
        res => {
          dispatch(saveEtudAffectationSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveEtudAffectationFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveEtudAffectation
///////////////////////////////////////////////////////////////////////////////
export const REMOVE_ETUDAFFECTATION_ITEM_BEGIN =
  "REMOVE_ETUDAFFECTATION_ITEM_BEGIN";
const removeEtudAffectationBeginAction = createAction(
  REMOVE_ETUDAFFECTATION_ITEM_BEGIN
);
export const REMOVE_ETUDAFFECTATION_ITEM_SUCCESS =
  "REMOVE_ETUDAFFECTATION_ITEM_SUCCESS";
const removeEtudAffectationSuccessAction = createAction(
  REMOVE_ETUDAFFECTATION_ITEM_SUCCESS
);
export const REMOVE_ETUDAFFECTATION_ITEM_FAIL =
  "REMOVE_ETUDAFFECTATION_ITEM_FAIL";
const removeEtudAffectationFailAction = createAction(
  REMOVE_ETUDAFFECTATION_ITEM_FAIL
);
export function removeEtudAffectation(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeEtudAffectationBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudAffectationServices.removeEtudAffectationAsync(
        getState()
      );
      doRequest.then(
        res => {
          dispatch(removeEtudAffectationSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeEtudAffectationFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeEtudAffectation
///////////////////////////////////////////////////
export const ETUDAFFECTATION_SAVE_ATTACHMENT_BEGIN =
  "ETUDAFFECTATION_SAVE_ATTACHMENT_BEGIN";
const affectationSaveAttachmentBeginAction = createAction(
  ETUDAFFECTATION_SAVE_ATTACHMENT_BEGIN
);
export const ETUDAFFECTATION_SAVE_ATTACHMENT_SUCCESS =
  "ETUDAFFECTATION_SAVE_ATTACHMENT_SUCCESS";
const affectationSaveAttachmentSuccessAction = createAction(
  ETUDAFFECTATION_SAVE_ATTACHMENT_SUCCESS
);
export const ETUDAFFECTATION_SAVE_ATTACHMENT_FAIL =
  "ETUDAFFECTATION_SAVE_ATTACHMENT_FAIL";
const affectationSaveAttachmentFailAction = createAction(
  ETUDAFFECTATION_SAVE_ATTACHMENT_FAIL
);
export function saveEtudAffectationAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(affectationSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudAffectationServices.saveEtudAffectationAttachmentAsync(
        getState(),
        name,
        mime,
        data
      );
      doRequest.then(
        res => {
          dispatch(affectationSaveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(affectationSaveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveEtudAffectationAttachment
/////////////////////////////////////////////
export const ETUDAFFECTATION_REMOVE_ATTACHMENT_BEGIN =
  "ETUDAFFECTATION_REMOVE_ATTACHMENT_BEGIN";
const affectationRemoveAttachmentBeginAction = createAction(
  ETUDAFFECTATION_REMOVE_ATTACHMENT_BEGIN
);
export const ETUDAFFECTATION_REMOVE_ATTACHMENT_SUCCESS =
  "ETUDAFFECTATION_REMOVE_ATTACHMENT_SUCCESS";
const affectationRemoveAttachmentSuccessAction = createAction(
  ETUDAFFECTATION_REMOVE_ATTACHMENT_SUCCESS
);
export const ETUDAFFECTATION_REMOVE_ATTACHMENT_FAIL =
  "ETUDAFFECTATION_REMOVE_ATTACHMENT_FAIL";
const affectationRemoveAttachmentFailAction = createAction(
  ETUDAFFECTATION_REMOVE_ATTACHMENT_FAIL
);
export function removeEtudAffectationAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(affectationRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudAffectationServices.removeEtudAffectationAttachmentAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(affectationRemoveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(affectationRemoveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeEtudAffectationAttachment
/////////////////////////////
export const GOTO_PAGE_ETUDAFFECTATION_BEGIN =
  "GOTO_PAGE_ETUDAFFECTATION_BEGIN";
const gotoPageEtudAffectationBeginAction = createAction(
  GOTO_PAGE_ETUDAFFECTATION_BEGIN
);
export const GOTO_PAGE_ETUDAFFECTATION_SUCCESS =
  "GOTO_PAGE_ETUDAFFECTATION_SUCCESS";
const gotoPageEtudAffectationSuccessAction = createAction(
  GOTO_PAGE_ETUDAFFECTATION_SUCCESS
);
export const GOTO_PAGE_ETUDAFFECTATION_FAIL = "GOTO_PAGE_ETUDAFFECTATION_FAIL";
const gotoPageEtudAffectationFailAction = createAction(
  GOTO_PAGE_ETUDAFFECTATION_FAIL
);
export function gotoPageEtudAffectation(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageEtudAffectationBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudAffectationServices.gotoPageEtudAffectationAsync(
        getState(),
        page
      );
      doRequest.then(
        res => {
          dispatch(gotoPageEtudAffectationSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(gotoPageEtudAffectationFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeEtudAffectationAttachment
//////////////////////////////
