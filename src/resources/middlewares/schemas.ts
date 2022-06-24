import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import { logError } from "../helpers/loggers";
import { errorResponseType, schemaErrorsType } from "../types/errors";
import { Status, StatusCode } from "../constants";

export const errorResponse = (
  schemaErrors: schemaErrorsType[],
  err: Error,
): errorResponseType => {
  const errors = schemaErrors.map(
    ({ path, message }: { path: (string | number)[]; message: string }) => ({
      path,
      message,
    }),
  );
  logError(err, errors);
  return {
    status: Status.Failed,
    errors,
  };
};

export const validateSchema =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): Response | undefined => {
    const { error } = schema.validate(req.body, {
      abortEarly: true,
      allowUnknown: false,
    });

    if (error && error.isJoi) {
      const err: Error = new Error();
      return res
        .status(StatusCode.Http400)
        .json(errorResponse(error.details, err));
    }

    next();
  };
