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
const STRING_BULK_GET = "_bulk_get";
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
  } // constructor
  public async synchroData() : Promise<void> {
    return;
  }// synchroData
  public formBlobUrl(docid?: string, attname?: string): string {
    if (
      docid &&
      docid.trim().length > 0 &&
      attname &&
      attname.trim().length > 0
    ) {
      return (
        this.baseurl + encodeURI(docid.trim()) + "/" + encodeURI(attname.trim())
      );
    } else {
      return "";
    }
  } // formBlobUrl

  public createDoc(doc: any): Promise<ICouchDBUpdateResponse> {
    let sUrl = this.baseurl;
    if (doc._id && doc._id.trim().length > 0) {
      sUrl = this.baseurl + encodeURI(doc._id.trim());
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
  public findDocRevision(sid: string): Promise<string> {
    return this.client.performHead(this.formUrl(sid)).then((hh: Headers) => {
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
    });
  } // findDocRevision
  public maintainsDoc(ddoc: any): Promise<string> {
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
      return this.createDoc(doc).then(rsp => {
        if (rsp.ok === true) {
          return rsp.id as string;
        } else {
          throw new TypeError("Cannot create document");
        }
      });
    } else {
      return this.findDocRevision(doc._id).then(rev => {
        if (rev.length < 1) {
          delete doc._id;
          return this.createDoc(doc).then(rsp => {
            if (rsp.ok === true) {
              return rsp.id as string;
            } else {
              throw new TypeError("Cannot create document");
            }
          });
        } else {
          return this.findDocById(doc._id).then(old => {
            const aa = old._attachments;
            if (aa) {
              doc._attachments = aa;
            }
            const sUrl = this.formDocUrl(doc._id, rev);
            return this.client.performPut(sUrl, doc).then(rsp => {
              if (rsp.ok === true) {
                return rsp.id as string;
              } else {
                throw new TypeError("Cannot update document");
              }
            });
          });
        }
      });
    }
  } // maintainsDoc
  public removeDoc(id: string): Promise<void> {
    return this.findDocRevision(id).then(srev => {
      if (srev.length < 1) {
        throw new TypeError("Document not found...");
      } else {
        const sUrl = this.formDocUrl(id, srev);
        return this.client.performDelete(sUrl).then(rsp => {
          if (rsp.ok === true) {
            return;
          } else {
            throw new TypeError("Cannot delete document...");
          }
        });
      }
    });
  } // deleteDoc
  public maintainsBlob(
    sid: string,
    attname: string,
    attype: string,
    bdata: Blob | Buffer
  ): Promise<string> {
    return this.findDocRevision(sid).then(srev => {
      if (srev.length < 1) {
        throw new TypeError("Document not found...");
      } else {
        const url = this.formBlobUrl(sid, attname) + "?rev=" + srev;
        return this.client.performPutBlob(url, attype, bdata).then(r => {
          if (r.ok === true) {
            return this.formBlobUrl(r.id, attname);
          } else {
            throw new TypeError("Cannot maintains blob...");
          }
        });
      }
    });
  } // maintainsBlob
  public removeBlob(sid: string, attname: string): Promise<void> {
    return this.findDocRevision(sid).then(srev => {
      if (srev.length < 1) {
        throw new TypeError("Document not found...");
      } else {
        const url = this.formAttachmentUrl(sid, attname, srev);
        return this.client.performDelete(url).then(rsp => {
          if (rsp.ok === true) {
            return;
          } else {
            throw new TypeError("Operation failed...");
          }
        });
      }
    });
  } // removeBlob
  public findDocsBySelector(
    sel: any,
    start?: number,
    count?: number,
    fields?: string[],
    sort?: any
  ): Promise<any[]> {
    if (count === undefined || count === null) {
      return Promise.resolve([]);
    }
    if (count < 1) {
      return Promise.resolve([]);
    }
    const sUrl = this.formUrl(STRING_FIND_IMPL);
    const opts: any = {
      limit: count,
      selector: sel,
      skip: start && start >= 0 ? start : 0
    };
    if (fields && fields.length > 0) {
      opts.fields = fields;
    }
    if (sort) {
      opts.sort = sort;
    }
    return this.client
      .performPost(sUrl, opts)
      .then((rsp: ICouchDBFindResponse<any>) => {
        if (rsp.docs) {
          return rsp.docs;
        } else {
          return [];
        }
      });
  } // findDocsBySelector
  public findAllDocsBySelector(
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
    return this.client
      .performPost(sUrl, opts)
      .then((rsp: ICouchDBFindResponse<any>) => {
        if (rsp.docs) {
          return rsp.docs;
        } else {
          throw new TypeError("Cannot find data array...");
        }
      });
  } // findAllDocsBySelector
  public findDocsCountBySelector(sel: any): Promise<number> {
    const offset = 0;
    const count = MAX_INT_VALUE;
    const fields = ["_id"];
    return this.findDocsBySelector(sel, offset, count, fields).then(docs => {
      if (docs) {
        return docs.length;
      } else {
        throw new TypeError("Cannot get count...");
      }
    });
  } // findDocsCountBySelector
  public maintainsManyDocs(docs: any[]): Promise<void> {
    const sUrl = this.formUrl(STRING_BULK_DOCS);
    return this.client.performPost(sUrl, { docs }).then(rsp => {
      if (!rsp) {
        throw new TypeError("Cannot bulk update...");
      }
    });
  } //  maintainsManyDocs
  public bulkGet(ids: string[]): Promise<any[]> {
    const n = ids.length;
    const vdocs: any[] = [];
    for (let i = 0; i < n; i++) {
      const id = ids[i];
      vdocs.push({ id });
    } // i
    const sUrl = this.formUrl(STRING_BULK_GET);
    return this.client.performPost(sUrl, { docs: vdocs }).then((rsp: any) => {
      const pRet: any[] = [];
      if (rsp.results) {
        const rr = rsp.results;
        const nx = rr.length;
        for (let i = 0; i < nx; i++) {
          const x = rr[i];
          if (x.docs) {
            const yy = x.docs;
            const ny = yy.length;
            for (let j = 0; j < ny; j++) {
              const y = yy[j];
              if (y.ok) {
                pRet.push(y.ok);
              } // ok
            } // j
          } // xdocs
        } // i
      } // rsp.results
      return pRet;
    });
  } // bulkGet
  public removeDocsBySelector(sel: any): Promise<void> {
    const offset = 0;
    const count = MAX_INT_VALUE;
    const fields = ["_id", "_rev"];
    return this.findDocsBySelector(sel, offset, count, fields).then(docs => {
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
      return this.client.performPost(sUrl, { docs: rdocs }).then(rsp => {
        if (!rsp) {
          throw new TypeError("Cannot bulk update...");
        }
      });
    });
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
