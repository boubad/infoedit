import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IControleDoc, IEvtDoc, INoteDoc, IOption } from "src/data/DomainData";
import { IInfoState } from "src/redux/InfoState";
import { showEtudiant } from '../../../features/FicheEtudiant/redux/FicheEtudiantActions';
import { InfoDispatch } from "../../../redux/IPayload";
import { Controle, IControlesProps } from "../presentation/Controle";
import {
  cancelControleAction,
  cancelControleEvtAction,
  cancelControleNoteAction,
  changeControle,
  changeControleEvtFieldAction,
  changeControleFieldAction,
  changeControleNoteFieldAction,
  checkControleNotes,
  createControle,
  createControleEvt,
  gotoPageControle,
  removeControle,
  removeControleAttachment,
  removeControleEvt,
  removeControleEvtAttachment,
  removeControleNoteAttachment,
  saveControle,
  saveControleAttachment,
  saveControleEvt,
  saveControleEvtAttachment,
  saveControleNote,
  saveControleNoteAttachment,
  selectControleEvt,
  selectControleNote,
} from "./ControleActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.controles.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.controles.addMode;
};
const getCurrent = (state: IInfoState): IControleDoc => {
  return state.controles.current;
};
const getStartDate = (state: IInfoState): string => {
  return state.appstate.semestreStartDate;
};
const getEndDate = (state: IInfoState): string => {
  return state.appstate.semestreEndDate;
};
const getEtudAffectations = (state: IInfoState): IOption[] => {
  return state.controles.etudiantsOptions;
};
const getCurrentNote = (state: IInfoState): INoteDoc => {
  return state.controles.note;
};
const getCurrentEvt = (state: IInfoState): IEvtDoc => {
  return state.controles.evt;
};
const getEvtAddMode = (state: IInfoState): boolean => {
  return state.controles.evtAddMode;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.controles.currentPage;
};
const getDisplayPages = (state: IInfoState): number => {
  return state.controles.currentPage;
};
const getPagesCount = (state: IInfoState): number => {
  return state.controles.pagesCount;
};
const getItems = (state: IInfoState): IControleDoc[] => {
  return state.controles.pageData;
};
//
const selector = createSelector(
  [
    getBusy,
    getAddMode,
    getCurrent,
    getStartDate,
    getEndDate,
    getEtudAffectations,
    getCurrentNote,
    getCurrentEvt,
    getEvtAddMode,
    getCurrentPage,
    getDisplayPages,
    getPagesCount,
    getItems
  ],
  (
    busy: boolean,
    addMode: boolean,
    current: IControleDoc,
    startDate: string,
    endDate: string,
    etudAffectations: IOption[],
    currentNote: INoteDoc,
    currentEvt: IEvtDoc,
    evtAddMode: boolean,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IControleDoc[]
  ) => {
    return {
      busy,
      // tslint:disable-next-line:object-literal-sort-keys
      addMode,
      current,
      startDate,
      // tslint:disable-next-line:object-literal-sort-keys
      endDate,
      etudAffectations,
      currentNote,
      currentEvt,
      evtAddMode,
      currentPage,
      displayPages,
      pagesCount,
      items
    };
  }
);
//
function mapStateToProps(state: IInfoState): IControlesProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    onFieldChanged: (val: any, propname: string) => {
      dispatch(changeControleFieldAction({ field: propname, value: val }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (arg: string) => {
      switch (arg) {
        case "create":
          dispatch(createControle());
          break;
        case "cancel":
          dispatch(cancelControleAction({}));
          break;
        case "save":
          dispatch(saveControle());
          break;
        case "remove":
          dispatch(removeControle());
          break;
        default:
          break;
      }
    },
    onSaveAttachment: (name: string, mime: string, data: Blob) => {
      dispatch(saveControleAttachment(name, mime, data));
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeControleAttachment(name));
    },
    onCheck: () => {
      dispatch(checkControleNotes());
    },
    onNoteSelectItem: (id: string) => {
      dispatch(selectControleNote(id));
    },
    onNoteFieldChanged: (value: any, propname: string) => {
      dispatch(changeControleNoteFieldAction({ field: propname, value }));
    },
    onNoteEditCommand: (arg: string) => {
      switch (arg) {
        case "cancel":
          dispatch(cancelControleNoteAction());
          break;
        case "save":
          dispatch(saveControleNote());
          break;
        default:
          break;
      }
    },
    onNoteSaveAttachment: (name: string, mime: string, data: Blob) => {
      dispatch(saveControleNoteAttachment(name, mime, data));
    },
    onNoteRemoveAttachment: (name: string) => {
      dispatch(removeControleNoteAttachment(name));
    },
    onEvtSelectItem: (id: string) => {
      dispatch(selectControleEvt(id));
    },
    onEvtFieldChanged: (value: any, propname: string) => {
      dispatch(changeControleEvtFieldAction({ field: propname, value }));
    },
    onEvtEditCommand: (arg: string) => {
      switch (arg) {
        case "create":
          dispatch(createControleEvt());
          break;
        case "cancel":
          dispatch(cancelControleEvtAction({}));
          break;
        case "save":
          dispatch(saveControleEvt());
          break;
        case "remove":
          dispatch(removeControleEvt());
          break;
        default:
          break;
      }
    },
    onEvtSaveAttachment: (name: string, mime: string, data: Blob) => {
      dispatch(saveControleEvtAttachment(name, mime, data));
    },
    onEvtRemoveAttachment: (name: string) => {
      dispatch(removeControleEvtAttachment(name));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    createItem: () => {
      dispatch(createControle());
    },
    refresh: () => {
      dispatch(gotoPageControle(1));
    },
    gotoPage: (page: number) => {
      dispatch(gotoPageControle(page));
    },
    selectItem: (id: string) => {
      dispatch(changeControle(id));
    },
    onShowDetail: (id:string) => {
      dispatch(showEtudiant(id));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controle);
//
