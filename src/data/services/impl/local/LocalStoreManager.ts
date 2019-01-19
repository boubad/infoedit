// localstore.ts
//
declare var window: any;
//
const ISLOCAL: boolean =
  window !== undefined &&
  window !== null &&
  window.localStorage !== undefined &&
  window.localStorage !== null;
const ALL_KEYS = "allkeys";
//
export class LocalStoreManager {
  public static findById(key: string): string | undefined {
    if (key && key.length > 0) {
      if (ISLOCAL) {
        const p = window.localStorage.getItem(key);
        if (p) {
          return JSON.parse(p);
        }
      }
    }
    return undefined;
  } // findByKey
  public static hasKey(key: string): boolean {
    if (key && key.length > 0) {
      if (ISLOCAL) {
        const p = window.localStorage.getItem(key);
        if (p) {
          return true;
        }
      }
    }
    return false;
  } // findByKey
  public static put(key: string, val: any) {
    if (key && val && key.length > 0) {
      if (ISLOCAL) {
        window.localStorage.setItem(key, JSON.stringify(val));
        let vv: string[] = [];
        const aa = window.localStorage.getItem(ALL_KEYS);
        if (aa) {
          vv = JSON.parse(aa);
        }
        const index = vv.indexOf(key);
        if (index < 0) {
          vv.push(key);
          window.localStorage.setItem(ALL_KEYS, JSON.stringify(vv));
        }
      }
    }
  } // put
  public static remove(key: string): any {
    if (key && key.length > 0) {
      if (ISLOCAL) {
        window.localStorage.removeItem(key);
        let vv: string[] = [];
        const aa = window.localStorage.getItem(ALL_KEYS);
        if (aa) {
          vv = JSON.parse(aa);
        }
        const index = vv.indexOf(key);
        if (index >= 0) {
          vv.splice(index, 1);
          window.localStorage.setItem(ALL_KEYS, JSON.stringify(vv));
        }
      }
    }
  } // remove
  public static getAllKeys(): string[] {
    const aa = window.localStorage.getItem(ALL_KEYS);
    if (aa) {
      return JSON.parse(aa);
    }
    return [];
  } // getAllKeys
}
