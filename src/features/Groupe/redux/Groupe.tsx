import { connect } from "react-redux";
import { createSelector } from "reselect";

import { IGroupeDoc } from "src/data/DomainData";
import { IInfoState } from "../../../redux/InfoState";
import { InfoDispatch } from "../../../redux/IPayload";
import { Groupe, IGroupesProps } from "../presentation/Groupe";
import {
  cancelGroupeAction,
  changeGroupeField,
  createGroupeAction,
  gotoPageGroupe,
  removeGroupe,
  removeGroupeAttachment,
  saveGroupe,
  saveGroupeAttachment,
  selectGroupe
} from "./GroupeActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.groupes.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.groupes.addMode;
};
const getCurrent = (state: IInfoState): IGroupeDoc => {
  return state.groupes.current;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.groupes.currentPage;
};
const getDisplayPage = (state: IInfoState): number => {
  return state.groupes.displayPages;
};
const getPagesCount = (state: IInfoState): number => {
  return state.groupes.pagesCount;
};

const getItems = (state: IInfoState): IGroupeDoc[] => {
  return state.groupes.pageData;
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
    current: IGroupeDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IGroupeDoc[]
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
function mapStateToProps(state: IInfoState): IGroupesProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    refresh: () => {
      dispatch(gotoPageGroupe(1));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    gotoPage: (page: number) => {
      dispatch(gotoPageGroupe(page));
    },
    selectItem: (docid: string) => {
      dispatch(selectGroupe({ id: docid }));
    },
    createItem: () => {
      dispatch(createGroupeAction({}));
    },
    onFieldChanged: (val: any, field: string) => {
      dispatch(changeGroupeField({ field, value: val }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (mode: string) => {
      switch (mode) {
        case "create":
          dispatch(createGroupeAction({}));
          break;
        case "cancel":
          dispatch(cancelGroupeAction({}));
          break;
        case "save":
          dispatch(saveGroupe());
          break;
        case "remove":
          dispatch(removeGroupe());
          break;
        default:
          break;
      }
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeGroupeAttachment(name));
    },
    onSaveAttachment: (name: string, mime: string, data: Blob | Buffer) => {
      dispatch(saveGroupeAttachment(name, mime, data));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groupe);
//
