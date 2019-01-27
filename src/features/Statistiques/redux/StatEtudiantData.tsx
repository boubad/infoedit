import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IInfoState } from "src/redux/InfoState";
import { InfoDispatch } from "../../../redux/IPayload";
import { getStatData } from "../../Outils/redux/OutilsActions";
import {
  IStatEtudiantDataProps,
  StatEtudiantData
} from "../presentation/StatEtudiantData";

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
const getStringData = (state: IInfoState): string[] => {
  return state.outils.stringData;
};
const selector = createSelector(
  [getBusy, getStringData],
  (busy: boolean, stringData: string[]) => {
    return {
      busy,
      stringData
    };
  }
);
//
function mapStateToProps(state: IInfoState): IStatEtudiantDataProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    doCheck: () => {
      dispatch(getStatData());
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatEtudiantData);
//
