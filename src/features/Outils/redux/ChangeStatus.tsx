import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IEtudAffectationDoc } from 'src/data/DomainData';
import { IInfoState } from '../../../redux/InfoState';
import { InfoDispatch } from '../../../redux/IPayload';
import { ChangeStatus, IChangeStatusProps } from '../ChangeStatus';
import { changeAnneeSemestreEtudiantsStatus, refreshAnneeSemestreEtudiantsStatus } from './OutilsActions';
//
const getAffectations = (state: IInfoState) : IEtudAffectationDoc[] =>{
  return state.controles.etudAffectations;
}
const getStatus = (state: IInfoState) : string =>{
    return state.etudiants.etudiantStatus;
}
const getAnneename = (state:IInfoState) : string =>{
    let sRet = "";
    const id = state.appstate.anneeid;
    if (id.length > 0){
        const p = state.appstate.anneesOptions.find((x) =>{
            return (x.id === id);
        })
        if (p !== undefined){
            sRet = p.text;
        }
    }// id
    return sRet;
}
const getSemestrename = (state:IInfoState) : string =>{
    let sRet = "";
    const id = state.appstate.semestreid;
    if (id.length > 0){
        const p = state.appstate.semestresOptions.find((x) =>{
            return (x.id === id);
        })
        if (p !== undefined){
            sRet = p.text;
        }
    }// id
    return sRet;
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
