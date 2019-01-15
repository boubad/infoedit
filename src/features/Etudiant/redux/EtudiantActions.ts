import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from "../../../redux/InfoState";
import { EtudiantServices } from "./EtudiantServices";
//
////////////////////////////////////////
export const CREATE_ETUDIANT_ITEM = "CREATE_ETUDIANT_ITEM";
export const createEtudiantAction = createAction(CREATE_ETUDIANT_ITEM);
//
export const CANCEL_ETUDIANT_ITEM = "CANCEL_ETUDIANT_ITEM";
export const cancelEtudiantAction = createAction(CANCEL_ETUDIANT_ITEM);
//
export const CHANGE_ETUDIANT_FIELD = "CHANGE_ETUDIANT_FIELD";
export const changeEtudiantFieldAction = createAction(CHANGE_ETUDIANT_FIELD);
//
export const SELECT_ETUDIANT_EVT = "SELECT_ETUDIANT_EVT";
export const selectEtudiantEvtAction = createAction(SELECT_ETUDIANT_EVT);
////
export const SELECT_ETUDIANT_NOTE = "SELECT_ETUDIANT_NOTE";
export const selectEtudiantNoteAction = createAction(SELECT_ETUDIANT_NOTE);
//
////////////////////////////////////////////////////////
export const SELECT_ETUDIANT_BEGIN = "SELECT_ETUDIANT_BEGIN";
const selectEtudiantBeginAction = createAction(SELECT_ETUDIANT_BEGIN);
export const SELECT_ETUDIANT_SUCCESS = "SELECT_ETUDIANT_SUCCESS";
const selectEtudiantSuccessAction = createAction(SELECT_ETUDIANT_SUCCESS);
export const SELECT_ETUDIANT_FAIL = "SELECT_ETUDIANT_FAIL";
const selectEtudiantFailAction = createAction(SELECT_ETUDIANT_FAIL);
//
export function selectEtudiant(id: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectEtudiantBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudiantServices.selectEtudiantAsync(getState(), id);
      doRequest.then(
        res => {
          dispatch(selectEtudiantSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectEtudiantFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // changeEtudiant
///////////////////////////////////////////////////
export const SAVE_ETUDIANT_ITEM_BEGIN = "SAVE_ETUDIANT_ITEM_BEGIN";
const saveEtudiantBeginAction = createAction(SAVE_ETUDIANT_ITEM_BEGIN);
export const SAVE_ETUDIANT_ITEM_SUCCESS = "SAVE_ETUDIANT_ITEM_SUCCESS";
const saveEtudiantSuccessAction = createAction(SAVE_ETUDIANT_ITEM_SUCCESS);
export const SAVE_ETUDIANT_ITEM_FAIL = "SAVE_ETUDIANT_ITEM_FAIL";
const saveEtudiantFailAction = createAction(SAVE_ETUDIANT_ITEM_FAIL);
//
export function saveEtudiant(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveEtudiantBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudiantServices.saveEtudiantAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveEtudiantSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveEtudiantFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveEtudiant
/////////////////////////////////////////////////////////////////////
export const REMOVE_ETUDIANT_ITEM_BEGIN = "REMOVE_ETUDIANT_ITEM_BEGIN";
const removeEtudiantBeginAction = createAction(REMOVE_ETUDIANT_ITEM_BEGIN);
export const REMOVE_ETUDIANT_ITEM_SUCCESS = "REMOVE_ETUDIANT_ITEM_SUCCESS";
const removeEtudiantSuccessAction = createAction(REMOVE_ETUDIANT_ITEM_SUCCESS);
export const REMOVE_ETUDIANT_ITEM_FAIL = "REMOVE_ETUDIANT_ITEM_FAIL";
const removeEtudiantFailAction = createAction(REMOVE_ETUDIANT_ITEM_FAIL);
//
export function removeEtudiant(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeEtudiantBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudiantServices.removeEtudiantAsync(getState());
      doRequest.then(
        res => {
          dispatch(removeEtudiantSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeEtudiantFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeEtudiant
//////////////////////////////////////////////////////////////////
export const ETUDIANT_SAVE_ATTACHMENT_BEGIN = "ETUDIANT_SAVE_ATTACHMENT_BEGIN";
const etudiantSaveAttachmentBeginAction = createAction(
  ETUDIANT_SAVE_ATTACHMENT_BEGIN
);
export const ETUDIANT_SAVE_ATTACHMENT_SUCCESS =
  "ETUDIANT_SAVE_ATTACHMENT_SUCCESS";
const etudiantSaveAttachmentSuccessAction = createAction(
  ETUDIANT_SAVE_ATTACHMENT_SUCCESS
);
export const ETUDIANT_SAVE_ATTACHMENT_FAIL = "ETUDIANT_SAVE_ATTACHMENT_FAIL";
const etudiantSaveAttachmentFailAction = createAction(
  ETUDIANT_SAVE_ATTACHMENT_FAIL
);
export function saveEtudiantAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(etudiantSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudiantServices.saveEtudiantAttachmentAsync(
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
} // saveEtudiantAttachment
/////////////////////////////////////////////
export const ETUDIANT_REMOVE_ATTACHMENT_BEGIN =
  "ETUDIANT_REMOVE_ATTACHMENT_BEGIN";
const etudiantRemoveAttachmentBeginAction = createAction(
  ETUDIANT_REMOVE_ATTACHMENT_BEGIN
);
export const ETUDIANT_REMOVE_ATTACHMENT_SUCCESS =
  "ETUDIANT_REMOVE_ATTACHMENT_SUCCESS";
const etudiantRemoveAttachmentSuccessAction = createAction(
  ETUDIANT_REMOVE_ATTACHMENT_SUCCESS
);
export const ETUDIANT_REMOVE_ATTACHMENT_FAIL =
  "ETUDIANT_REMOVE_ATTACHMENT_FAIL";
const etudiantRemoveAttachmentFailAction = createAction(
  ETUDIANT_REMOVE_ATTACHMENT_FAIL
);
export function removeEtudiantAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(etudiantRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudiantServices.removeEtudiantAttachmentAsync(
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
} // removeEtudiantAttachment
/////////////////////////////
export const SET_AVATAR_BEGIN = "SET_AVATAR_BEGIN";
const setAvatarBeginAction = createAction(SET_AVATAR_BEGIN);
export const SET_AVATAR_SUCCESS = "SET_AVATAR_SUCCESS";
const setAvatarSuccessAction = createAction(SET_AVATAR_SUCCESS);
export const SET_AVATAR_FAIL = "ETUDIANT_REMOVE_ATTACHMENT_FAIL";
const setAvatarFailAction = createAction(SET_AVATAR_FAIL);
export function setEtudiantAvatar(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(setAvatarBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudiantServices.setEtudiantAvatarAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(setAvatarSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(setAvatarFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // setEtudiantAvatar
//////////////////////////////////
export const GOTO_PAGE_ETUDIANT_BEGIN = "GOTO_PAGE_ETUDIANT_BEGIN";
const gotoPageEtudiantBeginAction = createAction(GOTO_PAGE_ETUDIANT_BEGIN);
export const GOTO_PAGE_ETUDIANT_SUCCESS = "GOTO_PAGE_ETUDIANT_SUCCESS";
const gotoPageEtudiantSuccessAction = createAction(GOTO_PAGE_ETUDIANT_SUCCESS);
export const GOTO_PAGE_ETUDIANT_FAIL = "GOTO_PAGE_ETUDIANT_FAIL";
const gotoPageEtudiantFailAction = createAction(GOTO_PAGE_ETUDIANT_FAIL);
export function gotoPageEtudiant(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageEtudiantBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudiantServices.gotoPageEtudiantAsync(
        getState(),
        page
      );
      doRequest.then(
        res => {
          dispatch(gotoPageEtudiantSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(gotoPageEtudiantFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // setEtudiantAvatar
////////////////////////////////////////////////////////////////
export const CHANGESTATUS_ETUDIANT_BEGIN = "CHANGESTATUS_ETUDIANT_BEGIN";
const changeStatusEtudiantBeginAction = createAction(
  CHANGESTATUS_ETUDIANT_BEGIN
);
export const CHANGESTATUS_ETUDIANT_SUCCESS = "CHANGESTATUS_ETUDIANT_SUCCESS";
const changeStatusEtudiantSuccessAction = createAction(
  CHANGESTATUS_ETUDIANT_SUCCESS
);
export const CHANGESTATUS_ETUDIANT_FAIL = "CHANGESTATUS_ETUDIANT_FAIL";
const changeStatusEtudiantFailAction = createAction(CHANGESTATUS_ETUDIANT_FAIL);
export function changeEtudiantStatus(status: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(changeStatusEtudiantBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = EtudiantServices.changeEtudiantStatusAsync(
        getState(),
        status
      );
      doRequest.then(
        res => {
          dispatch(changeStatusEtudiantSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(changeStatusEtudiantFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // changeEtudiantStatus
////////////////////////////////////////////////////////////////
