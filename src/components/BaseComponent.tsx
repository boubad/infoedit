import * as React from "react";
import ThemeContext, { IInfoThemeContext } from './ThemeContext';
//
export class BaseComponent<P={},S={}> extends React.Component<P,S> {
  //
  public static contextType = ThemeContext;
  //
  constructor(props?: any) {
    super(props);
  } // constructor
  //
  protected getLinkStyle(busy?:boolean):string{
    if (busy !== undefined && busy !== null && busy === true){
       return this.getDisabledStyle();
    } else {
      return this.getInfoStyle();
    }
  }
  protected getDisabledStyle():string {
    const ctx: IInfoThemeContext = this.context;
    return ctx.disabledStyle;
  }
  protected getInfoStyle():string {
    const ctx: IInfoThemeContext = this.context;
    return ctx.globalStyle;
  }// getInfoStyle
  protected getErrorStyle():string {
    const ctx: IInfoThemeContext = this.context;
    return ctx.errorStyle;
  }
  protected getStatusStyle():string {
    const ctx: IInfoThemeContext = this.context;
    return ctx.statusStyle
  }
  protected getTextStyle():string {
    const ctx: IInfoThemeContext = this.context;
    return ctx.textStyle;
  }
  protected getThumbHeight():number {
    const ctx: IInfoThemeContext = this.context;
    return ctx.thumbHeight;
  }
  protected getImgHeight():number {
    const ctx: IInfoThemeContext = this.context;
    return ctx.imgHeight;
  }
} // class BaseComponent<P,S>
