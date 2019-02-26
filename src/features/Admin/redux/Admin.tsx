import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IInfoState } from '../../../data/state/InfoState';
import { Admin, IAdminProps } from '../presentation/Admin';

//
const getHasStatus = (state: IInfoState): boolean => {
  return state.appstatus.error.length > 0 || state.appstatus.status.length > 0;
};
const getCanAffectations = (state: IInfoState): boolean => {
  const  anneeid = state.annees.current.id;
  const semestreid = state.semestres.current.id;
  return (anneeid.length > 0) && (semestreid.length > 0) && (state.groupes.pageData.length > 0);
};
const getCanEtudAffectations = (state: IInfoState): boolean => {
  return (state.affectations.current.id.length > 0) && (state.outils.freeEtudiantsOpts.length > 0);
};
const getCanChangeStatus = (state: IInfoState): boolean => {
  return (
    state.annees.current.id.length > 0 &&
    state.semestres.current.id.length > 0 &&
    state.groupes.current.id.length > 0
  );
};
const getConnected = (state: IInfoState) : boolean => {
  return state.appstate.owner.id.length > 0;
}
//
const selector = createSelector(
  [
    getHasStatus,
    getCanAffectations,
    getCanEtudAffectations,
    getCanChangeStatus,
    getConnected
  ],
  (
    hasStatus: boolean,
    canAffectations: boolean,
    canEtudAffectations: boolean,
    canChangeStatus,
    connected:boolean
  ) => {
    return {
      canAffectations,
      canChangeStatus,
      canEtudAffectations,
      connected,
      hasStatus,
    };
  }
);
function mapStateToProps(state: IInfoState): IAdminProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps() {
  return {};
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
