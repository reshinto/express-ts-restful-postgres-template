import express from "express";
import expressLoader from "./loaders/express";
import loaders from "./loaders";
import {
  handleUncaughtException,
  handleUnhandledRejection,
} from "./resources/middlewares/errors";
import { Ports, Status } from "./resources/constants";

const PORT = Ports.threeThousand;

export function startServer(): express.Application {
  const _app = express();

  expressLoader({ app: _app });

  process
    .on(Status.UnhandledRejection, handleUnhandledRejection)
    .on(Status.UncaughtException, handleUncaughtException);

  return _app;
}

const app = startServer();

const server = app.listen(PORT, async () => {
  await loaders();
  console.log(`Server is listening on port ${PORT}`);
});

export default server;
