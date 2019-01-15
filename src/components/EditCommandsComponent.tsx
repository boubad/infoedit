import * as React from "react";
import { Button } from 'reactstrap';
import { BaseComponent } from './BaseComponent';
//
export interface IEditCommandProps {
  canAdd: boolean;
  canSave: boolean;
  canRemove: boolean;
  busy:boolean;
  hideCancel?:boolean;
  onAction?: (arg: string) => void;
} // interface IEditCommandProps
export class EditCommandsComponent extends BaseComponent<IEditCommandProps> {
  constructor(props?: any) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
  } // constructor
  public render() {
    const p = this.props;
    if (p.busy !== undefined && p.busy !== null && p.busy === true){
      return null;
    }
    let hideCancel = p.canAdd;
    if (p.hideCancel !== undefined && p.hideCancel === true){
        hideCancel = true;
      }
    return (
      <div className={this.getInfoStyle()}>
        <Button  onClick={this.handleCancel} color="secondary" hidden={hideCancel}>
          Annuler
        </Button>
        <Button onClick={this.handleSave} color="success" hidden={!p.canSave}>
          Enregistrer
        </Button>
        <Button
          onClick={this.handleRemove}
          color="danger"
          hidden={!p.canRemove}
        >
          Supprimer
        </Button>
      </div>
    );
  } // render
  private handleCreate() {
    if (this.props.onAction !== undefined && this.props.onAction !== null) {
      this.props.onAction("create");
    }
  } // handleCreate
  private handleCancel() {
    if (this.props.onAction !== undefined && this.props.onAction !== null) {
      this.props.onAction("cancel");
    }
  } // handleCancel
  private handleSave() {
    if (this.props.onAction !== undefined && this.props.onAction !== null) {
      this.props.onAction("save");
    }
  } // handleSave
  private handleRemove() {
    if (
      confirm(
        "Voulez-vous vraiment supprimer?\nAttention cette action est irrÃ©versible!"
      )
    ) {
      if (this.props.onAction !== undefined && this.props.onAction !== null) {
        this.props.onAction("remove");
      }
    }
  } // handleRemove
} // class EditCommandsComponent
