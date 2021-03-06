import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IEtudiantDoc } from 'src/data/DomainData';
import { IInfoState } from 'src/redux/InfoState';
import { InfoDispatch } from '../../../redux/IPayload';
import { IImportEtudiantsProps, ImportEtudiants } from '../ImportEtudiants';
import { importEtudiants } from './OutilsActions';

//
const getImportedEtudiants = (state: IInfoState) : IEtudiantDoc[] =>{
  return state.outils.importedEtudiants;
}
const getBusy = (state: IInfoState) : boolean =>{
    return state.etudiants.busy;
}
const selector = createSelector(
  [getBusy,getImportedEtudiants],
  (busy:boolean,importedEtudiants: IEtudiantDoc[]) => {
    return {
        busy,
      importedEtudiants,
    };
  }
);
//
function mapStateToProps(state: IInfoState): IImportEtudiantsProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    doImport: (data: any[]) => {
      dispatch(importEtudiants(data));
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportEtudiants);
//
