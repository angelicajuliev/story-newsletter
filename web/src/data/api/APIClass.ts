import axios, { AxiosError, AxiosInstance } from "axios";
import { CONSTANTS } from "@helpers/constants";
import { changeRequestCase, changeResponseCase } from "@helpers/changeCase";

export class API {
  public http;

  constructor(axiosIntance: AxiosInstance) {
    this.http = axiosIntance;
    this._setupHttpInstance();
    this._setupHandleError();
  }

  setToken = (tokenParam?: string) => {
    this.http.interceptors.request.use(function (request) {
      const token = localStorage.getItem(CONSTANTS.KEYS_STORAGE.SESSION_TOKEN);
      request.headers.Authorization = `Bearer ${token ?? tokenParam}`;
      return request;
    });
  };

  private _setupHttpInstance() {
    this.http.interceptors.request.use(function (request) {
      axios.defaults.headers["Content-Type"] = "application/json";
      if (request?.data) {
        request.data = changeRequestCase(request);
      }
      return request;
    });
  }

  private _setupHandleError() {
    this.http.interceptors.response.use(
      (response) => {
        if (response?.data) {
          response.data = changeResponseCase(response);
        }
        return response;
      },
      (error: AxiosError | any) => {
        if (error.response?.status === CONSTANTS.RESPONSE_CODES.UNAUTHORIZED) {
          if (error.response.data["detail"].includes("Token")) {
            localStorage.removeItem(CONSTANTS.KEYS_STORAGE.SESSION_TOKEN);
          }
        }
        console.error("Unhandled", error);
        return Promise.reject(error);
      }
    );
  }
}
