import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IOption } from '../../../data/DomainData';
import { IInfoState } from '../../../redux/InfoState';
import { InfoDispatch } from '../../../redux/IPayload';
import { AppState, IAppStateProps } from '../presentation/AppState';
import { changeAnnee, changeGroupe, changeMatiere, changeSemestre, changeUnite } from './AppStateActions';
//
const getBusy = (state: IInfoState) : boolean => {
  return state.appstate.busy || state.annees.busy || state.semestres.busy || state.groupes.busy || state.unites.busy || state.matieres.busy || state.outils.busy || state.affectations.busy || state.etudaffectations.busy || state.details.busy || state.appstatus.busy;
};
const getUniteid = (state: IInfoState): string => {
  return state.appstate.uniteid;
};
const getUnites = (state: IInfoState): IOption[] => {
  return state.appstate.unitesOptions;
};
const getGroupeid = (state: IInfoState): string => {
  return state.appstate.groupeid;
};
const getSemestreid = (state: IInfoState): string => {
  return state.appstate.semestreid;
};
const getMatiereid = (state: IInfoState): string => {
  return state.appstate.matiereid;
};
const getAnneeid = (state: IInfoState): string => {
  return state.appstate.anneeid;
};
const getMatieres = (state: IInfoState): IOption[] => {
  return state.appstate.matieresOptions;
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
//
const selector = createSelector(
  [
    getBusy,
    getUniteid,
    getUnites,
    getGroupeid,
    getSemestreid,
    getMatiereid,
    getAnneeid,
    getAnnees,
    getMatieres,
    getGroupes,
    getSemestres
  ],
  (
    busy:boolean,
    uniteid: string,
    unites: IOption[],
    groupeid: string,
    semestreid: string,
    matiereid: string,
    anneeid: string,
    annees: IOption[],
    matieres: IOption[],
    groupes: IOption[],
    semestres: IOption[]
  ) => {
    return {
      busy,
      uniteid,
      unites,
      // tslint:disable-next-line:object-literal-sort-keys
      groupeid,
      semestreid,
      matiereid,
      anneeid,
      annees,
      matieres,
      groupes,
      semestres
    };
  }
);
//
function mapStateToProps(state: IInfoState): IAppStateProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    ValueChanged: (val: any, s: string) => {
      if (s === "groupeid") {
        dispatch(changeGroupe(val));
      } else if (s === "semestreid") {
        dispatch(changeSemestre(val));
      } else if (s === "matiereid") {
        dispatch(changeMatiere(val));
      } else if (s === "anneeid") {
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
)(AppState);
//
