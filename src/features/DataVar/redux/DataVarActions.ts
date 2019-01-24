import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from '../../../redux/InfoState';
import { GetInitialDataVar } from '../../../redux/StateProcs';
import { DataVarServices } from "./DataVarServices";
//
export const CHANGE_DATAVAR_FIELD = "CHANGE_DATAVAR_FIELD";
export const changeDataVarField = createAction(CHANGE_DATAVAR_FIELD);
//
export const CREATE_DATAVAR_ITEM = "CREATE_DATAVAR_ITEM";
const createDataVarAction = createAction(CREATE_DATAVAR_ITEM);
export function createDataVar(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    const state = getState();
    dispatch(
      createDataVarAction({ dataVar: GetInitialDataVar(state) })
    );
  };
} // createDataVar
//
//
export const CANCEL_DATAVAR_ITEM = "CANCEL_DATAVAR_ITEM";
export const cancelDataVarAction = createAction(CANCEL_DATAVAR_ITEM);
//
export const SELECT_DATAVAR_ITEM_BEGIN = "SELECT_DATAVAR_ITEM_BEGIN";
const selectDataVarBeginAction = createAction(SELECT_DATAVAR_ITEM_BEGIN);
export const SELECT_DATAVAR_ITEM = "SELECT_DATAVAR_ITEM";
const selectDataVarSuccessAction = createAction(SELECT_DATAVAR_ITEM);
export const SELECT_DATAVAR_ITEM_FAIL = "SELECT_DATAVAR_ITEM_FAIL";
const selectDataVarFailAction = createAction(SELECT_DATAVAR_ITEM_FAIL);
export function selectDataVar(id:string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectDataVarBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = DataVarServices.selectVarDocAsync(getState(),id);
      doRequest.then(
        res => {
          dispatch(selectDataVarSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectDataVarFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // selectDataVar
///////////////////////////////////////////////////
export const SAVE_DATAVAR_ITEM_BEGIN = "SAVE_DATAVAR_ITEM_BEGIN";
const saveDataVarBeginAction = createAction(SAVE_DATAVAR_ITEM_BEGIN);
export const SAVE_DATAVAR_ITEM_SUCCESS = "SAVE_DATAVAR_ITEM_SUCCESS";
const saveDataVarSuccessAction = createAction(SAVE_DATAVAR_ITEM_SUCCESS);
export const SAVE_DATAVAR_ITEM_FAIL = "SAVE_DATAVAR_ITEM_FAIL";
const saveDataVarFailAction = createAction(SAVE_DATAVAR_ITEM_FAIL);
//
export function saveDataVar(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveDataVarBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = DataVarServices.saveVarDocAsync(getState());
      doRequest.then(
        res => {
            dispatch(saveDataVarSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(saveDataVarFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveDataVar
////////////////////////////////////////////////////////////////////////
export const REMOVE_DATAVAR_ITEM_BEGIN = "REMOVE_DATAVAR_ITEM_BEGIN";
const removeDataVarBeginAction = createAction(REMOVE_DATAVAR_ITEM_BEGIN);
export const REMOVE_DATAVAR_ITEM_SUCCESS = "REMOVE_DATAVAR_ITEM_SUCCESS";
const removeDataVarSuccessAction = createAction(REMOVE_DATAVAR_ITEM_SUCCESS);
export const REMOVE_DATAVAR_ITEM_FAIL = "REMOVE_DATAVAR_ITEM_FAIL";
const removeDataVarFailAction = createAction(REMOVE_DATAVAR_ITEM_FAIL);
//
export function removeDataVar(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeDataVarBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = DataVarServices.removeVarDocAsync(getState());
      doRequest.then(
        res => {
         
            dispatch(removeDataVarSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(removeDataVarFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeDataVar
////////////////////////////////////////////////////////////////////////////
export const DATAVAR_SAVE_ATTACHMENT_BEGIN = "DATAVAR_SAVE_ATTACHMENT_BEGIN";
const anneeSaveAttachmentBeginAction = createAction(
  DATAVAR_SAVE_ATTACHMENT_BEGIN
);
export const DATAVAR_SAVE_ATTACHMENT_SUCCESS = "DATAVAR_SAVE_ATTACHMENT_SUCCESS";
const anneeSaveAttachmentSuccessAction = createAction(
  DATAVAR_SAVE_ATTACHMENT_SUCCESS
);
export const DATAVAR_SAVE_ATTACHMENT_FAIL = "DATAVAR_SAVE_ATTACHMENT_FAIL";
const anneeSaveAttachmentFailAction = createAction(DATAVAR_SAVE_ATTACHMENT_FAIL);
//
export function saveDataVarAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(anneeSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = DataVarServices.saveVarDocAttachmentAsync(
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
} // saveDataVarAttachment
/////////////////////////////////////////////
export const DATAVAR_REMOVE_ATTACHMENT_BEGIN = "DATAVAR_REMOVE_ATTACHMENT_BEGIN";
const anneeRemoveAttachmentBeginAction = createAction(
  DATAVAR_REMOVE_ATTACHMENT_BEGIN
);
export const DATAVAR_REMOVE_ATTACHMENT_SUCCESS =
  "DATAVAR_REMOVE_ATTACHMENT_SUCCESS";
const anneeRemoveAttachmentSuccessAction = createAction(
  DATAVAR_REMOVE_ATTACHMENT_SUCCESS
);
export const DATAVAR_REMOVE_ATTACHMENT_FAIL = "DATAVAR_REMOVE_ATTACHMENT_FAIL";
const anneeRemoveAttachmentFailAction = createAction(
  DATAVAR_REMOVE_ATTACHMENT_FAIL
);
export function removeDataVarAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(anneeRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = DataVarServices.removeVarDocAttachmentAsync(
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
} // removeDataVarAttachment
/////////////////////////////
export const GOTO_PAGE_DATAVAR_BEGIN = "GOTO_PAGE_DATAVAR_BEGIN";
const gotoPageDataVarBeginAction = createAction(GOTO_PAGE_DATAVAR_BEGIN);
export const GOTO_PAGE_DATAVAR_SUCCESS = "GOTO_PAGE_DATAVAR_SUCCESS";
const gotoPageDataVarSuccessAction = createAction(GOTO_PAGE_DATAVAR_SUCCESS);
export const GOTO_PAGE_DATAVAR_FAIL = "GOTO_PAGE_DATAVAR_FAIL";
const gotoPageDataVarFailAction = createAction(GOTO_PAGE_DATAVAR_FAIL);
//
export function gotoPageDataVar(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageDataVarBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = DataVarServices.gotoPageVarDocAsync(getState(), page);
      doRequest.then(
        res => {
            dispatch(gotoPageDataVarSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(gotoPageDataVarFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageDataVar
//////////////////////////////
export const REFRESH_DATAVAR_BEGIN = "REFRESH_DATAVAR_BEGIN";
const refreshDataVarBeginAction = createAction(REFRESH_DATAVAR_BEGIN);
export const REFRESH_DATAVAR_SUCCESS = "REFRESH_DATAVAR_SUCCESS";
const refreshDataVarSuccessAction = createAction(REFRESH_DATAVAR_SUCCESS);
export const REFRESH_DATAVAR_FAIL = "REFRESH_DATAVAR_FAIL";
const refreshDataVarFailAction = createAction(REFRESH_DATAVAR_FAIL);
//
export function refreshDataVars(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(refreshDataVarBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = DataVarServices.RefreshVarDocsAsync(getState());
      doRequest.then(
        res => {
            dispatch(refreshDataVarSuccessAction(res));
            resolve(res);
        },
        err => {
          dispatch(refreshDataVarFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageDataVar
//////////////////////////////
