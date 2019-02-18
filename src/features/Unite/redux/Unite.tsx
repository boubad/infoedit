import { connect } from "react-redux";
import { createSelector } from "reselect";

import { IUniteDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { IUnitesProps, Unite } from "../presentation/Unite";
import {
  cancelUniteAction,
  changeUniteField,
  createUnite,
  gotoPageUnite,
  removeUnite,
  removeUniteAttachment,
  saveUnite,
  saveUniteAttachment,
  selectUnite
} from "./UniteActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.unites.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.unites.addMode;
};
const getCurrent = (state: IInfoState): IUniteDoc => {
  return state.unites.current;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.unites.currentPage;
};
const getDisplayPage = (state: IInfoState): number => {
  return state.unites.displayPages;
};
const getPagesCount = (state: IInfoState): number => {
  return state.unites.pagesCount;
};
const getItems = (state: IInfoState): IUniteDoc[] => {
  return state.unites.pageData;
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
    current: IUniteDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IUniteDoc[]
  ) => {
    return {
      addMode,
      busy,
      current,
      currentPage,
      displayPages,
      items,
      pagesCount
    };
  }
);
//
function mapStateToProps(state: IInfoState): IUnitesProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    createItem: () => {
      dispatch(createUnite());
    },
    gotoPage: (page: number) => {
      dispatch(gotoPageUnite(page));
    },
    onEditCommand: (mode: string) => {
      switch (mode) {
        case "create":
          dispatch(createUnite());
          break;
        case "cancel":
          dispatch(cancelUniteAction({}));
          break;
        case "save":
          dispatch(saveUnite());
          break;
        case "remove":
          dispatch(removeUnite());
          break;
        default:
          break;
      }
    },
    onFieldChanged: (val: any, field: string) => {
      dispatch(changeUniteField({ field, value: val }));
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeUniteAttachment(name));
    },
    onSaveAttachment: (name: string, mime: string, data: Blob | Buffer) => {
      dispatch(saveUniteAttachment(name, mime, data));
    },
    refresh: () => {
      dispatch(gotoPageUnite(1));
    },
    selectItem: (docid: string) => {
      dispatch(selectUnite(docid));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unite);
//
