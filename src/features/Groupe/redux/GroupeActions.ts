import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from '../../../data/state/InfoState';
import { GetInitialGroupe } from '../../../data/state/stores/StateProcs';
import { GroupeServices } from "./GroupeServices";
//
export const CHANGE_GROUPE_FIELD = "CHANGE_GROUPE_FIELD";
export const changeGroupeField = createAction(CHANGE_GROUPE_FIELD);
//
export const CREATE_GROUPE_ITEM = "CREATE_GROUPE_ITEM";
const createGroupeAction = createAction(CREATE_GROUPE_ITEM);
export function createGroupe(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    const state = getState();
    dispatch(
      createGroupeAction({ groupe: GetInitialGroupe(state) })
    );
  };
} // createGroupe
//
export const CANCEL_GROUPE_ITEM = "CANCEL_GROUPE_ITEM";
export const cancelGroupeAction = createAction(CANCEL_GROUPE_ITEM);
////////////////////////////////////
export const SELECT_GROUPE_ITEM_BEGIN = "SELECT_GROUPE_ITEM_BEGIN";
const selectGroupeBeginAction = createAction(SELECT_GROUPE_ITEM_BEGIN);
export const SELECT_GROUPE_ITEM = "SELECT_GROUPE_ITEM";
const selectGroupeSuccessAction = createAction(SELECT_GROUPE_ITEM);
export const SELECT_GROUPE_ITEM_FAIL = "SELECT_GROUPE_ITEM_FAIL";
const selectGroupeFailAction = createAction(SELECT_GROUPE_ITEM_FAIL);
export function selectGroupe(id:string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectGroupeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = GroupeServices.selectGroupeAsync(getState(),id);
      doRequest.then(
        res => {
          dispatch(selectGroupeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectGroupeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // selectGroupe
//////////////////////////////////////////////////////
export const SAVE_GROUPE_ITEM_BEGIN = "SAVE_GROUPE_ITEM_BEGIN";
const saveGroupeBeginAction = createAction(SAVE_GROUPE_ITEM_BEGIN);
export const SAVE_GROUPE_ITEM_SUCCESS = "SAVE_GROUPE_ITEM_SUCCESS";
const saveGroupeSuccessAction = createAction(SAVE_GROUPE_ITEM_SUCCESS);
export const SAVE_GROUPE_ITEM_FAIL = "SAVE_GROUPE_ITEM_FAIL";
const saveGroupeFailAction = createAction(SAVE_GROUPE_ITEM_FAIL);
//
export function saveGroupe(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveGroupeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = GroupeServices.saveGroupeAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveGroupeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveGroupeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveGroupe
////////////////////////////////////////////////////////////////////////
export const REMOVE_GROUPE_ITEM_BEGIN = "REMOVE_GROUPE_ITEM_BEGIN";
const removeGroupeBeginAction = createAction(REMOVE_GROUPE_ITEM_BEGIN);
export const REMOVE_GROUPE_ITEM_SUCCESS = "REMOVE_GROUPE_ITEM_SUCCESS";
const removeGroupeSuccessAction = createAction(REMOVE_GROUPE_ITEM_SUCCESS);
export const REMOVE_GROUPE_ITEM_FAIL = "REMOVE_GROUPE_ITEM_FAIL";
const removeGroupeFailAction = createAction(REMOVE_GROUPE_ITEM_FAIL);
//
export function removeGroupe(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeGroupeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = GroupeServices.removeGroupeAsync(getState());
      doRequest.then(
        res => {
          dispatch(removeGroupeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeGroupeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeGroupe
////////////////////////////////////////////////////////////////////////////
export const GROUPE_SAVE_ATTACHMENT_BEGIN = "GROUPE_SAVE_ATTACHMENT_BEGIN";
const groupeSaveAttachmentBeginAction = createAction(
  GROUPE_SAVE_ATTACHMENT_BEGIN
);
export const GROUPE_SAVE_ATTACHMENT_SUCCESS = "GROUPE_SAVE_ATTACHMENT_SUCCESS";
const groupeSaveAttachmentSuccessAction = createAction(
  GROUPE_SAVE_ATTACHMENT_SUCCESS
);
export const GROUPE_SAVE_ATTACHMENT_FAIL = "GROUPE_SAVE_ATTACHMENT_FAIL";
const groupeSaveAttachmentFailAction = createAction(
  GROUPE_SAVE_ATTACHMENT_FAIL
);
//
export function saveGroupeAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(groupeSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = GroupeServices.saveGroupeAttachmentAsync(
        getState(),
        name,
        mime,
        data
      );
      doRequest.then(
        res => {
          dispatch(groupeSaveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(groupeSaveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveGroupeAttachment
/////////////////////////////////////////////
export const GROUPE_REMOVE_ATTACHMENT_BEGIN = "GROUPE_REMOVE_ATTACHMENT_BEGIN";
const groupeRemoveAttachmentBeginAction = createAction(
  GROUPE_REMOVE_ATTACHMENT_BEGIN
);
export const GROUPE_REMOVE_ATTACHMENT_SUCCESS =
  "GROUPE_REMOVE_ATTACHMENT_SUCCESS";
const groupeRemoveAttachmentSuccessAction = createAction(
  GROUPE_REMOVE_ATTACHMENT_SUCCESS
);
export const GROUPE_REMOVE_ATTACHMENT_FAIL = "GROUPE_REMOVE_ATTACHMENT_FAIL";
const groupeRemoveAttachmentFailAction = createAction(
  GROUPE_REMOVE_ATTACHMENT_FAIL
);
export function removeGroupeAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(groupeRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = GroupeServices.removeGroupeAttachmentAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(groupeRemoveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(groupeRemoveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeGroupeAttachment
/////////////////////////////
export const GOTO_PAGE_GROUPE_BEGIN = "GOTO_PAGE_GROUPE_BEGIN";
const gotoPageGroupeBeginAction = createAction(GOTO_PAGE_GROUPE_BEGIN);
export const GOTO_PAGE_GROUPE_SUCCESS = "GOTO_PAGE_GROUPE_SUCCESS";
const gotoPageGroupeSuccessAction = createAction(GOTO_PAGE_GROUPE_SUCCESS);
export const GOTO_PAGE_GROUPE_FAIL = "GOTO_PAGE_GROUPE_FAIL";
const gotoPageGroupeFailAction = createAction(GOTO_PAGE_GROUPE_FAIL);
//
export function gotoPageGroupe(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageGroupeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = GroupeServices.gotoPageGroupeAsync(getState(), page);
      doRequest.then(
        res => {
          dispatch(gotoPageGroupeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(gotoPageGroupeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageGroupe
//////////////////////////////
export const REFRESH_GROUPE_BEGIN = "REFRESH_GROUPE_BEGIN";
const refreshGroupeBeginAction = createAction(REFRESH_GROUPE_BEGIN);
export const REFRESH_GROUPE_SUCCESS = "REFRESH_GROUPE_SUCCESS";
const refreshGroupeSuccessAction = createAction(REFRESH_GROUPE_SUCCESS);
export const REFRESH_GROUPE_FAIL = "REFRESH_GROUPE_FAIL";
const refreshGroupeFailAction = createAction(REFRESH_GROUPE_FAIL);
//
export function refreshGroupes(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(refreshGroupeBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = GroupeServices.refreshGroupesAsync(getState());
      doRequest.then(
        res => {
          dispatch(refreshGroupeSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(refreshGroupeFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageGroupe
//////////////////////////////
