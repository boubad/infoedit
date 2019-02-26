import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IInfoUserDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { IInfoUsersProps, InfoUser } from '../presentation/InfoUser';
import {
  cancelInfoUserAction,
  changeInfoUserFieldAction,
  createInfoUserAction,
  gotoPageInfoUser,
  removeInfoUser,
  removeInfoUserAttachment,
  saveInfoUser,
  saveInfoUserAttachment,
  selectInfoUser,
  setInfoUserAvatar
} from "./InfoUserActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.users.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.users.addMode;
};
const getCurrent = (state: IInfoState): IInfoUserDoc => {
  return state.users.current;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.users.currentPage;
};
const getDisplayPages = (state: IInfoState): number => {
  return state.users.displayPages;
};
const getPagesCount = (state: IInfoState): number => {
  return state.users.pagesCount;
};
const getItems = (state: IInfoState): IInfoUserDoc[] => {
  return state.users.pageData;
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
    getItems
  ],
  (
    busy:boolean,
    addMode: boolean,
    current: IInfoUserDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IInfoUserDoc[],
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
    };
  }
);
//
function mapStateToProps(state: IInfoState): IInfoUsersProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    onFieldChanged: (value: any, propname: string) => {
      dispatch(changeInfoUserFieldAction({ field: propname, value }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (arg: string) => {
      switch (arg) {
        case "create":
          dispatch(createInfoUserAction({}));
          break;
        case "cancel":
          dispatch(cancelInfoUserAction({}));
          break;
        case "save":
          dispatch(saveInfoUser());
          break;
        case "remove":
          dispatch(removeInfoUser());
          break;
        default:
          break;
      }
    },
    onSaveAttachment: (name: string, mime: string, data: Blob) => {
      dispatch(saveInfoUserAttachment(name, mime, data));
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeInfoUserAttachment(name));
    },
    onSetAvatar: (name: string) => {
      dispatch(setInfoUserAvatar(name));
    },
    refresh: () => {
      dispatch(gotoPageInfoUser(1));
    },
    gotoPage: (page: number) => {
      dispatch(gotoPageInfoUser(page));
    },
    selectItem: (docid: string) => {
      dispatch(selectInfoUser(docid));
    },
    //
    createItem: () => {
      dispatch(createInfoUserAction());
    },
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoUser);
//
