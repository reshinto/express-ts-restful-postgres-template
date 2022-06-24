import express from "express";
import cors from "cors";
import passport from "passport";
import routers from "../routers";
import corsOptions from "../config/corsOptions";
import { logResponseTime } from "../resources/middlewares/loggers";
import { errorHandler, failSafeHandler } from "../resources/middlewares/errors";
import { ExpressConfigValues, ExpressKeys } from "../resources/constants";

export default ({ app }: { app: express.Application }): express.Application => {
  // -------------------------
  // app properties
  // -------------------------

  app.set(ExpressKeys.AppName, ExpressConfigValues.appName);

  // -------------------------
  // app settings
  // -------------------------

  app.set(ExpressKeys.StrictRouting, ExpressConfigValues.strictRouting);

  app.set(ExpressKeys.XPoweredBy, ExpressConfigValues.xPoweredBy);

  // -------------------------
  // app middlewares
  // -------------------------

  // Enable All CORS Requests
  app.use(cors(corsOptions));

  // allow parsing of json body
  app.use(express.json());

  // initialize passport
  app.use(passport.initialize());
  // app.use(passport.session());

  app.use(logResponseTime);

  // -------------------------
  // router level
  // -------------------------

  app.use(routers.authRouter);
  app.use(routers.userRouter);
  app.use(routers.groupRouter);
  app.use(routers.userGroupRouter);

  // -------------------------
  // error-handling middleware
  // -------------------------

  app.use(failSafeHandler);
  app.use(errorHandler);

  return app;
};
