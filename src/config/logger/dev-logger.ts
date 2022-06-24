import winston, { format } from "winston";
import { Filenames, Timestamps } from "../../resources/constants";
import config from "../index";

const logFormat = format.printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp} ${level}: ${stack || message}`,
);

export default winston.createLogger({
  level: config.logLevel, // level is info by default
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: Timestamps.YYYYMMDDHHmmss }),
    format.errors({ stack: true }),
    logFormat,
  ),
  transports: [new winston.transports.File({ filename: Filenames.Stdout })],
});
