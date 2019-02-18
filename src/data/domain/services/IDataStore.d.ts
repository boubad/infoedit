//
export interface IDataStore {
  findDocRevision(sid: string): Promise<string>;
  formBlobUrl(id?:string,name?:string) : string;
  maintainsBlob(id:string, name:string, mime:string, data:Blob|Buffer) : Promise<string>;
  removeBlob(id:string, name:string): Promise<void>;
  findDocsBySelector(sel:any,start?:number, count?:number,fields?:string[], sort?:any) :Promise<any[]>;
  findAllDocsBySelector(sel:any,fields?:string[],sort?:any) :Promise<any[]>;
  findDocsCountBySelector(sel:any) : Promise<number>;
  findDocById(id:string) : Promise<any>;
  maintainsDoc(doc:any) : Promise<string>;
  removeDoc(id:string) : Promise<void>;
  maintainsManyDocs(docs:any[]) : Promise<void>;
  removeDocsBySelector(sel: any): Promise<void>;
  bulkGet(ids: string[]): Promise<any[]>;
  synchroData(): Promise<void>;
}// interface IDataStore
