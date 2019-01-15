import { connect } from "react-redux";
import { createSelector } from "reselect";

import { IUniteDoc } from 'src/data/DomainData';
import { IInfoState } from 'src/redux/InfoState';
import { InfoDispatch } from '../../../redux/IPayload';
import { IUnitesProps, Unite } from '../presentation/Unite';
import { cancelUniteAction, changeUniteField, createUniteAction, gotoPageUnite, removeUnite, removeUniteAttachment, saveUnite, saveUniteAttachment, selectUnite } from './UniteActions';
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
  [getBusy,getAddMode, getCurrent,getCurrentPage,getDisplayPage,getPagesCount,getItems],
  (busy:boolean,addMode: boolean, current: IUniteDoc,currentPage:number,displayPages:number,pagesCount:number,items:IUniteDoc[]) => {
    return {
      addMode,
      busy,
      current,
      // tslint:disable-next-line:object-literal-sort-keys
      currentPage,displayPages,pagesCount,items
    };
  }
);
//
function mapStateToProps(
  state: IInfoState
): IUnitesProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    refresh: () => {
      dispatch(gotoPageUnite(1));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    gotoPage: (page:number) => {
      dispatch(gotoPageUnite(page));
    },
    selectItem: (docid:string) =>{
      dispatch(selectUnite({id:docid}));
    },
    createItem: () => {
      dispatch(createUniteAction({}));
    },
    onFieldChanged: (val: any, field: string) => {
      dispatch(changeUniteField({ field, value: val }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (mode: string) => {
      switch (mode) {
        case "create":
        dispatch(createUniteAction({}));
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
    onRemoveAttachment: (name: string) => {
      dispatch(removeUniteAttachment(name));
    },
    onSaveAttachment: (name: string, mime: string, data: Blob | Buffer) => {
      dispatch(saveUniteAttachment(name,mime,data));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unite);
//
