import cors from "cors";
import { UrlWhitelists } from "../resources/constants";

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = [UrlWhitelists.Localhost];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default options;
