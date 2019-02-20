import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IMatiereDoc, IOption } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { IMatieresProps, Matiere } from "../presentation/Matiere";
import {
  cancelMatiereAction,
  changeMatiereField,
  createMatiere,
  gotoPageMatiere,
  removeMatiere,
  removeMatiereAttachment,
  saveMatiere,
  saveMatiereAttachment,
  selectMatiere
} from "./MatiereActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.matieres.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.matieres.addMode;
};
const getCurrent = (state: IInfoState): IMatiereDoc => {
  return state.matieres.current;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.matieres.currentPage;
};
const getDisplayPage = (state: IInfoState): number => {
  return state.matieres.displayPages;
};
const getPagesCount = (state: IInfoState): number => {
  return state.matieres.pagesCount;
};

const getItems = (state: IInfoState): IMatiereDoc[] => {
  return state.matieres.pageData;
};
const getItemOptions = (state: IInfoState): IOption[] => {
  const pRet:IOption[] = [{id:'',text:''}];
  state.unites.pageData.forEach((x) =>{
    pRet.push({id:x.id,text:x.sigle});
  });
  return pRet;
};
const getUniteid = (state: IInfoState): string => {
  return state.unites.current.id;
};
const selector = createSelector(
  [
    getBusy,
    getAddMode,
    getCurrent,
    getCurrentPage,
    getDisplayPage,
    getPagesCount,
    getItems,
    getItemOptions,
    getUniteid
  ],
  (
    busy: boolean,
    addMode: boolean,
    current: IMatiereDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IMatiereDoc[],
    itemOptions: IOption[],
    uniteid: string
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
      items,
      itemOptions,
      uniteid
    };
  }
);
//
function mapStateToProps(state: IInfoState): IMatieresProps {
  return selector(state);
} // mapStateToProps
//
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    refresh: () => {
      dispatch(gotoPageMatiere(1));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    gotoPage: (page: number) => {
      dispatch(gotoPageMatiere(page));
    },
    selectItem: (docid: string) => {
      dispatch(selectMatiere(docid));
    },
    createItem: () => {
      dispatch(createMatiere());
    },
    onFieldChanged: (val: any, field: string) => {
      dispatch(changeMatiereField({ field, value: val }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (mode: string) => {
      switch (mode) {
        case "create":
          dispatch(createMatiere());
          break;
        case "cancel":
          dispatch(cancelMatiereAction({}));
          break;
        case "save":
          dispatch(saveMatiere());
          break;
        case "remove":
          dispatch(removeMatiere());
          break;
        default:
          break;
      }
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeMatiereAttachment(name));
    },
    onSaveAttachment: (name: string, mime: string, data: Blob | Buffer) => {
      dispatch(saveMatiereAttachment(name, mime, data));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matiere);
//
