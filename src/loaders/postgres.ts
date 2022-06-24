import { Sequelize } from "sequelize";
import config from "../config";
import { DbSampleConfig, Retries, Timeout } from "../resources/constants";

export const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    host: DbSampleConfig.Host,
    dialect: DbSampleConfig.Dialect,
  },
);

async function connectDb(retries = Retries.Ten): Promise<void> {
  while (retries > Retries.Zero) {
    try {
      await sequelize.authenticate();
      break;
    } catch (error) {
      retries -= Retries.One;
      await new Promise(res => setTimeout(res, Timeout.FiveSeconds));
    }
  }
}

export default connectDb;
