import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IEtudAffectationDoc } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { ChangeStatus, IChangeStatusProps } from '../presentation/ChangeStatus';
import { changeAnneeSemestreEtudiantsStatus, refreshAnneeSemestreEtudiantsStatus } from './OutilsActions';
//
const getAffectations = (state: IInfoState) : IEtudAffectationDoc[] =>{
  return state.controles.etudAffectations;
}
const getStatus = (state: IInfoState) : string =>{
    return state.etudiants.etudiantStatus;
}
const getAnneename = (state:IInfoState) : string =>{
    return state.annees.current.name;
}
const getSemestrename = (state:IInfoState) : string =>{
    return state.semestres.current.name;
}
const getBusy = (state: IInfoState) : boolean =>{
    return state.outils.busy;
}
const selector = createSelector(
  [getAffectations,
  getStatus,
 getAnneename,
getSemestrename,
getBusy],
  (affectations:IEtudAffectationDoc[],
    status:string,
    anneename:string,
    semestrename:string,
    busy:boolean) => {
    return {
        affectations,
        anneename,
        busy,
        semestrename,
        status,
    };
  }
);
//
function mapStateToProps(state: IInfoState): IChangeStatusProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    changeStatus: (status:string) => {
        dispatch(changeAnneeSemestreEtudiantsStatus(status));
      },
    refresh: () => {
        dispatch(refreshAnneeSemestreEtudiantsStatus());
    }, 
   
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeStatus);
//
