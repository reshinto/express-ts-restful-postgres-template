// eslint-disable-next-line @typescript-eslint/no-var-requires
const pjson = require("../../../package.json");

// general
export enum StatusCode {
  Http400 = 400,
  Http500 = 500,
  Http401 = 401,
  Http403 = 403,
}

export enum Status {
  Failed = "failed",
  Finish = "finish",
  UnhandledRejection = "unhandledRejection",
  UncaughtException = "uncaughtException",
}

export enum ErrorMessage {
  SomethingWentWrong = "Something went wrong",
  NotFound = "Not Found",
  UnhandledRejection = "Unhandled Rejection",
  UncaughtException = "Uncaught Exception",
  NoAuthToken = "No auth token",
  InvalidUsernameOrPassword = "Invalid username or password",
}

export enum InspectLevel {
  One = 1,
  Five = 5,
}

export enum SplitString {
  Space = " ",
  NewLine = "\n",
}

// config
export enum Ports {
  threeThousand = 3000,
}

export enum Timestamps {
  YYYYMMDDHHmmss = "YYYY-MM-DD HH:mm:ss",
}

export enum Filenames {
  Stdout = "stdout.log",
}

export enum Environments {
  Development = "development",
}

export enum UrlWhitelists {
  Localhost = "http://localhost:3000",
}

export enum DbSampleConfig {
  Name = "db",
  User = "dbUser",
  Password = "dbPw",
  Host = "db",
  Dialect = "postgres",
}

export enum LogLevels {
  Info = "info",
}

export enum SampleCredentials {
  TokenSecret = "secret",
}

export enum PassportAuth {
  Local = "local",
  Jwt = "jwt",
}

export enum TokenExpiration {
  thirtyMinutes = "1800s",
}

// loaders
export enum ExpressKeys {
  AppName = "appName",
  StrictRouting = "strict routing",
  XPoweredBy = "x-powered-by",
}

export const ExpressConfigValues = {
  appName: pjson.name,
  strictRouting: true,
  xPoweredBy: false,
};

export enum MinUser {
  One = 1,
}

export enum Timeout {
  FiveSeconds = 5000,
}

export enum Retries {
  Zero = 0,
  One = 1,
  Ten = 10,
}

// models
export const JoiAuthenticate = {
  min3: 3,
  min6: 6,
  maxUndefined: undefined,
};

export enum Permissions {
  Read = "READ",
  Write = "WRITE",
  Delete = "DELETE",
  Share = "SHARE",
  UploadFiles = "UPLOAD_FILES",
}

export const Regex = {
  OneUppercase: "(?=.*?[A-Z])",
  OneLowercase: "(?=.*?[a-z])",
  OneDigit: "(?=.*?[0-9])",
  OneSpecialChar: "(?=.*?[#?!@$%^&*-])",
  Permissions: `(${Permissions.Read}|${Permissions.Write}|${Permissions.Delete}|${Permissions.Share}|${Permissions.UploadFiles})`,
};

export const JoiGroup = {
  min1: 1,
  minUndefined: undefined,
  maxUndefined: undefined,
};

export const JoiUser = {
  min3: 3,
  min6: 6,
  min4: 4,
  max130: 130,
  maxUndefined: undefined,
};

export enum DbTableNames {
  Id = "id",
  CreatedAt = "created_at",
  UpdatedAt = "updated_at",
  IsDeleted = "is_deleted",
}

export enum ModelNames {
  Groups = "groups",
  Users = "users",
  UserGroups = "usergroups",
}
