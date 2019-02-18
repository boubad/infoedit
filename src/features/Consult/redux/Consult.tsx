import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IInfoState } from '../../../data/state/InfoState';
import { Consult, IConsultProps } from '../presentation/Consult';

//
const getHasStatus = (state: IInfoState): boolean => {
  return state.appstatus.error.length > 0 || state.appstatus.status.length > 0;
};
const getHasAffectation = (state: IInfoState): boolean => {
  return state.appstate.affectationid.length > 0;
};
const getHasMatiere = (state: IInfoState): boolean => {
  return state.appstate.matiereid.length > 0;
};
const getCanStatMatiere = (state: IInfoState) : boolean =>{
  return state.appstate.anneeid.length > 0 && state.appstate.semestreid.length > 0 && state.appstate.matiereid.length > 0;
}
//
const selector = createSelector(
  [
    getHasStatus,
    getHasAffectation,
    getCanStatMatiere,
    getHasMatiere,
  ],
  (
    hasStatus: boolean,
    hasAffectation: boolean,
    canStatMatiere:boolean,
    hasMatiere:boolean
  ) => {
    return {
      canStatMatiere,
      hasAffectation,
      hasMatiere,
      hasStatus,
    };
  }
);
function mapStateToProps(state: IInfoState): IConsultProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps() {
  return {};
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Consult);
