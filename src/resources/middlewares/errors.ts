/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { ErrorMessage, StatusCode } from "../constants";
import { logError } from "../helpers/loggers";
import { Error } from "../types/errors";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  const message = err.message || ErrorMessage.SomethingWentWrong;
  logError(err, message);
  return res.status(err.status || StatusCode.Http500).json({
    error: [
      {
        message,
      },
    ],
  });
}

// Catch 404 and forward to error handler
export function failSafeHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const err: Error = new Error(ErrorMessage.NotFound);
  err.status = StatusCode.Http500;
  next(err);
}

export function handleUnhandledRejection(
  reason: unknown,
  promise: unknown,
): void {
  const err: Error = new Error();
  logError(err, ErrorMessage.UnhandledRejection, reason, promise);
}

export function handleUncaughtException(err: Error): void {
  logError(err, ErrorMessage.UncaughtException, err);
  process.exit(1);
}
