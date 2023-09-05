import { AxiosRequestConfig, AxiosResponse } from "axios";
import { camelCase, snakeCase } from "change-case";

const changeKeysCase = (
  obj: any | any[],
  newCase: (value: string) => string
): any => {
  const newObj = {} as any;

  if (Array.isArray(obj)) {
    return obj.map((item) => changeKeysCase(item, newCase));
  }

  if (typeof obj !== "object") {
    return obj;
  }

  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (typeof value === "object") {
      value = changeKeysCase(value, newCase);
    }

    newObj[newCase(key)] = value;
  });

  return newObj;
};

export const changeResponseCase = (response: AxiosResponse) => {
  if (response.data) {
    return changeKeysCase(response.data, camelCase);
  }
  return response.data;
};

export const changeRequestCase = (request: AxiosRequestConfig) => {
  if (request.params) {
    return changeKeysCase(request.params, snakeCase);
  }

  return request.params;
};
