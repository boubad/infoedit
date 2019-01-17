import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { GetInitialAffectation } from "src/redux/StateProcs";
import { IInfoState } from "../../../redux/InfoState";
import { AffectationServices } from "./AffectationServices";
//
export const CHANGE_AFFECTATION_FIELD = "CHANGE_AFFECTATION_FIELD";
export const changeAffectationField = createAction(CHANGE_AFFECTATION_FIELD);
//

export const CREATE_AFFECTATION_ITEM = "CREATE_AFFECTATION_ITEM";
const createAffectationAction = createAction(CREATE_AFFECTATION_ITEM);
export function createAffectation(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    const state = getState();
    dispatch(
      createAffectationAction({ affectation: GetInitialAffectation(state) })
    );
  };
} // createAffectation
//
export const CANCEL_AFFECTATION_ITEM = "CANCEL_AFFECTATION_ITEM";
export const cancelAffectationAction = createAction(CANCEL_AFFECTATION_ITEM);
//
export const SELECT_AFFECTATION_ITEM_BEGIN = "SELECT_AFFECTATION_ITEM_BEGIN";
const selectAffectationBeginAction = createAction(SELECT_AFFECTATION_ITEM_BEGIN);
export const SELECT_AFFECTATION_ITEM = "SELECT_AFFECTATION_ITEM";
const selectAffectationSuccessAction = createAction(SELECT_AFFECTATION_ITEM);
export const SELECT_AFFECTATION_ITEM_FAIL = "SELECT_AFFECTATION_ITEM_FAIL";
const selectAffectationFailAction = createAction(SELECT_AFFECTATION_ITEM_FAIL);
export function selectAffectation(id:string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectAffectationBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AffectationServices.selectAffectationAsync(getState(),id);
      doRequest.then(
        res => {
          dispatch(selectAffectationSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectAffectationFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // selectAffectation
//////////////////////////////////////////////////////////
export const SAVE_AFFECTATION_ITEM_BEGIN = "SAVE_AFFECTATION_ITEM_BEGIN";
const saveAffectationBeginAction = createAction(SAVE_AFFECTATION_ITEM_BEGIN);
export const SAVE_AFFECTATION_ITEM_SUCCESS = "SAVE_AFFECTATION_ITEM_SUCCESS";
const saveAffectationSuccessAction = createAction(
  SAVE_AFFECTATION_ITEM_SUCCESS
);
export const SAVE_AFFECTATION_ITEM_FAIL = "SAVE_AFFECTATION_ITEM_FAIL";
const saveAffectationFailAction = createAction(SAVE_AFFECTATION_ITEM_FAIL);
//
export function saveAffectation(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveAffectationBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AffectationServices.saveAffectationAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveAffectationSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveAffectationFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveAffectation
///////////////////////////////////////////////////////////////////////////////
export const REMOVE_AFFECTATION_ITEM_BEGIN = "REMOVE_AFFECTATION_ITEM_BEGIN";
const removeAffectationBeginAction = createAction(
  REMOVE_AFFECTATION_ITEM_BEGIN
);
export const REMOVE_AFFECTATION_ITEM_SUCCESS =
  "REMOVE_AFFECTATION_ITEM_SUCCESS";
const removeAffectationSuccessAction = createAction(
  REMOVE_AFFECTATION_ITEM_SUCCESS
);
export const REMOVE_AFFECTATION_ITEM_FAIL = "REMOVE_AFFECTATION_ITEM_FAIL";
const removeAffectationFailAction = createAction(REMOVE_AFFECTATION_ITEM_FAIL);
export function removeAffectation(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeAffectationBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AffectationServices.removeAffectationAsync(getState());
      doRequest.then(
        res => {
          dispatch(removeAffectationSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeAffectationFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeAffectation
///////////////////////////////////////////////////
export const AFFECTATION_SAVE_ATTACHMENT_BEGIN =
  "AFFECTATION_SAVE_ATTACHMENT_BEGIN";
const affectationSaveAttachmentBeginAction = createAction(
  AFFECTATION_SAVE_ATTACHMENT_BEGIN
);
export const AFFECTATION_SAVE_ATTACHMENT_SUCCESS =
  "AFFECTATION_SAVE_ATTACHMENT_SUCCESS";
const affectationSaveAttachmentSuccessAction = createAction(
  AFFECTATION_SAVE_ATTACHMENT_SUCCESS
);
export const AFFECTATION_SAVE_ATTACHMENT_FAIL =
  "AFFECTATION_SAVE_ATTACHMENT_FAIL";
const affectationSaveAttachmentFailAction = createAction(
  AFFECTATION_SAVE_ATTACHMENT_FAIL
);
export function saveAffectationAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(affectationSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AffectationServices.saveAffectationAttachmentAsync(
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
} // saveAffectationAttachment
/////////////////////////////////////////////
export const AFFECTATION_REMOVE_ATTACHMENT_BEGIN =
  "AFFECTATION_REMOVE_ATTACHMENT_BEGIN";
const affectationRemoveAttachmentBeginAction = createAction(
  AFFECTATION_REMOVE_ATTACHMENT_BEGIN
);
export const AFFECTATION_REMOVE_ATTACHMENT_SUCCESS =
  "AFFECTATION_REMOVE_ATTACHMENT_SUCCESS";
const affectationRemoveAttachmentSuccessAction = createAction(
  AFFECTATION_REMOVE_ATTACHMENT_SUCCESS
);
export const AFFECTATION_REMOVE_ATTACHMENT_FAIL =
  "AFFECTATION_REMOVE_ATTACHMENT_FAIL";
const affectationRemoveAttachmentFailAction = createAction(
  AFFECTATION_REMOVE_ATTACHMENT_FAIL
);
export function removeAffectationAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(affectationRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AffectationServices.removeAffectationAttachmentAsync(
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
} // removeAffectationAttachment
/////////////////////////////
export const GOTO_PAGE_AFFECTATION_BEGIN = "GOTO_PAGE_AFFECTATION_BEGIN";
const gotoPageAffectationBeginAction = createAction(
  GOTO_PAGE_AFFECTATION_BEGIN
);
export const GOTO_PAGE_AFFECTATION_SUCCESS = "GOTO_PAGE_AFFECTATION_SUCCESS";
const gotoPageAffectationSuccessAction = createAction(
  GOTO_PAGE_AFFECTATION_SUCCESS
);
export const GOTO_PAGE_AFFECTATION_FAIL = "GOTO_PAGE_AFFECTATION_FAIL";
const gotoPageAffectationFailAction = createAction(GOTO_PAGE_AFFECTATION_FAIL);
export function gotoPageAffectation(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageAffectationBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = AffectationServices.gotoPageAffectationAsync(
        getState(),
        page
      );
      doRequest.then(
        res => {
          dispatch(gotoPageAffectationSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(gotoPageAffectationFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeAffectationAttachment
//////////////////////////////
