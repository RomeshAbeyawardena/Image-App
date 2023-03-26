import { request } from './request';

export function apiImageGet(params) {
  return request("get", `/api/image`)(params);
}

export function apiImagePost(params) {
  return request("post", `/api/image`)(params);
}

export function apiImageImageIdPut(params) {
  return request("put", `/api/image/${params.path.imageId}`)(params);
}

