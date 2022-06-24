import { Context } from "joi";

export interface Error {
  status?: number;
  type?: string;
  message?: string;
  stack?: string;
}

export type schemaErrorsType = {
  message: string;
  path: (string | number)[];
  type: string;
  context?: Context;
};

export type errorResponseType = {
  status: string;
  errors: { path: (string | number)[]; message: string }[];
};
