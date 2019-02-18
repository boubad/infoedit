import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from '../../../data/state/InfoState';
import { GetInitialMatiere } from '../../../data/state/stores/StateProcs';
import { MatiereServices } from "./MatiereServices";
//
export const CHANGE_MATIERE_FIELD = "CHANGE_MATIERE_FIELD";
export const changeMatiereField = createAction(CHANGE_MATIERE_FIELD);
//
export const CREATE_MATIERE_ITEM = "CREATE_MATIERE_ITEM";
const createMatiereAction = createAction(CREATE_MATIERE_ITEM);
export function createMatiere(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    const state = getState();
    dispatch(
      createMatiereAction({ matiere: GetInitialMatiere(state) })
    );
  };
} // createMatiere
//
export const CANCEL_MATIERE_ITEM = "CANCEL_MATIERE_ITEM";
export const cancelMatiereAction = createAction(CANCEL_MATIERE_ITEM);
//
export const SELECT_MATIERE_ITEM_BEGIN = "SELECT_MATIERE_ITEM_BEGIN";
const selectMatiereBeginAction = createAction(SELECT_MATIERE_ITEM_BEGIN);
export const SELECT_MATIERE_ITEM = "SELECT_MATIERE_ITEM";
const selectMatiereSuccessAction = createAction(SELECT_MATIERE_ITEM);
export const SELECT_MATIERE_ITEM_FAIL = "SELECT_MATIERE_ITEM_FAIL";
const selectMatiereFailAction = createAction(SELECT_MATIERE_ITEM_FAIL);
export function selectMatiere(id:string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectMatiereBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = MatiereServices.selectMatiereAsync(getState(),id);
      doRequest.then(
        res => {
          dispatch(selectMatiereSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectMatiereFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // selectMatiere
//////////////////////////////////////////////////////
export const SAVE_MATIERE_ITEM_BEGIN = "SAVE_MATIERE_ITEM_BEGIN";
const saveMatiereBeginAction = createAction(SAVE_MATIERE_ITEM_BEGIN);
export const SAVE_MATIERE_ITEM_SUCCESS = "SAVE_MATIERE_ITEM_SUCCESS";
const saveMatiereSuccessAction = createAction(SAVE_MATIERE_ITEM_SUCCESS);
export const SAVE_MATIERE_ITEM_FAIL = "SAVE_MATIERE_ITEM_FAIL";
const saveMatiereFailAction = createAction(SAVE_MATIERE_ITEM_FAIL);
//
export function saveMatiere(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveMatiereBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = MatiereServices.saveMatiereAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveMatiereSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveMatiereFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveMatiere
////////////////////////////////////////////////////////////////////////
export const REMOVE_MATIERE_ITEM_BEGIN = "REMOVE_MATIERE_ITEM_BEGIN";
const removeMatiereBeginAction = createAction(REMOVE_MATIERE_ITEM_BEGIN);
export const REMOVE_MATIERE_ITEM_SUCCESS = "REMOVE_MATIERE_ITEM_SUCCESS";
const removeMatiereSuccessAction = createAction(REMOVE_MATIERE_ITEM_SUCCESS);
export const REMOVE_MATIERE_ITEM_FAIL = "REMOVE_MATIERE_ITEM_FAIL";
const removeMatiereFailAction = createAction(REMOVE_MATIERE_ITEM_FAIL);
//
export function removeMatiere(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeMatiereBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = MatiereServices.removeMatiereAsync(getState());
      doRequest.then(
        res => {
          dispatch(removeMatiereSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeMatiereFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeMatiere
////////////////////////////////////////////////////////////////////////////
export const MATIERE_SAVE_ATTACHMENT_BEGIN = "MATIERE_SAVE_ATTACHMENT_BEGIN";
const anneeSaveAttachmentBeginAction = createAction(
  MATIERE_SAVE_ATTACHMENT_BEGIN
);
export const MATIERE_SAVE_ATTACHMENT_SUCCESS =
  "MATIERE_SAVE_ATTACHMENT_SUCCESS";
const anneeSaveAttachmentSuccessAction = createAction(
  MATIERE_SAVE_ATTACHMENT_SUCCESS
);
export const MATIERE_SAVE_ATTACHMENT_FAIL = "MATIERE_SAVE_ATTACHMENT_FAIL";
const anneeSaveAttachmentFailAction = createAction(
  MATIERE_SAVE_ATTACHMENT_FAIL
);
//
export function saveMatiereAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(anneeSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = MatiereServices.saveMatiereAttachmentAsync(
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
} // saveMatiereAttachment
/////////////////////////////////////////////
export const MATIERE_REMOVE_ATTACHMENT_BEGIN =
  "MATIERE_REMOVE_ATTACHMENT_BEGIN";
const anneeRemoveAttachmentBeginAction = createAction(
  MATIERE_REMOVE_ATTACHMENT_BEGIN
);
export const MATIERE_REMOVE_ATTACHMENT_SUCCESS =
  "MATIERE_REMOVE_ATTACHMENT_SUCCESS";
const anneeRemoveAttachmentSuccessAction = createAction(
  MATIERE_REMOVE_ATTACHMENT_SUCCESS
);
export const MATIERE_REMOVE_ATTACHMENT_FAIL = "MATIERE_REMOVE_ATTACHMENT_FAIL";
const anneeRemoveAttachmentFailAction = createAction(
  MATIERE_REMOVE_ATTACHMENT_FAIL
);
export function removeMatiereAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(anneeRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = MatiereServices.removeMatiereAttachmentAsync(
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
} // removeMatiereAttachment
/////////////////////////////
export const GOTO_PAGE_MATIERE_BEGIN = "GOTO_PAGE_MATIERE_BEGIN";
const gotoPageMatiereBeginAction = createAction(GOTO_PAGE_MATIERE_BEGIN);
export const GOTO_PAGE_MATIERE_SUCCESS = "GOTO_PAGE_MATIERE_SUCCESS";
const gotoPageMatiereSuccessAction = createAction(GOTO_PAGE_MATIERE_SUCCESS);
export const GOTO_PAGE_MATIERE_FAIL = "GOTO_PAGE_MATIERE_FAIL";
const gotoPageMatiereFailAction = createAction(GOTO_PAGE_MATIERE_FAIL);
//
export function gotoPageMatiere(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageMatiereBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = MatiereServices.gotoPageMatiereAsync(getState(), page);
      doRequest.then(
        res => {
          dispatch(gotoPageMatiereSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(gotoPageMatiereFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageMatiere
//////////////////////////////
export const REFRESH_MATIERE_BEGIN = "REFRESH_MATIERE_BEGIN";
const refreshMatiereBeginAction = createAction(REFRESH_MATIERE_BEGIN);
export const REFRESH_MATIERE_SUCCESS = "REFRESH_MATIERE_SUCCESS";
const refreshMatiereSuccessAction = createAction(REFRESH_MATIERE_SUCCESS);
export const REFRESH_MATIERE_FAIL = "REFRESH_MATIERE_FAIL";
const refreshMatiereFailAction = createAction(REFRESH_MATIERE_FAIL);
//
export function refreshMatieres(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(refreshMatiereBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = MatiereServices.refreshMatieresAsync(getState());
      doRequest.then(
        res => {
          dispatch(refreshMatiereSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(refreshMatiereFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // gotoPageMatiere
//////////////////////////////
