import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IOption } from '../../../data/DomainData';
import { changeAnnee, changeGroupe, changeSemestre, refreshAll } from '../../../features/AppState/redux/AppStateActions';
import { IInfoState } from '../../../redux/InfoState';
import { InfoDispatch } from '../../../redux/IPayload';
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
    getGroupeid,
    getSemestreid,
    getAnneeid,
    getAnnees,
    getGroupes,
    getSemestres
  ],
  (
    busy:boolean,
    groupeid: string,
    semestreid: string,
    anneeid: string,
    annees: IOption[],
    groupes: IOption[],
    semestres: IOption[]
  ) => {
    return {
      anneeid,
      annees,
      busy,
      groupeid,
      groupes,
      semestreid,
      semestres
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
      dispatch(refreshAll());
    },
    ValueChanged: (val: any, s: string) => {
      if (s === "groupeid") {
        dispatch(changeGroupe(val));
      } else if (s === "semestreid") {
        dispatch(changeSemestre(val));
      }  else if (s === "anneeid") {
        dispatch(changeAnnee(val));
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
