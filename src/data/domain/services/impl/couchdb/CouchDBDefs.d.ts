export interface ICouchDBDoc {
    _id: string;
   _rev: string;
   _deleted?: boolean;
   _attachments?: any;
   _conflicts?:any[];
   _deleted_conflicts?:any[];
   _local_seq?:string;
   _revs_info?:any[];
   _revisions?:any;
}
export interface ICouchDBFindOptions {
    selector:any;
    limit?:number;
    skip?:number;
    sort?:any[];
    fields?:string[];
    use_index?:string | string[];
    r?:number;
    bookmark?:string;
    update?:boolean;
    stable?:boolean;
    stale?:string;
    execution_stats?:boolean;
}
export interface ICouchDBFindResponse<T> {
    docs?:T[];
    warning?:string;
    execution_stats?:any;
    bookmark?:string;
}
export interface ICouchDBUpdateResponse {
    id?:string;
    rev?:string;
    ok?:boolean;
    error?:string;
    reason?:string;
}
