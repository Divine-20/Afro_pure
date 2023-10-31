import { isAxiosError } from "axios";
import { ResponseType } from "../types/response.type";


export class CustomError extends Error {
  response: ResponseType<null>;

  constructor(response: ResponseType<null>) {
    super(response.message);
    this.name = "CustomError";
    this.response = response;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export type CustomErrorType = {
  message: string;
  response: ResponseType<null>;
};

export const AxiosErrorHandler = (error: any): ResponseType<null> => {
  if (isAxiosError(error)) {
    if (error.response) {
      return {
        message: error.response.data.message,
        success: true,
        info: error.response.data.info,
      };
    } else if (error.request) {
      return {
        message: "Gateway Timeout: The server did not respond in time.",
        success: false,
      };
    } else {
      return {
        message: "Bad Request: The request could not be processed.",
        success: false,
        data: null,
      };
    }
  }
  return {
    message: "Internal Server Error: An error occurred on the server.",
    success: true,
    data: null,
  };
};
