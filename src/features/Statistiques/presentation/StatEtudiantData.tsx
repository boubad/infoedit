import * as React from "react";
import { Button } from "reactstrap";
import { BaseComponent } from "../../../components/BaseComponent";
import LoginForm from "../../../features/Login/redux/LoginForm";
//
export interface IStatEtudiantDataProps {
  busy: boolean;
  stringData: string[];
  connected: boolean;
  //
  doCheck?: () => any;
  onLogout?: () => void;
} // IMatiereStatProps
//
export class StatEtudiantData extends BaseComponent<IStatEtudiantDataProps> {
  //
  constructor(props?: any) {
    super(props);
    this.performCheck = this.performCheck.bind(this);
    this.onLogout = this.onLogout.bind(this);
  } // constructor
  //
  public componentWillMount() {
    if (this.props.doCheck) {
      this.props.doCheck();
    }
  } // componentWillMount

  public render(): React.ReactNode {
    if (!this.props.connected) {
      return <LoginForm />;
    }
    return (
      <div className={this.getInfoStyle()}>
        <div hidden={this.props.busy}>
          <Button color="primary" onClick={this.performCheck}>
            Afficher!
          </Button>
          <Button color="secondary" onClick={this.onLogout}>
            Déconnexion!
          </Button>
        </div>
        <div className={this.getInfoStyle()}>
          {this.props.stringData.map((p, index) => {
            return this.renderLine(p, index);
          })}
        </div>
      </div>
    );
  } // render
  private renderLine(p: string, index: number): React.ReactNode {
    return (
      <div key={"" + index}>
        {p}
        <br />
      </div>
    );
  } // renderLine
  //
  private performCheck() {
    if (this.props.doCheck) {
      this.props.doCheck();
    }
  }
  private onLogout(e?: any) {
    if (this.props.onLogout) {
      this.props.onLogout();
    }
  } // onLogout
  //
} // class StatEtudiantData
