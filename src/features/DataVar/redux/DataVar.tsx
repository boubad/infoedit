import { connect } from "react-redux";
import { createSelector } from "reselect";

import { IDataVarDoc } from "../../../data/DomainData";
import { IInfoState } from "../../../redux/InfoState";
import { InfoDispatch } from "../../../redux/IPayload";
import { DataVar, IDataVarProps } from "../presentation/DataVar";
import {
  cancelDataVarAction,
  changeDataVarField,
  createDataVar,
  gotoPageDataVar,
  removeDataVar,
  removeDataVarAttachment,
  saveDataVar,
  saveDataVarAttachment,
  selectDataVar
} from "./DataVarActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.unites.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.datavars.addMode;
};
const getCurrent = (state: IInfoState): IDataVarDoc => {
  return state.datavars.current;
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
const getItems = (state: IInfoState): IDataVarDoc[] => {
  return state.datavars.pageData;
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
    current: IDataVarDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IDataVarDoc[]
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
function mapStateToProps(state: IInfoState): IDataVarProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    createItem: () => {
      dispatch(createDataVar());
    },
    gotoPage: (page: number) => {
      dispatch(gotoPageDataVar(page));
    },
    onEditCommand: (mode: string) => {
      switch (mode) {
        case "create":
          dispatch(createDataVar());
          break;
        case "cancel":
          dispatch(cancelDataVarAction());
          break;
        case "save":
          dispatch(saveDataVar());
          break;
        case "remove":
          dispatch(removeDataVar());
          break;
        default:
          break;
      }
    },
    onFieldChanged: (val: any, field: string) => {
      dispatch(changeDataVarField({ field, value: val }));
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeDataVarAttachment(name));
    },
    onSaveAttachment: (name: string, mime: string, data: Blob | Buffer) => {
      dispatch(saveDataVarAttachment(name, mime, data));
    },
    refresh: () => {
      dispatch(gotoPageDataVar(1));
    },
    selectItem: (docid: string) => {
      dispatch(selectDataVar(docid));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataVar);
//
