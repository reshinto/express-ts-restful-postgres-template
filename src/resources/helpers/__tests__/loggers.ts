import logger from "../../../config/logger";
import { inspect, logError } from "../loggers";

describe("inspect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return errors as an array", () => {
    const error = new Error();

    expect(inspect(error).length).toBeGreaterThan(1);
  });

  it("should not return any errors", () => {
    const error = {};

    expect(inspect(error).length).toBe(0);
  });
});

describe("logError", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call logger error when args is available", () => {
    const err = new Error();
    const message = "test";
    const logErrorSpy = jest.spyOn(logger, "error");

    logError(err, message, "test2");
    expect(logErrorSpy).toBeCalledTimes(1);
  });

  it("should call logger error when args is undefined", () => {
    const err = new Error();
    const message = "test";
    const logErrorSpy = jest.spyOn(logger, "error");

    logError(err, message);
    expect(logErrorSpy).toBeCalledTimes(1);
  });
});
