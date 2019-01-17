import { FluxStandardAction } from "flux-standard-action";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { IEtudiantDoc } from "../../../data/DomainData";
import { removeEtudiantAttachment, saveEtudiantAttachment, setEtudiantAvatar } from '../../../features/Etudiant/redux/EtudiantActions';
import { IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";
import { FicheEtudiant, IFicheEtudiantProps } from '../presentation/FicheEtudiant';
//
const getBusy = (state: IInfoState): boolean => {
  return state.details.busy;
};
const getCurrent = (state: IInfoState): IEtudiantDoc => {
  return state.details.ficheEtudiant;
};
//
const selector = createSelector(
  [getBusy, getCurrent],
  (busy: boolean,  current: IEtudiantDoc) => {
    return {
      busy,
      current
    };
  }
);
//
function mapStateToProps(
  state: IInfoState
): IFicheEtudiantProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: Dispatch<FluxStandardAction<IPayload>>) {
  return {
    // tslint:disable-next-line:object-literal-sort-keys
    onSaveAttachment: (name: string, mime: string, data: Blob) => {
      dispatch(saveEtudiantAttachment(name, mime, data));
    },
    // tslint:disable-next-line:object-literal-sort-keys
    onRemoveAttachment: (name: string) => {
      dispatch(removeEtudiantAttachment(name));
    },
    onSetAvatar: (name: string) => {
      dispatch(setEtudiantAvatar(name));
    },
    //
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FicheEtudiant);
//
