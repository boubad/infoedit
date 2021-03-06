import { FluxStandardAction } from "flux-standard-action";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { IEtudiantDoc } from "../../../data/DomainData";
import { IInfoState } from "../../../redux/InfoState";
import { IPayload } from "../../../redux/IPayload";
import EtudiantDetail, {
  IEtudiantDetailProps
} from "../presentation/EtudiantDetail";
import {
  removeEtudiantAttachment,
  saveEtudiantAttachment,
  selectEtudiant,
  setEtudiantAvatar
} from "./EtudiantActions";
//
const getBusy = (state: IInfoState): boolean => {
  return state.etudiants.busy;
};
const getAddMode = (state: IInfoState): boolean => {
  return state.etudiants.addMode;
};
const getCurrent = (state: IInfoState): IEtudiantDoc => {
  return state.etudiants.current;
};
//
const selector = createSelector(
  [getBusy, getAddMode, getCurrent],
  (busy: boolean, addMode: boolean, current: IEtudiantDoc) => {
    return {
      addMode,
      busy,
      current
    };
  }
);
//
function mapStateToProps(
  state: IInfoState,
  ownerProps?: any
): IEtudiantDetailProps {
  const pRet = selector(state) as IEtudiantDetailProps;
  if (ownerProps) {
    const xx = Object.assign(pRet, ownerProps);
    return xx;
  } else {
    return pRet;
  } // ownerProps
  return pRet;
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
    onSelectCurrent: (docid: string) => {
      dispatch(selectEtudiant(docid));
    }
    //
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantDetail);
//
