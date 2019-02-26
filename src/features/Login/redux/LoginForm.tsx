import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IInfoState } from '../../../data/state/InfoState';
import { InfoDispatch } from '../../../data/state/IPayload';
import { loginInfoUser } from '../../../features/InfoUser/redux/InfoUserActions';
import { ILoginFormProps, LoginForm } from '../presentation/LoginForm';
const getBusy = (state: IInfoState): boolean => {
  return state.appstate.busy;
};
//
const selector = createSelector(
  [
    getBusy,
  ],
  (
    busy:boolean,
  ) => {
    return {
      busy,
    };
  }
);
//
function mapStateToProps(state: IInfoState): ILoginFormProps {
  return selector(state);
} // mapStateToProps
function mapDispatchToProps(dispatch: InfoDispatch) {
  return {
    onLogin: (password: string, username: string, email:string) => {
      dispatch(loginInfoUser(password,username,email));
    },
    // tslint:disable-next-line:object-literal-sort-keys
  };
} // mapDispatchToProps
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
//
