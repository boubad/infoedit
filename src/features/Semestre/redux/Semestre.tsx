import { connect } from "react-redux";
import { createSelector } from "reselect";
import { ISemestreDoc } from "../../../data/DomainData";
import { IInfoState } from "../../../redux/InfoState";
import { InfoDispatch } from "../../../redux/IPayload";
import { ISemestresProps, Semestre } from "../presentation/Semestre";
import {
  cancelSemestreAction,
  changeSemestreField,
  createSemestreAction,
  gotoPageSemestre,
  removeSemestre,
  removeSemestreAttachment,
  saveSemestre,
  saveSemestreAttachment,
  selectSemestre
} from "./SemestreActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.semestres.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.semestres.addMode;
};
const getCurrent = (state: IInfoState): ISemestreDoc => {
  return state.semestres.current;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.semestres.currentPage;
};
const getDisplayPage = (state: IInfoState): number => {
  return state.semestres.displayPages;
};
const getPagesCount = (state: IInfoState): number => {
  return state.semestres.pagesCount;
};
const getItems = (state: IInfoState): ISemestreDoc[] => {
  return state.semestres.pageData;
};
const selector = createSelector(
  [
    getBusy,
    getAddMode,
    getCurrent,
    getCurrentPage,
    getDisplayPage,
    getPagesCount,
    getItems
  ],
  (
    busy: boolean,
    addMode: boolean,
    current: ISemestreDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: ISemestreDoc[]
  ) => {
    return {
      addMode,
      busy,
      current,
      // tslint:disable-next-line:object-literal-sort-keys
      currentPage,
      displayPages,
      pagesCount,
      // tslint:disable-next-line:object-literal-sort-keys
      items
    };
  }
);
//
function mapStateToProps(state: IInfoState): ISemestresProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    refresh: () => {
      dispatch(gotoPageSemestre(1));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    gotoPage: (page: number) => {
      dispatch(gotoPageSemestre(page));
    },
    selectItem: (docid: string) => {
      dispatch(selectSemestre({ id: docid }));
    },
    createItem: () => {
      dispatch(createSemestreAction({}));
    },
    onFieldChanged: (val: any, field: string) => {
      dispatch(changeSemestreField({ field, value: val }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (mode: string) => {
      switch (mode) {
        case "create":
          dispatch(createSemestreAction({}));
          break;
        case "cancel":
          dispatch(cancelSemestreAction({}));
          break;
        case "save":
          dispatch(saveSemestre());
          break;
        case "remove":
          dispatch(removeSemestre());
          break;
        default:
          break;
      }
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeSemestreAttachment(name));
    },
    onSaveAttachment: (name: string, mime: string, data: Blob | Buffer) => {
      dispatch(saveSemestreAttachment(name, mime, data));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Semestre);
//
