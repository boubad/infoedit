import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from "src/redux/InfoState";
import { GetInitialSemestre } from '../../../redux/StateProcs';
import { SemestreServices } from "./SemestreServices";
//
export const CHANGE_SEMESTRE_FIELD = "CHANGE_SEMESTRE_FIELD";
export const changeSemestreField = createAction(CHANGE_SEMESTRE_FIELD);
//
export const CREATE_SEMESTRE_ITEM = "CREATE_SEMESTRE_ITEM";
const createSemestreAction = createAction(CREATE_SEMESTRE_ITEM);
export function createSemestre(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    const state = getState();
    dispatch(
      createSemestreAction({ semestre: GetInitialSemestre(state) })
    );
  };
} // createSemestre
//
export const CANCEL_SEMESTRE_ITEM = "CANCEL_SEMESTRE_ITEM";
export const cancelSemestreAction = createAction(CANCEL_SEMESTRE_ITEM);
//
export const SELECT_SEMESTRE_ITEM_BEGIN = "SELECT_SEMESTRE_ITEM_BEGIN";
const selectSemestreBeginAction = createAction(SELECT_SEMESTRE_ITEM_BEGIN);
export const SELECT_SEMESTRE_ITEM = "SELECT_SEMESTRE_ITEM";
const selectSemestreSuccessAction = createAction(SELECT_SEMESTRE_ITEM);
export const SELECT_SEMESTRE_ITEM_FAIL = "SELECT_SEMESTRE_ITEM_FAIL";
const selectSemestreFailAction = createAction(SELECT_SEMESTRE_ITEM_FAIL);
export function selectSemestre(id:string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectSemestreBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = SemestreServices.selectSemestreAsync(getState(),id);
      doRequest.then(
        res => {
          dispatch(selectSemestreSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectSemestreFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // selectSemestre
///////////////////////////////////////////////////
export const SAVE_SEMESTRE_ITEM_BEGIN = "SAVE_SEMESTRE_ITEM_BEGIN";
const saveSemestreBeginAction = createAction(SAVE_SEMESTRE_ITEM_BEGIN);
export const SAVE_SEMESTRE_ITEM_SUCCESS = "SAVE_SEMESTRE_ITEM_SUCCESS";
const saveSemestreSuccessAction = createAction(SAVE_SEMESTRE_ITEM_SUCCESS);
export const SAVE_SEMESTRE_ITEM_FAIL = "SAVE_SEMESTRE_ITEM_FAIL";
const saveSemestreFailAction = createAction(SAVE_SEMESTRE_ITEM_FAIL);
//
export function saveSemestre(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveSemestreBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = SemestreServices.saveSemestreAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveSemestreSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveSemestreFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveSemestre
////////////////////////////////////////////////////////////////////////
export const REMOVE_SEMESTRE_ITEM_BEGIN = "REMOVE_SEMESTRE_ITEM_BEGIN";
const removeSemestreBeginAction = createAction(REMOVE_SEMESTRE_ITEM_BEGIN);
export const REMOVE_SEMESTRE_ITEM_SUCCESS = "REMOVE_SEMESTRE_ITEM_SUCCESS";
const removeSemestreSuccessAction = createAction(REMOVE_SEMESTRE_ITEM_SUCCESS);
export const REMOVE_SEMESTRE_ITEM_FAIL = "REMOVE_SEMESTRE_ITEM_FAIL";
const removeSemestreFailAction = createAction(REMOVE_SEMESTRE_ITEM_FAIL);
//
export function removeSemestre(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeSemestreBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = SemestreServices.removeSemestreAsync(getState());
      doRequest.then(
        res => {
          dispatch(removeSemestreSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeSemestreFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeSemestre
////////////////////////////////////////////////////////////////////////////
export const SEMESTRE_SAVE_ATTACHMENT_BEGIN = "SEMESTRE_SAVE_ATTACHMENT_BEGIN";
const semestreSaveAttachmentBeginAction = createAction(
  SEMESTRE_SAVE_ATTACHMENT_BEGIN
);
export const SEMESTRE_SAVE_ATTACHMENT_SUCCESS =
  "SEMESTRE_SAVE_ATTACHMENT_SUCCESS";
const semestreSaveAttachmentSuccessAction = createAction(
  SEMESTRE_SAVE_ATTACHMENT_SUCCESS
);
export const SEMESTRE_SAVE_ATTACHMENT_FAIL = "SEMESTRE_SAVE_ATTACHMENT_FAIL";
const semestreSaveAttachmentFailAction = createAction(
  SEMESTRE_SAVE_ATTACHMENT_FAIL
);
//
export function saveSemestreAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(semestreSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = SemestreServices.saveSemestreAttachmentAsync(
        getState(),
        name,
        mime,
        data
      );
      doRequest.then(
        res => {
          dispatch(semestreSaveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(semestreSaveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveSemestreAttachment
/////////////////////////////////////////////
export const SEMESTRE_REMOVE_ATTACHMENT_BEGIN =
  "SEMESTRE_REMOVE_ATTACHMENT_BEGIN";
const semestreRemoveAttachmentBeginAction = createAction(
  SEMESTRE_REMOVE_ATTACHMENT_BEGIN
);
export const SEMESTRE_REMOVE_ATTACHMENT_SUCCESS =
  "SEMESTRE_REMOVE_ATTACHMENT_SUCCESS";
const semestreRemoveAttachmentSuccessAction = createAction(
  SEMESTRE_REMOVE_ATTACHMENT_SUCCESS
);
export const SEMESTRE_REMOVE_ATTACHMENT_FAIL =
  "SEMESTRE_REMOVE_ATTACHMENT_FAIL";
const semestreRemoveAttachmentFailAction = createAction(
  SEMESTRE_REMOVE_ATTACHMENT_FAIL
);
export function removeSemestreAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(semestreRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = SemestreServices.removeSemestreAttachmentAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(semestreRemoveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(semestreRemoveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeSemestreAttachment
/////////////////////////////
export const GOTO_PAGE_SEMESTRE_BEGIN = "GOTO_PAGE_SEMESTRE_BEGIN";
const gotoPageSemestreBeginAction = createAction(GOTO_PAGE_SEMESTRE_BEGIN);
export const GOTO_PAGE_SEMESTRE_SUCCESS = "GOTO_PAGE_SEMESTRE_SUCCESS";
const gotoPageSemestreSuccessAction = createAction(GOTO_PAGE_SEMESTRE_SUCCESS);
export const GOTO_PAGE_SEMESTRE_FAIL = "GOTO_PAGE_SEMESTRE_FAIL";
const gotoPageSemestreFailAction = createAction(GOTO_PAGE_SEMESTRE_FAIL);
//
export function gotoPageSemestre(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageSemestreBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = SemestreServices.gotoPageSemestreAsync(
        getState(),
        page
      );
      doRequest.then(
        res => {
          dispatch(gotoPageSemestreSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(gotoPageSemestreFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageSemestre
//////////////////////////////
export const REFRESH_SEMESTRE_BEGIN = "REFRESH_SEMESTRE_BEGIN";
const refreshSemestreBeginAction = createAction(REFRESH_SEMESTRE_BEGIN);
export const REFRESH_SEMESTRE_SUCCESS = "REFRESH_SEMESTRE_SUCCESS";
const refreshSemestreSuccessAction = createAction(REFRESH_SEMESTRE_SUCCESS);
export const REFRESH_SEMESTRE_FAIL = "REFRESH_SEMESTRE_FAIL";
const refreshSemestreFailAction = createAction(REFRESH_SEMESTRE_FAIL);
//
export function refreshSemestres(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(refreshSemestreBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = SemestreServices.refreshSemestresAsync(getState());
      doRequest.then(
        res => {
          dispatch(refreshSemestreSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(refreshSemestreFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageSemestre
//////////////////////////////
