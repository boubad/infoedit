import { connect } from "react-redux";
import { createSelector } from "reselect";

import { IAnneeDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { Annee, IAnneeProps } from "../presentation/Annee";
import {
  cancelAnneeAction,
  changeAnneeField,
  createAnnee,
  gotoPageAnnee,
  removeAnnee,
  removeAnneeAttachment,
  saveAnnee,
  saveAnneeAttachment,
  selectAnnee
} from "./AnneeActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.annees.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.annees.addMode;
};
const getCurrent = (state: IInfoState): IAnneeDoc => {
  return state.annees.current;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.annees.currentPage;
};
const getDisplayPage = (state: IInfoState): number => {
  return state.annees.displayPages;
};
const getPagesCount = (state: IInfoState): number => {
  return state.annees.pagesCount;
};
const getItems = (state: IInfoState): IAnneeDoc[] => {
  return state.annees.pageData;
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
    current: IAnneeDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IAnneeDoc[]
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
function mapStateToProps(state: IInfoState): IAnneeProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    refresh: () => {
      dispatch(gotoPageAnnee(1));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    gotoPage: (page: number) => {
      dispatch(gotoPageAnnee(page));
    },
    selectItem: (docid: string) => {
      dispatch(selectAnnee(docid));
    },
    createItem: () => {
      dispatch(createAnnee());
    },
    onFieldChanged: (val: any, field: string) => {
      dispatch(changeAnneeField({ field, value: val }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (mode: string) => {
      switch (mode) {
        case "create":
          dispatch(createAnnee());
          break;
        case "cancel":
          dispatch(cancelAnneeAction({}));
          break;
        case "save":
          dispatch(saveAnnee());
          break;
        case "remove":
          dispatch(removeAnnee());
          break;
        default:
          break;
      }
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeAnneeAttachment(name));
    },
    onSaveAttachment: (name: string, mime: string, data: Blob | Buffer) => {
      dispatch(saveAnneeAttachment(name, mime, data));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Annee);
//
