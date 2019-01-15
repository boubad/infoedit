import * as React from "react";
import { BaseComponent } from "./BaseComponent";
import { ItemChoiceComponent } from "./InputChoiceComponent";
//
export interface IGenreEvtInputComponentOptions {
  genre: number;
  busy: boolean;
  onGenreChanged?: (genre: number, propname: string) => void;
}
interface IGenreEvtInputComponentState {
  busy: boolean;
  genre: number;
  gstring: string;
}
//
export class InputGenreEvtComponent extends BaseComponent<
  IGenreEvtInputComponentOptions,
  IGenreEvtInputComponentState
> {
  constructor(props?: any) {
    super(props);
    this.state = {
      busy: false,
      genre: 5,
      gstring: "5"
    };
    this.onItemChoosen = this.onItemChoosen.bind(this);
  } // constructor
  public componentDidMount() {
    const p = this.props;
    this.setState({
      busy: p.busy,
      genre: p.genre,
      gstring: "" + p.genre
    });
  } // componentDidMount
  public componentWillReceiveProps(p: IGenreEvtInputComponentOptions) {
    const pp: any = {};
    if (p.genre !== this.props.genre) {
      pp.genre = p.genre;
      pp.gstring = "" + p.genre;
    }
    if (p.busy !== this.props.busy) {
      pp.busy = p.busy !== undefined ? p.busy : false;
    }
    this.setState(pp);
  } // componentWillReceiveProps
  public render(): React.ReactNode {
    return (
      <ItemChoiceComponent
        text={this.state.gstring}
        items={this.getGenresList()}
        prompt="Genre:"
        propname="genre"
        busy={this.state.busy}
        onItemChoosen={this.onItemChoosen}
      />
    );
  } // render
  private onItemChoosen(val: any, propname: string) {
    const t = val as string;
    const tt: number = parseInt(t, 10);
    if (tt !== this.state.genre) {
      this.setState({
        genre: tt,
        gstring: t
      });
      if (
        this.props.onGenreChanged !== undefined &&
        this.props.onGenreChanged !== null
      ) {
        this.props.onGenreChanged(tt, propname);
      }
    }
  }
  private getGenresList(): any[] {
    return [
      { id: "0", text: "Absence" },
      { id: "1", text: "Retard" },
      { id: "3", text: "Discipline" },
      { id: "2", text: "Comportement" },
      { id: "4", text: "Autre" },
      { id: "5", text: "Inconnu" }
    ];
  } // getGroupesList
} // class  InputGroupeComponent
