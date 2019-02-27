import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from "../../../data/state/InfoState";
import { InfoUserServices } from "./InfoUserServices";
//
////////////////////////////////////////
export const CREATE_INFOUSER_ITEM = "CREATE_INFOUSER_ITEM";
export const createInfoUserAction = createAction(CREATE_INFOUSER_ITEM);
//
export const CANCEL_INFOUSER_ITEM = "CANCEL_INFOUSER_ITEM";
export const cancelInfoUserAction = createAction(CANCEL_INFOUSER_ITEM);
//
export const CHANGE_INFOUSER_FIELD = "CHANGE_USER_FIELD";
export const changeInfoUserFieldAction = createAction(CHANGE_INFOUSER_FIELD);
///////////////////////////////////////////////////////
export const LOGOUT_INFOUSER = "LOGOUT_INFOUSER";
export const logOutInfoUserAction = createAction(LOGOUT_INFOUSER);
///////////////////////////////////////////////////////////////
export const LOGIN_INFOUSER_BEGIN = "LOGIN_INFOUSER_BEGIN";
const loginInfoUserBeginAction = createAction(LOGIN_INFOUSER_BEGIN);
export const LOGIN_INFOUSER_SUCCESS = "LOGIN_INFOUSER_SUCCESS";
const loginInfoUserSuccessAction = createAction(LOGIN_INFOUSER_SUCCESS);
export const LOGIN_INFOUSER_FAIL = "LOGIN_INFOUSER_FAIL";
const loginInfoUserFailAction = createAction(LOGIN_INFOUSER_FAIL);
//
export function loginInfoUser(password: string, username:string, email:string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(loginInfoUserBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = InfoUserServices.logUserAsync(getState(), password,username,email);
      doRequest.then(
        res => {
            dispatch(loginInfoUserSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(loginInfoUserFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // changeInfoUser
////////////////////////////////////////////////////////
export const SELECT_INFOUSER_BEGIN = "SELECT_INFOUSER_BEGIN";
const selectInfoUserBeginAction = createAction(SELECT_INFOUSER_BEGIN);
export const SELECT_INFOUSER_SUCCESS = "SELECT_INFOUSER_SUCCESS";
const selectInfoUserSuccessAction = createAction(SELECT_INFOUSER_SUCCESS);
export const SELECT_INFOUSER_FAIL = "SELECT_INFOUSER_FAIL";
const selectInfoUserFailAction = createAction(SELECT_INFOUSER_FAIL);
//
export function selectInfoUser(id: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectInfoUserBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = InfoUserServices.selectInfoUserAsync(getState(), id);
      doRequest.then(
        res => {
          dispatch(selectInfoUserSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectInfoUserFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // changeInfoUser
///////////////////////////////////////////////////
export const SAVE_INFOUSER_ITEM_BEGIN = "SAVE_INFOUSER_ITEM_BEGIN";
const saveInfoUserBeginAction = createAction(SAVE_INFOUSER_ITEM_BEGIN);
export const SAVE_INFOUSER_ITEM_SUCCESS = "SAVE_INFOUSER_ITEM_SUCCESS";
const saveInfoUserSuccessAction = createAction(SAVE_INFOUSER_ITEM_SUCCESS);
export const SAVE_INFOUSER_ITEM_FAIL = "SAVE_INFOUSER_ITEM_FAIL";
const saveInfoUserFailAction = createAction(SAVE_INFOUSER_ITEM_FAIL);
//
export function saveInfoUser(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveInfoUserBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = InfoUserServices.saveInfoUserAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveInfoUserSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveInfoUserFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveInfoUser
/////////////////////////////////////////////////////////////////////
export const REMOVE_INFOUSER_ITEM_BEGIN = "REMOVE_INFOUSER_ITEM_BEGIN";
const removeInfoUserBeginAction = createAction(REMOVE_INFOUSER_ITEM_BEGIN);
export const REMOVE_INFOUSER_ITEM_SUCCESS = "REMOVE_INFOUSER_ITEM_SUCCESS";
const removeInfoUserSuccessAction = createAction(REMOVE_INFOUSER_ITEM_SUCCESS);
export const REMOVE_INFOUSER_ITEM_FAIL = "REMOVE_INFOUSER_ITEM_FAIL";
const removeInfoUserFailAction = createAction(REMOVE_INFOUSER_ITEM_FAIL);
//
export function removeInfoUser(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeInfoUserBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = InfoUserServices.removeInfoUserAsync(getState());
      doRequest.then(
        res => {
          dispatch(removeInfoUserSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeInfoUserFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeInfoUser
//////////////////////////////////////////////////////////////////
export const INFOUSER_SAVE_ATTACHMENT_BEGIN = "INFOUSER_SAVE_ATTACHMENT_BEGIN";
const etudiantSaveAttachmentBeginAction = createAction(
  INFOUSER_SAVE_ATTACHMENT_BEGIN
);
export const INFOUSER_SAVE_ATTACHMENT_SUCCESS =
  "INFOUSER_SAVE_ATTACHMENT_SUCCESS";
const etudiantSaveAttachmentSuccessAction = createAction(
  INFOUSER_SAVE_ATTACHMENT_SUCCESS
);
export const INFOUSER_SAVE_ATTACHMENT_FAIL = "INFOUSER_SAVE_ATTACHMENT_FAIL";
const etudiantSaveAttachmentFailAction = createAction(
  INFOUSER_SAVE_ATTACHMENT_FAIL
);
export function saveInfoUserAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(etudiantSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = InfoUserServices.saveInfoUserAttachmentAsync(
        getState(),
        name,
        mime,
        data
      );
      doRequest.then(
        res => {
          dispatch(etudiantSaveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(etudiantSaveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveInfoUserAttachment
/////////////////////////////////////////////
export const INFOUSER_REMOVE_ATTACHMENT_BEGIN =
  "INFOUSER_REMOVE_ATTACHMENT_BEGIN";
const etudiantRemoveAttachmentBeginAction = createAction(
  INFOUSER_REMOVE_ATTACHMENT_BEGIN
);
export const INFOUSER_REMOVE_ATTACHMENT_SUCCESS =
  "INFOUSER_REMOVE_ATTACHMENT_SUCCESS";
const etudiantRemoveAttachmentSuccessAction = createAction(
  INFOUSER_REMOVE_ATTACHMENT_SUCCESS
);
export const INFOUSER_REMOVE_ATTACHMENT_FAIL =
  "INFOUSER_REMOVE_ATTACHMENT_FAIL";
const etudiantRemoveAttachmentFailAction = createAction(
  INFOUSER_REMOVE_ATTACHMENT_FAIL
);
export function removeInfoUserAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(etudiantRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = InfoUserServices.removeInfoUserAttachmentAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(etudiantRemoveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(etudiantRemoveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeInfoUserAttachment
/////////////////////////////
export const SET_USERAVATAR_BEGIN = "SET_USERAVATAR_BEGIN";
const setUserAvatarBeginAction = createAction(SET_USERAVATAR_BEGIN);
export const SET_USERAVATAR_SUCCESS = "SET_USERAVATAR_SUCCESS";
const setUserAvatarSuccessAction = createAction(SET_USERAVATAR_SUCCESS);
export const SET_USERAVATAR_FAIL = "INFOUSER_REMOVE_ATTACHMENT_FAIL";
const setUserAvatarFailAction = createAction(SET_USERAVATAR_FAIL);
export function setInfoUserAvatar(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(setUserAvatarBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = InfoUserServices.setInfoUserAvatarAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(setUserAvatarSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(setUserAvatarFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // setInfoUserAvatar
//////////////////////////////////
export const GOTO_PAGE_INFOUSER_BEGIN = "GOTO_PAGE_INFOUSER_BEGIN";
const gotoPageInfoUserBeginAction = createAction(GOTO_PAGE_INFOUSER_BEGIN);
export const GOTO_PAGE_INFOUSER_SUCCESS = "GOTO_PAGE_INFOUSER_SUCCESS";
const gotoPageInfoUserSuccessAction = createAction(GOTO_PAGE_INFOUSER_SUCCESS);
export const GOTO_PAGE_INFOUSER_FAIL = "GOTO_PAGE_INFOUSER_FAIL";
const gotoPageInfoUserFailAction = createAction(GOTO_PAGE_INFOUSER_FAIL);
export function gotoPageInfoUser(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageInfoUserBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = InfoUserServices.gotoPageInfoUserAsync(
        getState(),
        page
      );
      doRequest.then(
        res => {
          dispatch(gotoPageInfoUserSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(gotoPageInfoUserFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // setInfoUserAvatar
////////////////////////////////////////////////////////////////
