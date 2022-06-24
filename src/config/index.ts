import "dotenv/config";
import {
  DbSampleConfig,
  LogLevels,
  SampleCredentials,
} from "../resources/constants";

export default {
  dbName: (process.env.POSTGRES_DB as string) || DbSampleConfig.Name,
  dbUser: (process.env.POSTGRES_USER as string) || DbSampleConfig.User,
  dbPassword: process.env.POSTGRES_PASSWORD || DbSampleConfig.Password,
  logLevel: process.env.LOG_LEVEL || LogLevels.Info,
  tokenSecret: process.env.TOKEN_SECRET || SampleCredentials.TokenSecret,
};
