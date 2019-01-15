import { IDataStore } from './IDataStore';
import { CouchDBManager } from './impl/couchdb/CouchDBManager';
// import { CouchDBProxy } from './impl/couchdb/CouchDBProxy';

export class DataStoreFactory {
    public static GetDataStore(serverUrl:string, dbname:string) : IDataStore {
        let surl = serverUrl;
        const n = surl.length;
        if (surl[n-1] !== '/'){
            surl = surl + "/";
        }
        surl = surl + dbname + "/";
       return new CouchDBManager(surl);
      // return new CouchDBProxy(surl);
    }// GetDataStore
}// class DataStoreFactory
