import { IDataStore } from "../IDataStore";
import { ILocalDataManager } from "../ILocalDataManager";
import { IDataStoreFactory } from "./../IDataStoreFactory";
import { BufferedDataStore } from "./BufferedDataStore";
import { CouchDBManager } from "./couchdb/CouchDBManager";
import { LocalStoreManager } from "./local/LocalStoreManager";

export class DataStoreFactory implements IDataStoreFactory {
  public GetRemoteStore(baseurl: string, databasename: string): IDataStore {
    let surl = baseurl;
    const n = surl.length;
    if (surl[n - 1] !== "/") {
      surl = surl + "/";
    }
    surl = surl + databasename + "/";
    const pStore = new CouchDBManager(surl);
    return new BufferedDataStore(pStore, this.GetLocalManager());
  }
  public GetLocalManager(): ILocalDataManager {
    return new LocalStoreManager();
  }
} // class DataStoreFactory
