import { IDataStore } from './IDataStore';
import { BufferedDataStore } from './impl/BufferedDataStore';
import { CouchDBManager } from './impl/couchdb/CouchDBManager';

export class DataStoreFactory {
    public static GetDataStore(serverUrl:string, dbname:string) : IDataStore {
        let surl = serverUrl;
        const n = surl.length;
        if (surl[n-1] !== '/'){
            surl = surl + "/";
        }
        surl = surl + dbname + "/";
        const pStore = new CouchDBManager(surl);
        return new BufferedDataStore(pStore);
      // return new CouchDBProxy(surl);
    }// GetDataStore
}// class DataStoreFactory
