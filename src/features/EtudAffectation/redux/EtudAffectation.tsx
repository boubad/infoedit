import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IEtudAffectationDoc, IOption } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { showEtudiant } from '../../../features/FicheEtudiant/redux/FicheEtudiantActions';
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
const getCurrentOptions = (state: IInfoState) : IOption[] => {
   const pRet:IOption[] = [];
   const vv = state.etudaffectations.pageData;
   const n = vv.length;
   for (let i = 0; i < n; i++){
    const x = vv[i];
    pRet.push({
      id: x.etudiantid,
      text: x.fullname,
      url: x.url
    });
   }// i
   return pRet;
};
const getStartDate = (state: IInfoState): string => {
  return state.affectations.current.startdate;
};
const getEndDate = (state: IInfoState): string => {
  return state.affectations.current.enddate;
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
    getEndDate,
    getCurrentOptions
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
    endDate: string,
    currentOptions: IOption[]
  ) => {
    return {
      addMode,
      busy,
      current,
      currentOptions,
      currentPage,
      displayPages,
      endDate,
      etudiantsOptions,
      items,
      pagesCount,
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
    },
    showDetail: (id:string) => {
      dispatch(showEtudiant(id));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudAffectation);
//
