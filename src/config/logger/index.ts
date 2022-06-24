import { Environments } from "../../resources/constants";
import devLogger from "./dev-logger";
import prodLogger from "./prod-logger";

export default process.env.NODE_ENV === Environments.Development
  ? devLogger
  : prodLogger;
