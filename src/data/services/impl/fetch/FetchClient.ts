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
  public isOnLine(url: string): Promise<boolean> {
    return fetch(url, {
      method: METHOD_HEAD,
      mode: MODE_CORS
    })
      .then(response => {
        return response.status === HTTP_OK;
      })
      .catch(err => {
        return false;
      });
  } // isOnLine
  public performHead(url: string): Promise<Headers> {
    return fetch(url, {
      method: METHOD_HEAD,
      mode: MODE_CORS
    }).then(response => {
      return response.headers;
    });
  } // performHead
  public performGet(url: string): Promise<any> {
    return fetch(url, {
      headers: new Headers({
        Accept: JSON_APPLICATION
      }),
      method: METHOD_GET,
      mode: MODE_CORS
    }).then(response => {
      if (response.status === HTTP_OK || response.status === HTTP_MODIFIED) {
        return response.json();
      } else if (response.status === HTTP_NOTFOUND) {
        return {};
      } else {
        throw new TypeError("Cannot get url");
      }
    });
  } // performGet
  public performPut(url: string, data: any): Promise<any> {
    return fetch(url, {
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: JSON_APPLICATION,
        "Content-Type": JSON_APPLICATION
      }),
      method: METHOD_PUT,
      mode: MODE_CORS
    }).then(response => {
      if (response.status < HTTP_ERR) {
        return response.json();
      } else {
        throw new TypeError("Cannot put data");
      }
    });
  } // performPut
  public performPutBlob(
    url: string,
    mime: string,
    data: Blob | Buffer
  ): Promise<any> {
    return fetch(url, {
      body: data,
      headers: new Headers({
        Accept: JSON_APPLICATION,
        "Content-Type": mime
      }),
      method: METHOD_PUT,
      mode: MODE_CORS
    }).then(response => {
      if (response.status < HTTP_ERR) {
        return response.json();
      } else {
        throw new TypeError("Cannot put Blob");
      }
    });
  } // performPut
  public performPost(url: string, data: any): Promise<any> {
    return fetch(url, {
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: JSON_APPLICATION,
        "Content-Type": JSON_APPLICATION
      }),
      method: METHOD_POST,
      mode: MODE_CORS
    }).then(response => {
      if (response.status < HTTP_ERR) {
        return response.json();
      } else {
        throw new TypeError("Cannot post data");
      }
    });
  } // performPost
  public performDelete(url: string): Promise<any> {
    return fetch(url, {
      headers: new Headers({
        Accept: JSON_APPLICATION
      }),
      method: METHOD_DELETE,
      mode: MODE_CORS
    }).then(response => {
      if (response.status < HTTP_ERR) {
        return response.json();
      } else {
        throw new TypeError("Cannot delete uri");
      }
    });
  } // performDelete
} // class FetchClient
