import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IEtudiantDesc } from "../../../data/DomainData";
import { showEtudiant } from "../../../features/FicheEtudiant/redux/FicheEtudiantActions";
import { IInfoState } from "../../../redux/InfoState";
import { InfoDispatch } from "../../../redux/IPayload";
import { IMatiereStatProps, MatiereStat } from "../presentation/MatiereStat";
//
const getDescs = (state: IInfoState): IEtudiantDesc[] => {
  return state.stats.matiereStats;
};
const getBusy = (state: IInfoState): boolean => {
  return state.appstate.busy || state.stats.busy;
};
const selector = createSelector(
  [getBusy, getDescs],
  (
    busy: boolean,
    descs: IEtudiantDesc[]
  ) => {
    return {
      busy,
      descs
    };
  }
);
//
function mapStateToProps(state: IInfoState): IMatiereStatProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    showDetail: (id: string) => {
      dispatch(showEtudiant(id));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatiereStat);
//
