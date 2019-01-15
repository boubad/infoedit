import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IInfoState } from '../../../redux/InfoState';
import { IStatusComponentProps, StatusComponent } from '../presentation/StatusComponent';
//
const getStatus = (state: IInfoState): string => {
  return state.appstatus.status;
};
const getError = (state: IInfoState): string => {
  return state.appstatus.error;
};
//
const selector = createSelector(
  [getStatus, getError],
  (status: string, error: string) => {
    return {
      error,
      status
    };
  }
);
//
function mapStateToProps(state: IInfoState): IStatusComponentProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps() {
  return {};
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusComponent);
//
