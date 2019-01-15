import { IDataStore } from "../../IDataStore";
import { FetchClient } from "../fetch/FetchClient";
import { IHttpClient } from "../IHttpClient";
import {
  ICouchDBDoc,
  ICouchDBFindResponse,
  ICouchDBUpdateResponse
} from "./CouchDBDefs";
//
const STRING_ETAG1 = "etag";
const STRING_ETAG2 = "ETag";
const STRING_FIND_IMPL = "_find";
const STRING_BULK_DOCS = "_bulk_docs";
const DATA_CHUNK_SIZE = 128;
//
const MAX_INT_VALUE = Number.MAX_SAFE_INTEGER;
//
export class CouchDBManager implements IDataStore {
  private baseurl: string;
  private client: IHttpClient;
  constructor(dbUrl: string) {
    this.baseurl = dbUrl;
    const n = this.baseurl.length;
    if (this.baseurl[n - 1] !== "/") {
      this.baseurl += "/";
    }
    this.client = new FetchClient();
  }
  public formBlobUrl(docid?: string, attname?: string): string {
    if (docid && docid.length > 0 && attname && attname.length > 0) {
      return this.baseurl + encodeURI(docid) + "/" + encodeURI(attname);
    } else {
      return "";
    }
  } // formBlobUrl

  public createDoc(doc: any): Promise<ICouchDBUpdateResponse> {
    let sUrl = this.baseurl;
    if (doc._id && doc._id.trim().length > 0) {
      sUrl = this.baseurl + encodeURI(doc._id);
      return this.client.performPut(sUrl, doc);
    }
    if (doc._id) {
      delete doc._id;
    }
    return this.client.performPost(sUrl, doc);
  } // createDoc
  public findDocById(sid: string): Promise<ICouchDBDoc> {
    return this.client.performGet(this.formUrl(sid));
  } // findDocById
  public async findDocRevision(sid: string): Promise<string> {
    const hh = await this.client.performHead(this.formUrl(sid));
    let sx = "";
    if (hh.has(STRING_ETAG1)) {
      const s = hh.get(STRING_ETAG1);
      sx = s ? s : "";
    } else if (hh.has(STRING_ETAG2)) {
      const s = hh.get(STRING_ETAG2);
      sx = s ? s : "";
    }
    const n = sx.length;
    if (n > 2) {
      sx = sx.slice(1, n - 1);
    }
    return sx;
  } // findDocRevision
  public async maintainsDoc(ddoc: any): Promise<string> {
    const doc: any = {};
    for (const key in ddoc) {
      if (key === "_id") {
        const id = ddoc._id as string;
        if (id.trim().length > 0) {
          doc._id = id.trim();
        }
      } else if (key[0] !== "_") {
        doc[key] = ddoc[key];
      }
    } // key
    if (!doc._id) {
      const rsp = await this.createDoc(doc);
      if (rsp.ok === true) {
        return rsp.id as string;
      } else {
        throw new TypeError("Cannot create document");
      }
    } else {
      const rev = await this.findDocRevision(doc._id);
      if (rev.length < 1) {
        const rsp = await this.createDoc(doc);
        if (rsp.ok === true) {
          return rsp.id as string;
        } else {
          throw new TypeError("Cannot create document");
        }
      } else {
        const old = await this.findDocById(doc._id);
        const aa = old._attachments;
        if (aa) {
          doc._attachments = aa;
        }
        const sUrl = this.formDocUrl(doc._id, rev);
        const rsp = await this.client.performPut(sUrl, doc);
        if (rsp.ok === true) {
          return rsp.id as string;
        } else {
          throw new TypeError("Cannot update document");
        }
      }
    }
  } // maintainsDoc
  public async removeDoc(id: string): Promise<void> {
    const srev = await this.findDocRevision(id);
    if (srev.length < 1) {
      throw new TypeError("Document not found...");
    } else {
      const sUrl = this.formDocUrl(id, srev);
      const rsp = await this.client.performDelete(sUrl);
      if (rsp.ok === true) {
        return;
      } else {
        throw new TypeError("Cannot delete document...");
      }
    }
  } // deleteDoc
  public async maintainsBlob(
    sid: string,
    attname: string,
    attype: string,
    bdata: Blob | Buffer
  ): Promise<string> {
    const srev = await this.findDocRevision(sid);
    if (srev.length < 1) {
      throw new TypeError("Document not found...");
    } else {
      const url = this.formBlobUrl(sid, attname) + "?rev=" + srev;
      const r = await this.client.performPutBlob(url, attype, bdata);
      if (r.ok === true) {
        const sRet = this.formBlobUrl(r.id, attname);
        return sRet;
      } else {
        throw new TypeError("Cannot maintains blob...");
      }
    }
  } // maintainsBlob
  public async removeBlob(sid: string, attname: string): Promise<void> {
    const srev = await this.findDocRevision(sid);
    if (srev.length < 1) {
      throw new TypeError("Document not found...");
    } else {
      const url = this.formAttachmentUrl(sid, attname, srev);
      const rsp = await this.client.performDelete(url);
      if (rsp.ok === true) {
        return;
      } else {
        throw new TypeError("Operation failed...");
      }
    }
  } // removeBlob
  public async findDocsBySelector(
    sel: any,
    start?: number,
    count?: number,
    fields?: string[],
    sort?: any
  ): Promise<any[]> {
    const sUrl = this.formUrl(STRING_FIND_IMPL);
    const opts: any = {
      limit: count && count > 0 ? count : DATA_CHUNK_SIZE,
      selector: sel,
      skip: start && start >= 0 ? start : 0
    };
    if (fields && fields.length > 0) {
      opts.fields = fields;
    }
    if (sort) {
      opts.sort = sort;
    }
    const rsp: ICouchDBFindResponse<any> = await this.client.performPost(
      sUrl,
      opts
    );
    if (rsp.docs) {
      return rsp.docs;
    } else {
      return [];
      // reject(new Error("Cannot find data array..."));
    }
  } // findDocsBySelector
  public async findAllDocsBySelector(
    sel: any,
    fields?: string[],
    sort?: any
  ): Promise<any[]> {
    const sUrl = this.formUrl(STRING_FIND_IMPL);
    const opts: any = {
      limit: MAX_INT_VALUE,
      selector: sel,
      skip: 0
    };
    if (fields && fields.length > 0) {
      opts.fields = fields;
    }
    if (sort) {
      opts.sort = sort;
    }
    const rsp = await this.client.performPost(sUrl, opts);
    if (rsp.docs) {
      return rsp.docs;
    } else {
      throw new TypeError("Cannot find data array...");
    }
  } // findAllDocsBySelector
  public async findDocsCountBySelector(sel: any): Promise<number> {
    const offset = 0;
    const count = MAX_INT_VALUE;
    const fields = ["_id"];
    const docs = await this.findDocsBySelector(sel, offset, count, fields);
    if (docs) {
      return docs.length;
    } else {
      throw new TypeError("Cannot get count...");
    }
  } // findDocsCountBySelector
  public async maintainsManyDocs(docs: any[]): Promise<void> {
    const sUrl = this.formUrl(STRING_BULK_DOCS);
    this.client.performPost(sUrl, { docs });
  } //  maintainsManyDocs
  public async removeDocsBySelector(sel: any): Promise<void> {
    const offset = 0;
    const count = MAX_INT_VALUE;
    const fields = ["_id", "_rev"];
    const docs = await this.findDocsBySelector(sel, offset, count, fields);
    const n = docs.length;
    if (n < 1) {
      return;
    }
    const rdocs: any[] = [];
    for (let i = 0; i < n; i++) {
      const x = docs[i];
      rdocs.push({ _id: x._id, _rev: x._rev, _deleted: true });
    } // i
    const sUrl = this.formUrl(STRING_BULK_DOCS);
    await this.client.performPost(sUrl, { docs: rdocs });
  } // removeDocsBySelector
  private formUrl(uri: string): string {
    return this.baseurl + encodeURI(uri);
  } // formUrl
  private formDocUrl(id: string, rev: string): string {
    return this.baseurl + encodeURI(id) + "?rev=" + rev;
  } // formDocUrl
  private formAttachmentUrl(id: string, attname: string, rev: string): string {
    return (
      this.baseurl + encodeURI(id) + "/" + encodeURI(attname) + "?rev=" + rev
    );
  } // formAttachmentUrl
} // class CouchDBManager
