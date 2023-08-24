import axios from "axios";
import { getCookie, setCookie } from "./FrontendHelper";

const HeaderData = async (update = false) => {
  const token = getCookie("accessToken");

  if (token === null) {
    return {
      "Content-Type": "application/json",
    };
  } else if (update) {
    return {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    };
  } else {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
};

axios.defaults.baseURL = "http://localhost:8000";

export const Api = async (action) => {
  let response = null;
  if (
    action.type_data.method === "POST" ||
    action.type_data.method === "post"
  ) {
    console.log("from baseurl", action);
    response = await axios.post(action.type_data.endPoint, action.payload, {
      headers: await HeaderData(action.type_data.multipartFormData),
    });
  } else if (
    action.type_data.method === "PUT" ||
    action.type_data.method === "put"
  ) {
    response = await axios.put(action.type_data.endPoint, action.payload, {
      headers: await HeaderData(action.type_data.multipartFormData),
    });
  } else if (
    action.type_data.method === "PATCH" ||
    action.type_data.method === "patch"
  ) {
    response = await axios.patch(action.type_data.endPoint, action.payload, {
      headers: await HeaderData(action.type_data.multipartFormData),
    });
  } else if (
    action.type_data.method === "DELETE" ||
    action.type_data.method === "delete"
  ) {
    response = await axios.delete(action.type_data.endPoint, {
      params: { ...action.type_data.params },
      data: { ...action.type_data.params },
      headers: await HeaderData(action.type_data.multipartFormData),
    });
  } else {
    console.log("get");
    response = await axios.get(action.type_data.endPoint, {
      params: { ...action.type_data.params },
      headers: await HeaderData(action.type_data.multipartFormData),
    });
    console.log(response, "response from allapi");
  }
  if (action.type_data.saveBearerToken) {
    if (response.data.accessToken !== undefined) {
      console.log("response accesstoken", response, "token");
      setCookie("accessToken", response.data.accessToken);
    } else if (response.data.toke !== undefined) {
      console.log("response token", response);
      setCookie("accessToken", response.data.token);
    } else if (response.data.access_token !== undefined) {
      console.log("response access_token", response);
      setCookie("accessToken", response.data.access_token);
    }
  }
  return response;
};
