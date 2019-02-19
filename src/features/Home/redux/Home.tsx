import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IOption } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { changeAnnee, changeGroupe, changeSemestre, changeUnite, refreshGlobal } from '../../../features/AppState/redux/AppStateActions';
import { Home, IHomeProps } from '../presentation/Home';
//
const getBusy = (state: IInfoState) : boolean => {
  return state.appstate.busy || state.annees.busy || state.semestres.busy || state.groupes.busy || state.unites.busy || state.matieres.busy || state.outils.busy || state.affectations.busy || state.etudaffectations.busy || state.details.busy || state.appstatus.busy;
};
const getGroupeid = (state: IInfoState): string => {
  return state.appstate.groupeid;
};
const getSemestreid = (state: IInfoState): string => {
  return state.appstate.semestreid;
};
const getAnneeid = (state: IInfoState): string => {
  return state.appstate.anneeid;
};
const getUniteid = (state: IInfoState): string => {
  return state.appstate.uniteid;
};
const getAnnees = (state: IInfoState): IOption[] => {
  return state.appstate.anneesOptions;
};
const getGroupes = (state: IInfoState): IOption[] => {
  return state.appstate.groupesOptions;
};
const getSemestres = (state: IInfoState): IOption[] => {
  return state.appstate.semestresOptions;
};
const getUnites = (state: IInfoState): IOption[] => {
  return state.appstate.unitesOptions;
};
//
const selector = createSelector(
  [
    getBusy,
    getGroupeid,
    getSemestreid,
    getAnneeid,
    getAnnees,
    getGroupes,
    getSemestres,
    getUniteid,
    getUnites
  ],
  (
    busy:boolean,
    groupeid: string,
    semestreid: string,
    anneeid: string,
    annees: IOption[],
    groupes: IOption[],
    semestres: IOption[],
    uniteid:string,
    unites:IOption[]
  ) => {
    return {
      anneeid,
      annees,
      busy,
      groupeid,
      groupes,
      semestreid,
      semestres,
      uniteid,
      unites
    };
  }
);
//
function mapStateToProps(state: IInfoState): IHomeProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    RefreshAll: () => {
      dispatch(refreshGlobal());
    },
    ValueChanged: (val: any, s: string) => {
      if (s === "groupeid") {
        dispatch(changeGroupe(val));
      } else if (s === "semestreid") {
        dispatch(changeSemestre(val));
      }  else if (s === "anneeid") {
        dispatch(changeAnnee(val));
      } else if (s === "uniteid") {
        dispatch(changeUnite(val));
      } 
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
//
