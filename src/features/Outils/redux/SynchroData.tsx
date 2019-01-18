import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IInfoState } from "src/redux/InfoState";
import { InfoDispatch } from "../../../redux/IPayload";
import { ISynchoDataProps, SynchroData } from "../presentation/SynchroData";
import { syncData } from "./OutilsActions";

//
const getBusy = (state: IInfoState): boolean => {
  return (
    state.appstate.busy ||
    state.annees.busy ||
    state.semestres.busy ||
    state.groupes.busy ||
    state.unites.busy ||
    state.matieres.busy ||
    state.outils.busy ||
    state.affectations.busy ||
    state.etudaffectations.busy ||
    state.details.busy ||
    state.appstatus.busy
  );
};
const selector = createSelector(
  [getBusy],
  (busy: boolean) => {
    return {
      busy
    };
  }
);
//
function mapStateToProps(state: IInfoState): ISynchoDataProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    doSync: () => {
      dispatch(syncData());
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SynchroData);
//
