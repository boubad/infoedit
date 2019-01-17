import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IEtudAffectationDoc, IOption } from "src/data/DomainData";
import { IInfoState } from "src/redux/InfoState";
import { InfoDispatch } from "../../../redux/IPayload";
import {
  EtudAffectation,
  IEtudAffectationsProps
} from "../presentation/EtudAffectation";
import {
  cancelEtudAffectationAction,
  changeEtudAffectationField,
  createEtudAffectation,
  gotoPageEtudAffectation,
  removeEtudAffectation,
  removeEtudAffectationAttachment,
  saveEtudAffectation,
  saveEtudAffectationAttachment,
  selectEtudAffectation
} from "./EtudAffectationActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.etudaffectations.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.etudaffectations.addMode;
};
const getCurrent = (state: IInfoState): IEtudAffectationDoc => {
  return state.etudaffectations.current;
};
const getCurrentPage = (state: IInfoState): number => {
  return state.etudaffectations.currentPage;
};
const getDisplayPage = (state: IInfoState): number => {
  return state.etudaffectations.displayPages;
};
const getPagesCount = (state: IInfoState): number => {
  return state.etudaffectations.pagesCount;
};
const getItems = (state: IInfoState): IEtudAffectationDoc[] => {
  return state.etudaffectations.pageData;
};
const getEtudiantsOptions = (state: IInfoState): IOption[] => {
  return state.outils.freeEtudiantsOpts;
};
const getStartDate = (state: IInfoState): string => {
  return state.appstate.semestreStartDate;
};
const getEndDate = (state: IInfoState): string => {
  return state.appstate.semestreEndDate;
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
    getEtudiantsOptions,
    getStartDate,
    getEndDate
  ],
  (
    busy: boolean,
    addMode: boolean,
    current: IEtudAffectationDoc,
    currentPage: number,
    displayPages: number,
    pagesCount: number,
    items: IEtudAffectationDoc[],
    etudiantsOptions: IOption[],
    startDate: string,
    endDate: string
  ) => {
    return {
      addMode,
      etudiantsOptions,
      // tslint:disable-next-line:object-literal-sort-keys
      busy,
      current,
      currentPage,
      displayPages,
      items,
      pagesCount,
      endDate,
      startDate
    };
  }
);
//
function mapStateToProps(state: IInfoState): IEtudAffectationsProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    refresh: () => {
      dispatch(gotoPageEtudAffectation(1));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    gotoPage: (page: number) => {
      dispatch(gotoPageEtudAffectation(page));
    },
    selectItem: (docid: string) => {
      dispatch(selectEtudAffectation(docid));
    },
    createItem: () => {
      dispatch(createEtudAffectation());
    },
    onFieldChanged: (value: any, field: string) => {
      dispatch(changeEtudAffectationField({ field, value }));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onEditCommand: (mode: string) => {
      switch (mode) {
        case "create":
          dispatch(createEtudAffectation());
          break;
        case "cancel":
          dispatch(cancelEtudAffectationAction());
          break;
        case "save":
          dispatch(saveEtudAffectation());
          break;
        case "remove":
          dispatch(removeEtudAffectation());
          break;
        default:
          break;
      }
    },
    onRemoveAttachment: (name: string) => {
      dispatch(removeEtudAffectationAttachment(name));
    },
    onSaveAttachment: (name: string, mime: string, data: Blob | Buffer) => {
      dispatch(saveEtudAffectationAttachment(name, mime, data));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudAffectation);
//
