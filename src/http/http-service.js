import { getToken } from "./token-interceptor";
import { handleErrorIfAvailable } from "../error-handler/index";
import { structureQueryParams } from "../helpers";
import axios from "axios";

export const makeGetRequest = async (
  url,
  attachToken = false,
  params = null
) => {
  let queryString = "";
  if (params) {
    queryString = structureQueryParams(params);
  }
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        // console.log(authToken);
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(url + queryString)
        // .then((res) => {
        //   handleErrorIfAvailable(res);
        //   return res.json();
        // })
        .then((jsonResponse) => {
          resolve(jsonResponse);
        })
        .catch((e) => {
          console.log("XHR GET Error: ", e);
          reject(e);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makePostRequest = async (
  url,
  attachToken = false,
  params = {}
) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log("Error fetching auth token: ", e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(params),
      })
        .then((res) => {
          handleErrorIfAvailable(res);
          return res.json();
        })
        .then(
          (jsonResponse) => {
            if (jsonResponse.error === false) {
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makePutRequest = async (url, attachToken = false, params = {}) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log("Error fetching auth token: ", e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(params),
      })
        .then((res) => {
          handleErrorIfAvailable(res);
          return res.json();
        })
        .then(
          (jsonResponse) => {
            if (jsonResponse.error === false) {
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makeDeleteRequest = async (
  url,
  attachToken = false,
  params = {}
) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log("Error fetching auth token: ", e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(params),
      })
        .then((res) => {
          handleErrorIfAvailable(res);
          return res.json();
        })
        .then(
          (jsonResponse) => {
            if (jsonResponse.error === false) {
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

// export const uploadFileMultiPart = async (
//   attachToken = false,
//   formData,
//   mediaType = "image"
// ) => {
//   let headers = {};

//   if (attachToken) {
//     try {
//       const authToken = await getToken();
//       if (authToken) {
//         headers["Authorization"] = "Bearer " + authToken;
//       }
//     } catch (e) {
//       console.log("Error fetching auth token: ", e);
//     }
//   }

//   return new Promise((resolve, reject) => {
//     try {
//       fetch(cloudinaryURL, {
//         method: "POST",
//         headers: headers,
//         body: formData,
//       })
//         .then((res) => {
//           handleErrorIfAvailable(res);
//           return res.json();
//         })
//         .then(
//           (jsonResponse) => {
//             resolve(jsonResponse);
//           },
//           (error) => {
//             reject(error);
//           }
//         )
//         .catch((error) => {
//           reject(error);
//         });
//     } catch (e) {
//       console.log(e);
//       reject();
//     }
//   });
// };

export const uploadFile = async (url, attachToken = false, formData) => {
  let headers = {};
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log("Error fetching auth token: ", e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: formData,
      })
        .then(
          (res) => {
            handleErrorIfAvailable(res);
            return res.json();
          },
          (error) => {
            reject(error);
          }
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};
