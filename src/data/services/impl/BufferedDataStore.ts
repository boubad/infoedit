import { IDataStore } from "../IDataStore";
import { LocalStoreManager } from "./local/LocalStoreManager";

export class BufferedDataStore implements IDataStore {
  private client: IDataStore;
  //
  constructor(pStore: IDataStore) {
    this.client = pStore;
  } // constructor
  //
  public formBlobUrl(
    id?: string | undefined,
    name?: string | undefined
  ): string {
    return this.client.formBlobUrl(id, name);
  } // formBlobUrl
  public async findDocById(id: string): Promise<any> {
    const pRet = LocalStoreManager.findById(id);
    if (pRet) {
      return pRet;
    }
    const p = await this.client.findDocById(id);
    if (p && p._id) {
      LocalStoreManager.put(p._id, p);
      return p;
    }
    return {};
  } // findDocById
  //
  public findDocRevision(sid: string): Promise<string> {
    return this.client.findDocRevision(sid);
  } //  findDocRevision

  public async maintainsBlob(
    id: string,
    name: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<string> {
    const sRet = this.client.maintainsBlob(id, name, mime, data);
    if (LocalStoreManager.hasKey(id)) {
      LocalStoreManager.remove(id);
    }
    return sRet;
  } // maintainsBlob
  public async removeBlob(id: string, name: string): Promise<void> {
    await this.client.removeBlob(id, name);
    if (LocalStoreManager.hasKey(id)) {
      LocalStoreManager.remove(id);
    }
  } // removeBlob
  public findDocsBySelector(
    sel: any,
    start?: number | undefined,
    count?: number | undefined,
    fields?: string[] | undefined,
    sort?: any
  ): Promise<any[]> {
    return this.client.findDocsBySelector(sel, start, count, fields, sort);
  } // findDocsBySelector
  public findAllDocsBySelector(
    sel: any,
    fields?: string[] | undefined,
    sort?: any
  ): Promise<any[]> {
    return this.client.findAllDocsBySelector(sel, fields, sort);
  } // findAllDocsBySelector
  public findDocsCountBySelector(sel: any): Promise<number> {
    return this.client.findDocsCountBySelector(sel);
  } // findDocsCountBySelector
  public async maintainsDoc(doc: any): Promise<string> {
    const id = await this.client.maintainsDoc(doc);
    if (id.length > 0) {
      const data = await this.client.findDocById(id);
      if (data._id === id) {
        LocalStoreManager.put(data._id, data);
      }
    }
    return id;
  } //  maintainsDoc
  public async removeDoc(id: string): Promise<void> {
    await this.client.removeDoc(id);
    if (LocalStoreManager.hasKey(id)) {
      LocalStoreManager.remove(id);
    }
  } // removeDoc
  public async maintainsManyDocs(docs: any[]): Promise<void> {
    const oTemp: Array<Promise<string>> = [];
    const n = docs.length;
    for (let i = 0; i < n; i++) {
      oTemp.push(this.client.maintainsDoc(docs[i]));
    } // i
    const ids = await Promise.all(oTemp);
    const nx = ids.length;
    for (let i = 0; i < nx; i++) {
      const id = ids[i];
      if (id.length > 0) {
        const data = await this.client.findDocById(id);
        LocalStoreManager.put(id, data);
      } // id
    } // i
  } // maintainsManyDocs
  public async removeDocsBySelector(sel: any): Promise<void> {
    const vv = await this.client.findAllDocsBySelector(sel, ["_id"]);
    await this.client.removeDocsBySelector(sel);
    const n = vv.length;
    for (let i = 0; i < n; i++) {
      const x = vv[i];
      const id = x._id;
      if (id) {
        if (LocalStoreManager.hasKey(id)) {
          LocalStoreManager.remove(id);
        }
      } // id
    } // i
  } // removeDocsBySelector
  public async bulkGet(ids: string[]): Promise<any[]> {
    const vv = await this.client.bulkGet(ids);
    const n = vv.length;
    for (let i = 0; i < n; i++) {
      const x = vv[i];
      if (x._id) {
        const id = x._id;
        LocalStoreManager.put(id, x);
      } // id
    } // i
    return vv;
  } // bulkGet
  public async synchroData(): Promise<void> {
    const ids = LocalStoreManager.getAllKeys();
    if (ids.length > 0) {
      const vv = await this.client.bulkGet(ids);
      const n = vv.length;
      for (let i = 0; i < n; i++) {
        const x = vv[i];
        if (x._id) {
          const id = x._id;
          LocalStoreManager.put(id, x);
        } // id
      } // i
    } // ids
  } // synchroData
} // class BufferedDataStore
