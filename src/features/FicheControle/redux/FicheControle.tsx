import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IControleDoc } from "../../../data/DomainData";
import { showEtudiant } from '../../../features/FicheEtudiant/redux/FicheEtudiantActions';
import { IInfoState } from "../../../redux/InfoState";
import { InfoDispatch } from "../../../redux/IPayload";
import { FicheControle, IFicheControleProps } from '../presentation/FicheControle';
//
const getBusy = (state: IInfoState): boolean => {
  return state.details.busy;
};
const getCurrent = (state: IInfoState): IControleDoc => {
  return state.details.ficheControle;
};
//
const selector = createSelector(
  [getBusy, getCurrent],
  (busy: boolean,  current: IControleDoc) => {
    return {
      busy,
      current
    };
  }
);
//
function mapStateToProps(
  state: IInfoState
): IFicheControleProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    onShowDetail: (id:string) => {
        dispatch(showEtudiant(id));
    }
    //
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FicheControle);
//