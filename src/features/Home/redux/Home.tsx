import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IOption } from '../../../data/domain/DomainData';
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { changeAnnee, changeGroupe, changeSemestre, refreshGlobal } from '../../../features/AppState/redux/AppStateActions';
import { Home, IHomeProps } from '../presentation/Home';
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
const getAnneeid = (state: IInfoState): string => {
  return state.annees.current.id;
};
const getConnected = (state: IInfoState) : boolean => {
  return state.appstate.owner.id.length > 0;
}
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
    getAnneeid,
    getAnnees,
    getGroupes,
    getSemestres,
    getConnected
  ],
  (
    busy:boolean,
    groupeid: string,
    semestreid: string,
    anneeid: string,
    annees: IOption[],
    groupes: IOption[],
    semestres: IOption[],
    connected:boolean
  ) => {
    return {
      anneeid,
      annees,
      busy,
      connected,
      groupeid,
      groupes,
      semestreid,
      semestres
    };
  }
);
//
function mapStateToProps(state: IInfoState): IHomeProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    RefreshAll: () => {
      dispatch(refreshGlobal());
    },
    ValueChanged: (val: any, s: string) => {
      if (s === "groupeid") {
        dispatch(changeGroupe(val));
      } else if (s === "semestreid") {
        dispatch(changeSemestre(val));
      }  else if (s === "anneeid") {
        dispatch(changeAnnee(val));
      }
    }
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
//
