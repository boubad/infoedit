import * as React from "react";
import { INoteDoc } from "../../../data/DomainData";
import { ControleNoteComponent } from "../../../features/Common/presentation/ControleNoteComponent";
import { ItemDetail } from "../../../features/Common/presentation/ItemDetails";

export class ControleNotes extends ItemDetail<INoteDoc> {
  //
  constructor(props?: any) {
    super(props);
  } // constructor
  protected renderTableHeader(): React.ReactNode {
    return (
      <tr>
        <th>Photo</th>
        <th>Nom</th>
        <th>Note</th>
        <th>Action</th>
      </tr>
    );
  } // renderTableHeader
  protected renderOneLine(p: INoteDoc): React.ReactNode {
    if (this.props.busy){
      return (
        <tr key={p.id}>
          <td>{this.renderLinePhoto(p)}</td>
          <td>
              {p.fullname}
          </td>
          <td>{p.value !== null ? "" + p.value : ""}</td>
          <td>{""}</td>
        </tr>
      );
    } else {
      return (
        <tr key={p.id}>
          <td>{this.renderLinePhoto(p)}</td>
          <td>
            <a
              href="#"
              onClick={this.onShowDetail.bind(this, p.etudiantid)}
            >
              {p.fullname}
            </a>
          </td>
          <td>{p.value !== null ? "" + p.value : ""}</td>
          <td>
          <a
              href="#"
              onClick={this.onSelectItem.bind(this, p.id)}
            >
              {"Sélectionner"}
            </a>
          </td>
        </tr>
      );
    }
    
  } // renderOneLine
  protected renderDetail(): React.ReactNode {
    return (
      <ControleNoteComponent
        addMode={this.props.addMode}
        current={this.props.current}
        itemOptions={[]}
        busy={this.props.busy}
        onFieldChanged={this.props.onFieldChanged}
        onEditCommand={this.props.onEditCommand}
        onSaveAttachment={this.props.onSaveAttachment}
        onRemoveAttachment={this.props.onRemoveAttachment}
      />
    );
  } // renderDetail
} // class ItemNotes
