import { BASE_URL } from "../config";
import {
  makeGetRequest,
  // makePostRequest,
  // makePutRequest,
  // uploadFile,
  // makeDeleteRequest,
} from "./http-service";

export const getAllNews = (params) => {
  return new Promise((resolve, reject) => {
    makeGetRequest(BASE_URL + `/search`, false, params)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};
