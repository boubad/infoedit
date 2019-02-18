import { IDataStore } from '../IDataStore';
import { ILocalDataManager } from '../ILocalDataManager';

export class BufferedDataStore implements IDataStore {
  // tslint:disable-next-line:variable-name
  private _client: IDataStore;
  // tslint:disable-next-line:variable-name
  private _local: ILocalDataManager;
  //
  constructor(pStore: IDataStore, pLocal:ILocalDataManager) {
    this._client = pStore;
    this._local = pLocal;
  } // constructor
  //
  public formBlobUrl(
    id?: string | undefined,
    name?: string | undefined
  ): string {
    return this._client.formBlobUrl(id, name);
  } // formBlobUrl
  public async findDocById(id: string): Promise<any> {
    const pRet = this._local.findById(id);
    if (pRet) {
      return pRet;
    }
    const p = await this._client.findDocById(id);
    if (p && p._id) {
      this._local.put(p._id, p);
      return p;
    }
    return {};
  } // findDocById
  //
  public findDocRevision(sid: string): Promise<string> {
    return this._client.findDocRevision(sid);
  } //  findDocRevision

  public async maintainsBlob(
    id: string,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<string> {
    const sRet = this._client.maintainsBlob(id, name, mime, data);
    if (this._local.hasKey(id)) {
      this._local.remove(id);
    }
    return sRet;
  } // maintainsBlob
  public async removeBlob(id: string, name: string): Promise<void> {
    await this._client.removeBlob(id, name);
    if (this._local.hasKey(id)) {
      this._local.remove(id);
    }
  } // removeBlob
  public findDocsBySelector(
    sel: any,
    start?: number | undefined,
    count?: number | undefined,
    fields?: string[] | undefined,
    sort?: any
  ): Promise<any[]> {
    return this._client.findDocsBySelector(sel, start, count, fields, sort);
  } // findDocsBySelector
  public findAllDocsBySelector(
    sel: any,
    fields?: string[] | undefined,
    sort?: any
  ): Promise<any[]> {
    return this._client.findAllDocsBySelector(sel, fields, sort);
  } // findAllDocsBySelector
  public findDocsCountBySelector(sel: any): Promise<number> {
    return this._client.findDocsCountBySelector(sel);
  } // findDocsCountBySelector
  public async maintainsDoc(doc: any): Promise<string> {
    const id = await this._client.maintainsDoc(doc);
    if (id.length > 0) {
      const data = await this._client.findDocById(id);
      if (data._id === id) {
        if (this._local.hasKey(id)) {
          this._local.remove(id);
        }
      }
    }
    return id;
  } //  maintainsDoc
  public async removeDoc(id: string): Promise<void> {
    await this._client.removeDoc(id);
    if (this._local.hasKey(id)) {
      this._local.remove(id);
    }
  } // removeDoc
  public async maintainsManyDocs(docs: any[]): Promise<void> {
    const oTemp: Array<Promise<string>> = [];
    const n = docs.length;
    for (let i = 0; i < n; i++) {
      oTemp.push(this._client.maintainsDoc(docs[i]));
    } // i
    const ids = await Promise.all(oTemp);
    const nx = ids.length;
    for (let i = 0; i < nx; i++) {
      const id = ids[i];
      if (id.length > 0) {
        if (this._local.hasKey(id)) {
          this._local.remove(id);
        }
      } // id
    } // i
  } // maintainsManyDocs
  public async removeDocsBySelector(sel: any): Promise<void> {
    const vv = await this._client.findAllDocsBySelector(sel, ["_id"]);
    await this._client.removeDocsBySelector(sel);
    const n = vv.length;
    for (let i = 0; i < n; i++) {
      const x = vv[i];
      const id = x._id;
      if (id) {
        if (this._local.hasKey(id)) {
          this._local.remove(id);
        }
      } // id
    } // i
  } // removeDocsBySelector
  public async bulkGet(ids: string[]): Promise<any[]> {
    const vv = await this._client.bulkGet(ids);
    const n = vv.length;
    for (let i = 0; i < n; i++) {
      const x = vv[i];
      if (x._id) {
        const id = x._id;
        this._local.put(id, x);
      } // id
    } // i
    return vv;
  } // bulkGet
  public async synchroData(): Promise<void> {
    const ids = this._local.getAllKeys();
    if (ids.length > 0) {
      const vv = await this._client.bulkGet(ids);
      const n = vv.length;
      for (let i = 0; i < n; i++) {
        const x = vv[i];
        if (x._id) {
          const id = x._id;
          this._local.put(id, x);
        } // id
      } // i
    } // ids
  } // synchroData
} // class BufferedDataStore
