import { Request, Response, NextFunction } from "express";
import { Status } from "../constants";

export function logResponseTime(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const startHrTime = process.hrtime();

  res.on(Status.Finish, () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log("%s : %fms", req.path, elapsedTimeInMs);
  });

  next();
}
