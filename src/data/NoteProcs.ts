import { INoteStruct } from "./DomainData";
//
export function ConvertNoteToResult(n: number): INoteStruct | undefined {
  if (n !== undefined && n !== null && n >= 0.0 && n <= 20.0) {
    if (n < 10.0) {
      return { ival: 1, sval: "1" };
    } else {
      return { ival: 0, sval: "0" };
    }
  } // n
  return undefined;
} // ConvertNoteToResult
export function ConvertResult(s: string): INoteStruct | undefined {
  if (s !== undefined && s !== null) {
    const ss = s.trim().toUpperCase();
    if (ss.indexOf("VAL") === 0) {
      return { ival: 1, sval: "1" };
    } else {
      return { ival: 0, sval: "0" };
    }
  }
  return undefined;
} // ConvertResult
export function ConvertNote(n: number): INoteStruct | undefined {
  if (n !== undefined && n !== null && n >= 0.0 && n <= 20.0) {
    const pRet: INoteStruct = {
      ival: 0,
      sval: ""
    };
    if (n < 5.0) {
      pRet.ival = 0;
      pRet.sval = "H";
    } else if (n >= 5.0 && n < 8.0) {
      pRet.ival = 1;
      pRet.sval = "G";
    } else if (n >= 8.0 && n < 9.0) {
      pRet.ival = 2;
      pRet.sval = "F";
    } else if (n >= 9.0 && n < 9.5) {
      pRet.ival = 3;
      pRet.sval = "E";
    } else if (n >= 9.5 && n < 10.0) {
      pRet.ival = 4;
      pRet.sval = "D";
    } else if (n >= 10.0 && n < 12.0) {
      pRet.ival = 5;
      pRet.sval = "C";
    } else if (n >= 12.0 && n < 14.0) {
      pRet.ival = 6;
      pRet.sval = "B";
    } else {
      pRet.ival = 7;
      pRet.sval = "A";
    }
    return pRet;
  }
  return undefined;
} // ConvertNote
//
