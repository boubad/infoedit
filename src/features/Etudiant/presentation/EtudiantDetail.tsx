import classnames from "classnames";
import * as React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { BaseComponent } from '../../../components/BaseComponent';
import { GetEtudiant } from '../../../data/DataProcs';
import { IEtudiantDoc } from '../../../data/DomainData';
import { EtudiantAffectations } from './EtudiantAffectations';
import { EtudiantEvts } from "./EtudiantEvts";
import { EtudiantInfo } from "./EtudiantInfo";
import { EtudiantNotes } from "./EtudiantNotes";
//
export interface IEtudiantDetailProps {
  addMode: boolean;
  current: IEtudiantDoc;
  busy:boolean;
  params?:any[];
  //
  onFieldChanged?: (value: any, propname: string) => void;
  onEditCommand?: (arg: string) => void;
  onSaveAttachment?: (name: string, mime: string, data: Blob) => void;
  onRemoveAttachment?: (name: string) => void;
  onSetAvatar?: (name: string) => void;
  onSelectCurrent?: (id:string) => void;
} // interface IBaseInfoComponentProps<T>
//
interface IEtudiantDetailState {
  activeTab: string;
  addMode: boolean;
  busy:boolean;
  current: IEtudiantDoc;
}
export default class EtudiantDetail extends BaseComponent<
  IEtudiantDetailProps,
  IEtudiantDetailState
> {
  constructor(props?: any) {
    super(props);
    this.state = {
      activeTab: "1",
      addMode: false,
      busy:false,
      current: GetEtudiant()
    };
    this.toggle = this.toggle.bind(this);
  } // constructor
  public componentWillReceiveProps(nextProps: IEtudiantDetailProps) {
    if (nextProps.params !== this.props.params){
         const x:any = nextProps.params;
         if (x){
          if (x.id){
            if (this.props.onSelectCurrent){
              this.props.onSelectCurrent(x.id as string);
            }
          }// xid
         }// x
    }// params
    if (nextProps.current !== this.props.current){
      this.setState({
        current: nextProps.current
      });
    }
    if (nextProps.busy !== this.props.busy){
      this.setState({
        busy: nextProps.busy
      });
    }
    if (nextProps.addMode !== this.props.addMode){
      this.setState({
        addMode: nextProps.addMode
      });
    }
  } // componentWillReceiveProps
  public componentWillMount() {
    this.setState({
      addMode: this.props.addMode,
      busy: this.props.busy,
      current: this.props.current
    })
  }// componentWillMount
  
  public render(): React.ReactNode {
    const p = this.props;
    return (
      <div className={this.getInfoStyle()}>
        <Nav tabs={true}>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={this.toggle.bind(this, "1")}
            >
              Infos
            </NavLink>
          </NavItem>
          <NavItem hidden={this.state.current.notes.length < 1}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={this.toggle.bind(this, "2")}
            >
              Notes
            </NavLink>
          </NavItem>
          <NavItem hidden={this.state.current.evts.length < 1}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "3"
              })}
              onClick={this.toggle.bind(this, "3")}
            >
              Evènements
            </NavLink>
          </NavItem>
          <NavItem hidden={this.state.current.affectations.length < 1}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "4"
              })}
              onClick={this.toggle.bind(this, "4")}
            >
              Affectations
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <EtudiantInfo
              addMode={this.state.addMode}
              current={this.state.current}
              busy={this.state.busy}
              onFieldChanged={p.onFieldChanged}
              onEditCommand={p.onEditCommand}
              onSaveAttachment={p.onSaveAttachment}
              onRemoveAttachment={p.onRemoveAttachment}
              onSetAvatar={p.onSetAvatar}
            />
          </TabPane>
          <TabPane tabId="2" hidden={this.state.current.notes.length < 1}>
            <EtudiantNotes busy={this.state.busy} current={this.state.current} />
          </TabPane>
          <TabPane tabId="3" hidden={this.state.current.evts.length < 1}>
            <EtudiantEvts busy={this.state.busy} current={this.state.current} />
          </TabPane>
          <TabPane tabId="4" hidden={this.state.current.affectations.length < 1}>
            <EtudiantAffectations busy={this.state.busy} current={this.state.current} />
          </TabPane>
        </TabContent>
      </div>
    );
  } // render
  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  } // toggle
} // class EtudiantDetail
