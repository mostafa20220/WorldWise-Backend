import { ValidationError } from "express-validator";

type Status = "success" | "fail" | "error";
export const createRes = (status: Status, dataOrError: unknown,code:number=200) => {
  if (status === "success") return { status, data: dataOrError };
  if (status === "error" || status === "fail")
    return { status, data: null,code, error: dataOrError };

  throw new Error("Unhandled Status: " + status);
};


export class AppError extends Error {
  code: number;
  statusText: Status;
  constructor(
    code: number,
    statusText: Status,
    message: string | ValidationError[]
  ) {
    super();
    this.code = code;
    this.statusText = statusText;
    this.message = Array.isArray(message) ? message.map((error) => error.msg).join(", ") : message;
  }
}
