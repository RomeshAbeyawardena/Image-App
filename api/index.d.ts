type RequestResult<Data> = Promise<{ response: Response; data: Data; }>;

type ApiImageGetParams0 = { "query"?: { "PageIndex"?: number; "TotalItemsPerPage"?: number; "OrderByFields"?: (string)[]; "SortOrder"?: "Ascending" | "Descending"; "NoTracking"?: boolean; "FileName"?: string; "Name"?: string; "Id"?: string; "Index"?: number; }; };
type ApiImageGetAddedParams0 = { "header"?: { "Content-Type": "text/plain"; }; };
type ApiImageGetResult0 = RequestResult<{ "pageNumber"?: number; "numberOfPages"?: number; "totalItems"?: number; "results"?: ({ "id"?: string; "name"?: string; "fileName"?: string; "created"?: string; "modified"?: string; })[]; "value"?: { "nullable"?: ; "readOnly"?: ; }; "message"?: string; "statusCode"?: number; "isSuccessful"?: boolean; }>;
export function apiImageGet(params: ApiImageGetParams0 & ApiImageGetAddedParams0): ApiImageGetResult0;

type ApiImageGetParams1 = { "query"?: { "PageIndex"?: number; "TotalItemsPerPage"?: number; "OrderByFields"?: (string)[]; "SortOrder"?: "Ascending" | "Descending"; "NoTracking"?: boolean; "FileName"?: string; "Name"?: string; "Id"?: string; "Index"?: number; }; };
type ApiImageGetAddedParams1 = { "header"?: { "Content-Type": "application/json"; }; };
type ApiImageGetResult1 = RequestResult<{ "pageNumber"?: number; "numberOfPages"?: number; "totalItems"?: number; "results"?: ({ "id"?: string; "name"?: string; "fileName"?: string; "created"?: string; "modified"?: string; })[]; "value"?: { "nullable"?: ; "readOnly"?: ; }; "message"?: string; "statusCode"?: number; "isSuccessful"?: boolean; }>;
export function apiImageGet(params: ApiImageGetParams1 & ApiImageGetAddedParams1): ApiImageGetResult1;

type ApiImageGetParams2 = { "query"?: { "PageIndex"?: number; "TotalItemsPerPage"?: number; "OrderByFields"?: (string)[]; "SortOrder"?: "Ascending" | "Descending"; "NoTracking"?: boolean; "FileName"?: string; "Name"?: string; "Id"?: string; "Index"?: number; }; };
type ApiImageGetAddedParams2 = { "header"?: { "Content-Type": "text/json"; }; };
type ApiImageGetResult2 = RequestResult<{ "pageNumber"?: number; "numberOfPages"?: number; "totalItems"?: number; "results"?: ({ "id"?: string; "name"?: string; "fileName"?: string; "created"?: string; "modified"?: string; })[]; "value"?: { "nullable"?: ; "readOnly"?: ; }; "message"?: string; "statusCode"?: number; "isSuccessful"?: boolean; }>;
export function apiImageGet(params: ApiImageGetParams2 & ApiImageGetAddedParams2): ApiImageGetResult2;

type ApiImagePostParams0 = { "body"?: { "Name"?: string; "FileName"?: string; "Created"?: string; "Modified"?: string; }; };
type ApiImagePostAddedParams0 = { "header"?: { "accept": "multipart/form-data"; "Content-Type": "text/plain"; }; };
type ApiImagePostResult0 = RequestResult<{ "id"?: string; "name"?: string; "fileName"?: string; "created"?: string; "modified"?: string; }>;
export function apiImagePost(params: ApiImagePostParams0 & ApiImagePostAddedParams0): ApiImagePostResult0;

type ApiImagePostParams1 = { "body"?: { "Name"?: string; "FileName"?: string; "Created"?: string; "Modified"?: string; }; };
type ApiImagePostAddedParams1 = { "header"?: { "accept": "multipart/form-data"; "Content-Type": "application/json"; }; };
type ApiImagePostResult1 = RequestResult<{ "id"?: string; "name"?: string; "fileName"?: string; "created"?: string; "modified"?: string; }>;
export function apiImagePost(params: ApiImagePostParams1 & ApiImagePostAddedParams1): ApiImagePostResult1;

type ApiImagePostParams2 = { "body"?: { "Name"?: string; "FileName"?: string; "Created"?: string; "Modified"?: string; }; };
type ApiImagePostAddedParams2 = { "header"?: { "accept": "multipart/form-data"; "Content-Type": "text/json"; }; };
type ApiImagePostResult2 = RequestResult<{ "id"?: string; "name"?: string; "fileName"?: string; "created"?: string; "modified"?: string; }>;
export function apiImagePost(params: ApiImagePostParams2 & ApiImagePostAddedParams2): ApiImagePostResult2;

type ApiImageImageIdPutParams0 = { "path": { "imageId": string; }; "body"?: { "Id"?: string; "Name"?: string; "FileName"?: string; "Created"?: string; "Modified"?: string; }; };
type ApiImageImageIdPutAddedParams0 = { "header"?: { "accept": "multipart/form-data"; "Content-Type": "text/plain"; }; };
type ApiImageImageIdPutResult0 = RequestResult<{ "id"?: string; "name"?: string; "fileName"?: string; "created"?: string; "modified"?: string; }>;
export function apiImageImageIdPut(params: ApiImageImageIdPutParams0 & ApiImageImageIdPutAddedParams0): ApiImageImageIdPutResult0;

type ApiImageImageIdPutParams1 = { "path": { "imageId": string; }; "body"?: { "Id"?: string; "Name"?: string; "FileName"?: string; "Created"?: string; "Modified"?: string; }; };
type ApiImageImageIdPutAddedParams1 = { "header"?: { "accept": "multipart/form-data"; "Content-Type": "application/json"; }; };
type ApiImageImageIdPutResult1 = RequestResult<{ "id"?: string; "name"?: string; "fileName"?: string; "created"?: string; "modified"?: string; }>;
export function apiImageImageIdPut(params: ApiImageImageIdPutParams1 & ApiImageImageIdPutAddedParams1): ApiImageImageIdPutResult1;

type ApiImageImageIdPutParams2 = { "path": { "imageId": string; }; "body"?: { "Id"?: string; "Name"?: string; "FileName"?: string; "Created"?: string; "Modified"?: string; }; };
type ApiImageImageIdPutAddedParams2 = { "header"?: { "accept": "multipart/form-data"; "Content-Type": "text/json"; }; };
type ApiImageImageIdPutResult2 = RequestResult<{ "id"?: string; "name"?: string; "fileName"?: string; "created"?: string; "modified"?: string; }>;
export function apiImageImageIdPut(params: ApiImageImageIdPutParams2 & ApiImageImageIdPutAddedParams2): ApiImageImageIdPutResult2;

