import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IEtudiantDesc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { showEtudiant } from "../../../features/FicheEtudiant/redux/FicheEtudiantActions";
import { IMatiereStatProps, MatiereStat } from "../presentation/MatiereStat";
//
const getDescs = (state: IInfoState): IEtudiantDesc[] => {
  return state.stats.matiereStats;
};
const getBusy = (state: IInfoState): boolean => {
  return state.appstate.busy || state.stats.busy;
};
const getMatiereSigle = (state:IInfoState) : string => {
  return state.matieres.current.sigle;
}
const getConnected = (state: IInfoState): boolean => {
  return state.appstate.owner.id.length > 0;
};
const selector = createSelector(
  [getBusy, getDescs,getMatiereSigle,getConnected],
  (
    busy: boolean,
    descs: IEtudiantDesc[],
    matieresigle:string,
    connected:boolean
  ) => {
    return {
      busy,
      connected,
      descs,
      matieresigle
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
