import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IInfoState } from "../../../redux/InfoState";
import { Consult, IConsultProps } from '../presentation/Consult';

//
const getHasStatus = (state: IInfoState): boolean => {
  return state.appstatus.error.length > 0 || state.appstatus.status.length > 0;
};
const getHasAffectation = (state: IInfoState): boolean => {
  return state.appstate.affectationid.length > 0 && state.appstate.matiereid.length > 0;
};
//
const selector = createSelector(
  [
    getHasStatus,
    getHasAffectation
  ],
  (
    hasStatus: boolean,
    hasAffectation: boolean
  ) => {
    return {
      hasAffectation,
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
