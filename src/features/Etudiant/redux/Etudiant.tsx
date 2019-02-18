import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IEtudiantDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { Etudiant, IEtudiantsProps } from '../presentation/Etudiant';
import {
  cancelEtudiantAction,
  changeEtudiantFieldAction,
  changeEtudiantStatus,
  createEtudiantAction,
  gotoPageEtudiant,
  removeEtudiant,
  removeEtudiantAttachment,
  saveEtudiant,
  saveEtudiantAttachment,
  selectEtudiant,
  setEtudiantAvatar
} from "./EtudiantActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.etudiants.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.etudiants.addMode;
};
const getCurrent = (state: IInfoState): IEtudiantDoc => {
  return state.etudiants.current;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.etudiants.currentPage;
};
const getDisplayPages = (state: IInfoState): number => {
  return state.etudiants.displayPages;
};
const getPagesCount = (state: IInfoState): number => {
  return state.etudiants.pagesCount;
};
const getItems = (state: IInfoState): IEtudiantDoc[] => {
  return state.etudiants.pageData;
};
const getStatus = (state: IInfoState): string => {
  return state.etudiants.etudiantStatus;
};
//
const selector = createSelector(
  [
    getBusy,
    getAddMode,
    getCurrent,
    getCurrentPage,
    getDisplayPages,
    getPagesCount,
    getItems,
    getStatus
  ],
  (
    busy:boolean,
    addMode: boolean,
    current: IEtudiantDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IEtudiantDoc[],
    status:string
  ) => {
    return {
      addMode,
      busy,
      current,
      currentPage,
      displayPages,
      pagesCount,
      // tslint:disable-next-line:object-literal-sort-keys
      items,
      status
    };
  }
);
//
function mapStateToProps(state: IInfoState): IEtudiantsProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    onFieldChanged: (value: any, propname: string) => {
      dispatch(changeEtudiantFieldAction({ field: propname, value }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (arg: string) => {
      switch (arg) {
        case "create":
          dispatch(createEtudiantAction({}));
          break;
        case "cancel":
          dispatch(cancelEtudiantAction({}));
          break;
        case "save":
          dispatch(saveEtudiant());
          break;
        case "remove":
          dispatch(removeEtudiant());
          break;
        default:
          break;
      }
    },
    onSaveAttachment: (name: string, mime: string, data: Blob) => {
      dispatch(saveEtudiantAttachment(name, mime, data));
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeEtudiantAttachment(name));
    },
    onSetAvatar: (name: string) => {
      dispatch(setEtudiantAvatar(name));
    },
    refresh: () => {
      dispatch(gotoPageEtudiant(1));
    },
    gotoPage: (page: number) => {
      dispatch(gotoPageEtudiant(page));
    },
    selectItem: (docid: string) => {
      dispatch(selectEtudiant(docid));
    },
    //
    createItem: () => {
      dispatch(createEtudiantAction());
    },
    onStatusChanged: (status:string) => {
      dispatch(changeEtudiantStatus(status));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Etudiant);
//
