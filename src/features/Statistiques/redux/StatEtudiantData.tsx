import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { logOutInfoUserAction } from '../../../features/InfoUser/redux/InfoUserActions';
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
const getConnected = (state: IInfoState): boolean => {
  return state.appstate.owner.id.length > 0;
};
const getStringData = (state: IInfoState): string[] => {
  return state.outils.stringData;
};
const selector = createSelector(
  [getBusy, getStringData,getConnected],
  (busy: boolean, stringData: string[],connected:boolean) => {
    return {
      busy,
      connected,
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
    },
    onLogout: () => {
      dispatch(logOutInfoUserAction({}));
    },
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatEtudiantData);
//
