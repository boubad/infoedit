import { push } from 'connected-react-router';
import { Dispatch } from "redux";
import { createAction } from "redux-actions";
import { IInfoState } from '../../../redux/InfoState';
import { GetInitialEvt } from '../../../redux/StateProcs';
import { ControleServices } from "./ControleServices";
///////////////////////////////
export const CHANGE_CONTROLE_FIELD = "CHANGE_CONTROLE_FIELD";
export const changeControleFieldAction = createAction(CHANGE_CONTROLE_FIELD);
//
export const CREATE_CONTROLE_ITEM = "CREATE_CONTROLE_ITEM";
const createControleAction = createAction(CREATE_CONTROLE_ITEM);
export function createControle(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    const state = getState();
    dispatch(
      createControleAction({ annee: ControleServices.createControle(state) })
    );
  };
} // createControle
//
export const CANCEL_CONTROLE_ITEM = "CANCEL_CONTROLE_ITEM";
export const cancelControleAction = createAction(CANCEL_CONTROLE_ITEM);
//

export const CREATE_CONTROLE_EVT = "CREATE_CONTROLE_EVT";
const createControleEvtAction = createAction(CREATE_CONTROLE_EVT);
export function createControleEvt(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    const state = getState();
    dispatch(
      createControleEvtAction({ evt: GetInitialEvt(state) })
    );
  };
} // createControle
//
export const CANCEL_CONTROLE_EVT = "CANCEL_CONTROLE_EVT";
export const cancelControleEvtAction = createAction(CANCEL_CONTROLE_EVT);

//

export const CHANGE_CONTROLE_EVT_FIELD = "CHANGE_CONTROLE_EVT_FIELD";
export const changeControleEvtFieldAction = createAction(
  CHANGE_CONTROLE_EVT_FIELD
);
//
export const CHANGE_CONTROLE_NOTE_FIELD = "CHANGE_CONTROLE_NOTE_FIELD";
export const changeControleNoteFieldAction = createAction(
  CHANGE_CONTROLE_NOTE_FIELD
);
//
export const CANCEL_CONTROLE_NOTE = "CANCEL_CONTROLE_NOTE";
export const cancelControleNoteAction = createAction(CANCEL_CONTROLE_NOTE);
///////////////////////////////////////
export const SHOW_ETUDIANT_BEGIN = "SHOW_ETUDIANT_BEGIN";
const showEtudiantBeginAction = createAction(SHOW_ETUDIANT_BEGIN);
export const SHOW_ETUDIANT = "SHOW_ETUDIANT";
const showEtudiantSuccessAction = createAction(SHOW_ETUDIANT);
export const SHOW_ETUDIANT_FAIL = "SHOW_ETUDIANT_FAIL";
const showEtudiantFailAction = createAction(SHOW_ETUDIANT_FAIL);
//
export function showEtudiant(id: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(showEtudiantBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.showEtudiantAsync(getState(), id);
      doRequest.then(
        res => {
          dispatch(push('/etuddetail/'));
          dispatch(showEtudiantSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(showEtudiantFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // showEtudiant
/////////////////////////////
export const SELECT_CONTROLE_EVT_BEGIN = "SELECT_CONTROLE_EVT_BEGIN";
const selectControleEvtBeginAction = createAction(SELECT_CONTROLE_EVT_BEGIN);
export const SELECT_CONTROLE_EVT = "SELECT_CONTROLE_EVT";
export const selectControleEvtAction = createAction(SELECT_CONTROLE_EVT);
export const SELECT_CONTROLE_EVT_FAIL = "SELECT_CONTROLE_EVT_FAIL";
const selectControleEvtFailAction = createAction(SELECT_CONTROLE_EVT_FAIL);
//
export function selectControleEvt(id: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectControleEvtBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.selectControleEvtAsync(getState(), id);
      doRequest.then(
        res => {
          dispatch(selectControleEvtAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectControleEvtFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // selectControleEvt
/////////////////////////////
export const SELECT_CONTROLE_NOTE_BEGIN = "SELECT_CONTROLE_NOTE_BEGIN";
export const selectControleNoteBeginAction = createAction(SELECT_CONTROLE_NOTE_BEGIN);
export const SELECT_CONTROLE_NOTE = "SELECT_CONTROLE_NOTE";
export const selectControleNoteAction = createAction(SELECT_CONTROLE_NOTE);
export const SELECT_CONTROLE_NOTE_FAIL = "SELECT_CONTROLE_NOTE_FAIL";
export const selectControleNoteFailAction = createAction(SELECT_CONTROLE_NOTE_FAIL);
//
export function selectControleNote(id: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectControleNoteBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.selectControleNoteAsync(getState(), id);
      doRequest.then(
        res => {
          dispatch(selectControleNoteAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectControleNoteFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // changeControle
////////////////////////////
export const SELECT_CONTROLE_BEGIN = "SELECT_CONTROLE_BEGIN";
const selectControleBeginAction = createAction(SELECT_CONTROLE_BEGIN);
export const SELECT_CONTROLE_SUCCESS = "SELECT_CONTROLE_SUCCESS";
const selectControleSuccessAction = createAction(SELECT_CONTROLE_SUCCESS);
export const SELECT_CONTROLE_FAIL = "SELECT_CONTROLE_FAIL";
const selectControleFailAction = createAction(SELECT_CONTROLE_FAIL);
export function changeControle(id: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(selectControleBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.selectControleAsync(getState(), id);
      doRequest.then(
        res => {
          dispatch(selectControleSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(selectControleFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // changeControle
//////////////////////////////////////////////////////////////
//
export const CONTROLE_SAVE_ITEM_BEGIN = "CONTROLE_SAVE_ITEM_BEGIN";
export const controleSaveBeginAction = createAction(CONTROLE_SAVE_ITEM_BEGIN);
export const SAVE_CONTROLE_ITEM_SUCCESS = "SAVE_CONTROLE_ITEM_SUCCESS";
const saveControleSuccessAction = createAction(SAVE_CONTROLE_ITEM_SUCCESS);
export const SAVE_CONTROLE_ITEM_FAIL = "SAVE_CONTROLE_ITEM_FAIL";
const saveControleFailAction = createAction(SAVE_CONTROLE_ITEM_FAIL);
export function saveControle(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(controleSaveBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.saveControleAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveControleSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveControleFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveControle
/////////////////////////////////////////////////////////////////////////////
//
export const REMOVE_CONTROLE_ITEM_BEGIN = "REMOVE_CONTROLE_ITEM_BEGIN";
const removeControleBeginAction = createAction(REMOVE_CONTROLE_ITEM_BEGIN);
export const REMOVE_CONTROLE_ITEM_SUCCESS = "REMOVE_CONTROLE_ITEM_SUCCESS";
const removeControleSuccessAction = createAction(REMOVE_CONTROLE_ITEM_SUCCESS);
export const REMOVE_CONTROLE_ITEM_FAIL = "REMOVE_CONTROLE_ITEM_FAIL";
const removeControleFailAction = createAction(REMOVE_CONTROLE_ITEM_FAIL);
export function removeControle(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeControleBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.removeControleAsync(getState());
      doRequest.then(
        res => {
          dispatch(removeControleSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeControleFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeControle
//////////////////////////////////////////////////////////////////////
export const CONTROLE_SAVE_ATTACHMENT_BEGIN = "CONTROLE_SAVE_ATTACHMENT_BEGIN";
const controleSaveAttachmentBeginAction = createAction(
  CONTROLE_SAVE_ATTACHMENT_BEGIN
);
export const CONTROLE_SAVE_ATTACHMENT_SUCCESS =
  "CONTROLE_SAVE_ATTACHMENT_SUCCESS";
const controleSaveAttachmentSuccessAction = createAction(
  CONTROLE_SAVE_ATTACHMENT_SUCCESS
);
export const CONTROLE_SAVE_ATTACHMENT_FAIL = "CONTROLE_SAVE_ATTACHMENT_FAIL";
const controleSaveAttachmentFailAction = createAction(
  CONTROLE_SAVE_ATTACHMENT_FAIL
);
export function saveControleAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(controleSaveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.saveControleAttachmentAsync(
        getState(),
        name,
        mime,
        data
      );
      doRequest.then(
        res => {
          dispatch(controleSaveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(controleSaveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveControleAttachment
//////////////////////////////////////////////////////////
export const CONTROLE_REMOVE_ATTACHMENT_BEGIN =
  "CONTROLE_REMOVE_ATTACHMENT_BEGIN";
const controleRemoveAttachmentBeginAction = createAction(
  CONTROLE_REMOVE_ATTACHMENT_BEGIN
);
export const CONTROLE_REMOVE_ATTACHMENT_SUCCESS =
  "CONTROLE_REMOVE_ATTACHMENT_SUCCESS";
const controleRemoveAttachmentSuccessAction = createAction(
  CONTROLE_REMOVE_ATTACHMENT_SUCCESS
);
export const CONTROLE_REMOVE_ATTACHMENT_FAIL =
  "CONTROLE_REMOVE_ATTACHMENT_FAIL";
const controleRemoveAttachmentFailAction = createAction(
  CONTROLE_REMOVE_ATTACHMENT_FAIL
);
export function removeControleAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(controleRemoveAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.removeControleAttachmentAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(controleRemoveAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(controleRemoveAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeControleAttachment
///////////////////////////////////////////////////////////
export const CONTROLE_CHECKNOTES_BEGIN = "CONTROLE_CHECKNOTES_BEGIN";
const controleCheckNotesBeginAction = createAction(CONTROLE_CHECKNOTES_BEGIN);
export const CONTROLE_CHECKNOTES_SUCCESS = "CONTROLE_CHECKNOTES_SUCCESS";
const controleCheckNotesSuccessAction = createAction(
  CONTROLE_CHECKNOTES_SUCCESS
);
export const CONTROLE_CHECKNOTES_FAIL = "CONTROLE_CHECKNOTES_FAIL";
const controleCheckNotesFailAction = createAction(CONTROLE_CHECKNOTES_FAIL);
export function checkControleNotes(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(controleCheckNotesBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.checkControleNotesAsync(getState());
      doRequest.then(
        res => {
          dispatch(controleCheckNotesSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(controleCheckNotesFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // checkControleNotes
/////////////////////////////////////////////
export const GOTO_PAGE_CONTROLE_BEGIN = "GOTO_PAGE_CONTROLE_BEGIN";
const gotoPageControleBeginAction = createAction(GOTO_PAGE_CONTROLE_BEGIN);
export const GOTO_PAGE_CONTROLE_SUCCESS = "GOTO_PAGE_CONTROLE_SUCCESS";
const gotoPageControleSuccessAction = createAction(GOTO_PAGE_CONTROLE_SUCCESS);
export const GOTO_PAGE_CONTROLE_FAIL = "GOTO_PAGE_CONTROLE_FAIL";
const gotoPageControleFailAction = createAction(GOTO_PAGE_CONTROLE_FAIL);
//
export function gotoPageControle(page: number): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(gotoPageControleBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.gotoPageControleAsync(
        getState(),
        page
      );
      doRequest.then(
        res => {
          dispatch(gotoPageControleSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(gotoPageControleFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // checkControleNotes
/////////////////////////////////
export const SAVE_CONTROLE_EVT_BEGIN = "SAVE_CONTROLE_EVT_BEGIN";
const saveControleEvtBeginAction = createAction(SAVE_CONTROLE_EVT_BEGIN);
export const SAVE_CONTROLE_EVT_SUCCESS = "SAVE_CONTROLE_EVT_SUCCESS";
const saveControleEvtSuccessAction = createAction(SAVE_CONTROLE_EVT_SUCCESS);
export const SAVE_CONTROLE_EVT_FAIL = "SAVE_CONTROLE_EVT_FAIL";
const saveControleEvtFailAction = createAction(SAVE_CONTROLE_EVT_FAIL);
export function saveControleEvt(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveControleEvtBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.saveControleEvtAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveControleEvtSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveControleEvtFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveControleEvt
/////////////////////////////////////
export const REMOVE_CONTROLE_EVT_BEGIN = "REMOVE_CONTROLE_EVT_BEGIN";
const removeControleEvtBeginAction = createAction(REMOVE_CONTROLE_EVT_BEGIN);
export const REMOVE_CONTROLE_EVT_SUCCESS = "REMOVE_CONTROLE_EVT_SUCCESS";
const removeControleEvtSuccessAction = createAction(
  REMOVE_CONTROLE_EVT_SUCCESS
);
export const REMOVE_CONTROLE_EVT_FAIL = "REMOVE_CONTROLE_EVT_FAIL";
const removeControleEvtFailAction = createAction(REMOVE_CONTROLE_EVT_FAIL);
export function removeControleEvt(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(removeControleEvtBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.removeControleEvtAsync(getState());
      doRequest.then(
        res => {
          dispatch(removeControleEvtSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(removeControleEvtFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeControleEvt
/////////////////////////////////
export const SAVE_CONTROLE_NOTE_BEGIN = "SAVE_CONTROLE_NOTE_BEGIN";
const saveControleNoteBeginAction = createAction(SAVE_CONTROLE_NOTE_BEGIN);
export const SAVE_CONTROLE_NOTE_SUCCESS = "SAVE_CONTROLE_NOTE_SUCCESS";
const saveControleNoteSuccessAction = createAction(SAVE_CONTROLE_NOTE_SUCCESS);
export const SAVE_CONTROLE_NOTE_FAIL = "SAVE_CONTROLE_NOTE_FAIL";
const saveControleNoteFailAction = createAction(SAVE_CONTROLE_NOTE_FAIL);
export function saveControleNote(): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(saveControleNoteBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.saveControleNoteAsync(getState());
      doRequest.then(
        res => {
          dispatch(saveControleNoteSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(saveControleNoteFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveControleNote
///////////////////////////////////////////
export const CONTROLE_SAVE_NOTE_ATTACHMENT_BEGIN =
  "CONTROLE_SAVE_NOTE_ATTACHMENT_BEGIN";
const controleSaveNoteAttachmentBeginAction = createAction(
  CONTROLE_SAVE_NOTE_ATTACHMENT_BEGIN
);
export const CONTROLE_SAVE_NOTE_ATTACHMENT_SUCCESS =
  "CONTROLE_SAVE_NOTE_ATTACHMENT_SUCCESS";
const controleSaveNoteAttachmentSuccessAction = createAction(
  CONTROLE_SAVE_NOTE_ATTACHMENT_SUCCESS
);
export const CONTROLE_SAVE_NOTE_ATTACHMENT_FAIL =
  "CONTROLE_SAVE_NOTE_ATTACHMENT_FAIL";
const controleSaveNoteAttachmentFailAction = createAction(
  CONTROLE_SAVE_NOTE_ATTACHMENT_FAIL
);
export function saveControleNoteAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(controleSaveNoteAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.saveControleNoteAttachmentAsync(
        getState(),
        name,
        mime,
        data
      );
      doRequest.then(
        res => {
          dispatch(controleSaveNoteAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(controleSaveNoteAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveControleNoteAttachment
//////////////////////////////////////////////////////////////
export const CONTROLE_REMOVE_NOTE_ATTACHMENT_BEGIN =
  "CONTROLE_REMOVE_NOTE_ATTACHMENT_BEGIN";
const controleRemoveNoteAttachmentBeginAction = createAction(
  CONTROLE_REMOVE_NOTE_ATTACHMENT_BEGIN
);
export const CONTROLE_REMOVE_NOTE_ATTACHMENT_SUCCESS =
  "CONTROLE_REMOVE_NOTE_ATTACHMENT_SUCCESS";
const controleRemoveNoteAttachmentSuccessAction = createAction(
  CONTROLE_REMOVE_NOTE_ATTACHMENT_SUCCESS
);
export const CONTROLE_REMOVE_NOTE_ATTACHMENT_FAIL =
  "CONTROLE_REMOVE_NOTE_ATTACHMENT_FAIL";
const controleRemoveNoteAttachmentFailAction = createAction(
  CONTROLE_REMOVE_NOTE_ATTACHMENT_FAIL
);
export function removeControleNoteAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(controleRemoveNoteAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.removeControleNoteAttachmentAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(controleRemoveNoteAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(controleRemoveNoteAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeControleNoteAttachment
///////////////////////////////
export const CONTROLE_SAVE_EVT_ATTACHMENT_BEGIN =
  "CONTROLE_SAVE_EVT_ATTACHMENT_BEGIN ";
const controleSaveEvtAttachmentBeginAction = createAction(
  CONTROLE_SAVE_EVT_ATTACHMENT_BEGIN
);
export const CONTROLE_SAVE_EVT_ATTACHMENT_SUCCESS =
  "CONTROLE_SAVE_EVT_ATTACHMENT_SUCCESS";
const controleSaveEvtAttachmentSuccessAction = createAction(
  CONTROLE_SAVE_EVT_ATTACHMENT_SUCCESS
);
export const CONTROLE_SAVE_EVT_ATTACHMENT_FAIL =
  "CONTROLE_SAVE_EVT_ATTACHMENT_FAIL";
const controleSaveEvtAttachmentFailAction = createAction(
  CONTROLE_SAVE_EVT_ATTACHMENT_FAIL
);
export function saveControleEvtAttachment(
  name: string,
  mime: string,
  data: Blob | Buffer
): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(controleSaveEvtAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.saveControleEvtAttachmentAsync(
        getState(),
        name,
        mime,
        data
      );
      doRequest.then(
        res => {
          dispatch(controleSaveEvtAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(controleSaveEvtAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // saveControleEvtAttachment
//////////////////////////////////////////////////
export const CONTROLE_REMOVE_EVT_ATTACHMENT_BEGIN =
  "CONTROLE_REMOVE_EVT_ATTACHMENT_BEGIN";
const controleRemoveEvtAttachmentBeginAction = createAction(
  CONTROLE_REMOVE_EVT_ATTACHMENT_BEGIN
);
export const CONTROLE_REMOVE_EVT_ATTACHMENT_SUCCESS =
  "CONTROLE_REMOVE_EVT_ATTACHMENT_SUCCESS";
const controleRemoveEvtAttachmentSuccessAction = createAction(
  CONTROLE_REMOVE_EVT_ATTACHMENT_SUCCESS
);
export const CONTROLE_REMOVE_EVT_ATTACHMENT_FAIL =
  "CONTROLE_REMOVE_EVT_ATTACHMENT_FAIL";
const controleRemoveEvtAttachmentFailAction = createAction(
  CONTROLE_REMOVE_EVT_ATTACHMENT_FAIL
);
export function removeControleEvtAttachment(name: string): any {
  return (dispatch: Dispatch, getState: () => IInfoState) => {
    dispatch(controleRemoveEvtAttachmentBeginAction());
    const promise = new Promise((resolve, reject) => {
      const doRequest = ControleServices.removeControleEvtAttachmentAsync(
        getState(),
        name
      );
      doRequest.then(
        res => {
          dispatch(controleRemoveEvtAttachmentSuccessAction(res));
          resolve(res);
        },
        err => {
          dispatch(controleRemoveEvtAttachmentFailAction(err));
          reject(err);
        }
      );
    });
    return promise;
  };
} // removeControleEvtAttachment
/////////////////////////////////
