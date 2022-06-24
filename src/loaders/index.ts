import postgresLoader from "./postgres";
import setupPassport from "./setupPassport";

export default async (): Promise<void> => {
  await postgresLoader();
  await setupPassport();
};
