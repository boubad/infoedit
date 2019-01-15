import * as React from 'react';
//
export interface IInfoThemeContext {
    errorStyle: string,
    globalStyle: string,
    statusStyle: string,
    textStyle: string,
    imgHeight:number;
    thumbHeight:number;
    disabledStyle:string;
}// interface IInfoThemeContext 
//
const ThemeContext:React.Context<IInfoThemeContext> = React.createContext({
    disabledStyle:"isDisabled",
    errorStyle: "infoerror",
    globalStyle: "infoback",
    imgHeight: 196,
    statusStyle: "infostatus",
    textStyle: "infotext",
    thumbHeight: 32,
});
export default ThemeContext;
//