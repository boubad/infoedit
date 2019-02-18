export interface IHttpClient {
  isOnLine(url:string) : Promise<boolean>;
  performHead(url:string) : Promise<any>;
  performGet(url:string) : Promise<any>;
  performPut(url:string, data:any) : Promise<any>;
  performPutBlob(url:string,mime:string, data:Blob|Buffer) : Promise<any>;
  performPost(url:string, data:any) : Promise<any>;
  performDelete(url:string) : Promise<any>;
}// interface IHttpClient
