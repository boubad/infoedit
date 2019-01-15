import { IHttpClient } from "../IHttpClient";
//
const JSON_APPLICATION = "application/json";
const MODE_CORS = "cors";
const METHOD_HEAD = "HEAD";
const METHOD_GET = "GET";
const METHOD_PUT = "PUT";
const METHOD_POST = "POST";
const METHOD_DELETE = "DELETE";
//
const HTTP_OK = 200;
const HTTP_MODIFIED = 304;
const HTTP_ERR = 400;
const HTTP_NOTFOUND = 404;
//
export class FetchClient implements IHttpClient {
  public async isOnLine(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, {
        method: METHOD_HEAD,
        mode: MODE_CORS
      });
      return response.status === HTTP_OK;
    } catch (err) {
      return false;
    }
  } // isOnLine
  public async performHead(url: string): Promise<Headers> {
    const response = await fetch(url, {
      method: METHOD_HEAD,
      mode: MODE_CORS
    });
    return response.headers;
  } // performHead
  public async performGet(url: string): Promise<any> {
    const response = await fetch(url, {
      headers: new Headers({
        Accept: JSON_APPLICATION
      }),
      method: METHOD_GET,
      mode: MODE_CORS
    });
    if (response.status === HTTP_OK || response.status === HTTP_MODIFIED) {
      return response.json();
    } else if (response.status === HTTP_NOTFOUND) {
      return {};
    } else {
      throw new TypeError("Cannot get url");
    }
  } // performGet
  public async performPut(url: string, data: any): Promise<any> {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: JSON_APPLICATION,
        "Content-Type": JSON_APPLICATION
      }),
      method: METHOD_PUT,
      mode: MODE_CORS
    });
    if (response.status < HTTP_ERR) {
      return response.json();
    } else {
      throw new TypeError("Cannot put data");
    }
  } // performPut
  public async performPutBlob(
    url: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<any> {
    const response = await fetch(url, {
      body: data,
      headers: new Headers({
        Accept: JSON_APPLICATION,
        "Content-Type": mime
      }),
      method: METHOD_PUT,
      mode: MODE_CORS
    });
    if (response.status < HTTP_ERR) {
      return response.json();
    } else {
      throw new TypeError("Cannot put Blob");
    }
  } // performPut
  public async performPost(url: string, data: any): Promise<any> {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: JSON_APPLICATION,
        "Content-Type": JSON_APPLICATION
      }),
      method: METHOD_POST,
      mode: MODE_CORS
    });
    if (response.status < HTTP_ERR) {
      return response.json();
    } else {
      throw new TypeError("Cannot post data");
    }
  } // performPost
  public async performDelete(url: string): Promise<any> {
    const response = await fetch(url, {
      headers: new Headers({
        Accept: JSON_APPLICATION
      }),
      method: METHOD_DELETE,
      mode: MODE_CORS
    });
    if (response.status < HTTP_ERR) {
      return response.json();
    } else {
      throw new TypeError("Cannot delete uri");
    }
  } // performDelete
} // class FetchClient
