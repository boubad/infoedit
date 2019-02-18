import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IAffectationDoc, IOption } from "../../../data/domain/DomainData";
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { Affectation, IAffectationsProps } from "../presentation/Affectation";
import {
  cancelAffectationAction,
  changeAffectationField,
  createAffectation,
  gotoPageAffectation,
  removeAffectation,
  removeAffectationAttachment,
  saveAffectation,
  saveAffectationAttachment,
  selectAffectation
} from "./AffectationActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.affectations.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.affectations.addMode;
};
const getCurrent = (state: IInfoState): IAffectationDoc => {
  return state.affectations.current;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.affectations.currentPage;
};
const getDisplayPage = (state: IInfoState): number => {
  return state.affectations.displayPages;
};
const getPagesCount = (state: IInfoState): number => {
  return state.affectations.pagesCount;
};
const getItems = (state: IInfoState): IAffectationDoc[] => {
  return state.affectations.pageData;
};
const getGroupesOptions = (state: IInfoState): IOption[] => {
  return state.appstate.groupesOptions;
};
const getStartDate = (state: IInfoState): string => {
  return state.appstate.anneeStartDate;
};
const getEndDate = (state: IInfoState): string => {
  return state.appstate.anneeEndDate;
};
//
const selector = createSelector(
  [
    getBusy,
    getAddMode,
    getCurrent,
    getCurrentPage,
    getDisplayPage,
    getPagesCount,
    getItems,
    getGroupesOptions,
    getStartDate,
    getEndDate
  ],
  (
    busy: boolean,
    addMode: boolean,
    current: IAffectationDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IAffectationDoc[],
    groupesOptions: IOption[],
    startDate: string,
    endDate: string
  ) => {
    return {
      addMode,
      busy,
      current,
      currentPage,
      displayPages,
      endDate,
      groupesOptions,
      items,
      pagesCount,
      startDate
    };
  }
);
//
function mapStateToProps(state: IInfoState): IAffectationsProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    refresh: () => {
      dispatch(gotoPageAffectation(1));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    gotoPage: (page: number) => {
      dispatch(gotoPageAffectation(page));
    },
    selectItem: (docid: string) => {
      dispatch(selectAffectation(docid));
    },
    createItem: () => {
      dispatch(createAffectation());
    },
    onFieldChanged: (value: any, field: string) => {
      dispatch(changeAffectationField({ field, value }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (mode: string) => {
      switch (mode) {
        case "create":
          dispatch(createAffectation());
          break;
        case "cancel":
          dispatch(cancelAffectationAction());
          break;
        case "save":
          dispatch(saveAffectation());
          break;
        case "remove":
          dispatch(removeAffectation());
          break;
        default:
          break;
      }
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeAffectationAttachment(name));
    },
    onSaveAttachment: (name: string, mime: string, data: Blob | Buffer) => {
      dispatch(saveAffectationAttachment(name, mime, data));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Affectation);
//
