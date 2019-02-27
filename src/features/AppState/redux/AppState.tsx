import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IOption } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { logOutInfoUserAction } from '../../../features/InfoUser/redux/InfoUserActions';
import { AppState, IAppStateProps } from '../presentation/AppState';
import { changeAnnee, changeGroupe, changeMatiere, changeSemestre } from './AppStateActions';
//
const getBusy = (state: IInfoState) : boolean => {
  return state.appstate.busy || state.annees.busy || state.semestres.busy || state.groupes.busy || state.unites.busy || state.matieres.busy || state.outils.busy || state.affectations.busy || state.etudaffectations.busy || state.details.busy || state.appstatus.busy;
};
const getGroupeid = (state: IInfoState): string => {
  return state.groupes.current.id;
};
const getSemestreid = (state: IInfoState): string => {
  return state.semestres.current.id;
};
const getMatiereid = (state: IInfoState): string => {
  return state.matieres.current.id;
};
const getAnneeid = (state: IInfoState): string => {
  return state.annees.current.id;
};
const getMatieres = (state: IInfoState): IOption[] => {
  const pRet:IOption[] = [{id:'',text:''}];
  state.matieres.pageData.forEach((x) =>{
    let stag = x.tag;
    if (stag.trim().length < 1){
      stag = x.sigle;
    }
    pRet.push({id:x.id,text:stag});
  });
  return pRet;
};
const getAnnees = (state: IInfoState): IOption[] => {
  const pRet:IOption[] = [{id:'',text:''}];
  state.annees.pageData.forEach((x) =>{
    let stag = x.tag;
    if (stag.trim().length < 1){
      stag = x.sigle;
    }
      pRet.push({id:x.id,text:stag});
  });
  return pRet;
};
const getGroupes = (state: IInfoState): IOption[] => {
  const pRet:IOption[] = [{id:'',text:''}];
  state.groupes.pageData.forEach((x) =>{
    pRet.push({id:x.id,text:x.sigle});
  });
  return pRet;
};
const getSemestres = (state: IInfoState): IOption[] => {
  const pRet:IOption[] = [{id:'',text:''}];
  state.semestres.pageData.forEach((x) =>{
    let stag = x.tag;
    if (stag.trim().length < 1){
      stag = x.sigle;
    }
      pRet.push({id:x.id,text:stag});
  });
  return pRet;
};
//
const selector = createSelector(
  [
    getBusy,
    getGroupeid,
    getSemestreid,
    getMatiereid,
    getAnneeid,
    getAnnees,
    getMatieres,
    getGroupes,
    getSemestres
  ],
  (
    busy:boolean,
    groupeid: string,
    semestreid: string,
    matiereid: string,
    anneeid: string,
    annees: IOption[],
    matieres: IOption[],
    groupes: IOption[],
    semestres: IOption[]
  ) => {
    return {
      busy,
      // tslint:disable-next-line:object-literal-sort-keys
      groupeid,
      semestreid,
      // tslint:disable-next-line:object-literal-sort-keys
      matiereid,
      anneeid,
      annees,
      matieres,
      groupes,
      semestres
    };
  }
);
//
function mapStateToProps(state: IInfoState): IAppStateProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    ValueChanged: (val: any, s: string) => {
      if (s === "groupeid") {
        dispatch(changeGroupe(val));
      } else if (s === "semestreid") {
        dispatch(changeSemestre(val));
      } else if (s === "matiereid") {
        dispatch(changeMatiere(val));
      } else if (s === "anneeid") {
        dispatch(changeAnnee(val));
      }
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
)(AppState);
//
