import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import passport from "passport";
import config from "../config";
import { logError } from "../resources/helpers/loggers";
import { Error } from "../resources/types/errors";
import {
  ErrorMessage,
  PassportAuth,
  SplitString,
  StatusCode,
  TokenExpiration,
} from "../resources/constants";

export const generateAccessToken = (username: string): string =>
  jwt.sign({ username }, config.tokenSecret, {
    expiresIn: TokenExpiration.thirtyMinutes,
  });

export async function checkJwtToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  passport.authenticate(PassportAuth.Jwt, async (err, user, info) => {
    try {
      if (err || !user) {
        const errorMsg = info.stack.split(SplitString.NewLine)[0];
        const error: Error = new Error(errorMsg);

        if (errorMsg.includes(ErrorMessage.NoAuthToken)) {
          error.status = StatusCode.Http401;
        } else {
          error.status = StatusCode.Http403;
        }

        return next(error);
      }
      return next();
    } catch (error) {
      const _err = new Error();
      logError(_err, error);
      return next(error);
    }
  })(req, res, next);
}
