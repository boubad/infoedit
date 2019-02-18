import { IDataStore } from './IDataStore';
import { ILocalDataManager } from './ILocalDataManager';

export interface IDataStoreFactory {
    GetRemoteStore(baseurl:string, databasename:string): IDataStore;
    GetLocalManager() : ILocalDataManager;
}// interface IDataStoreFactory
