import {
  errorHandler,
  failSafeHandler,
  handleUncaughtException,
  handleUnhandledRejection,
} from "../errors";
import { Error } from "../../types/errors";
import logger from "../../../config/logger";

describe("errorHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return default error values", () => {
    const err = new Error();
    const mReq = {};
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mNext = jest.fn();
    errorHandler(err, mReq as any, mRes as any, mNext);
    const expected = { "error": [{ "message": "Something went wrong" }] };

    expect(mRes.status).toBeCalledWith(500);
    expect(mRes.json).toBeCalledWith(expected);
  });

  it("should return custom error values", () => {
    const err: Error = new Error("test");
    err.status = 400;
    const mReq = {};
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mNext = jest.fn();
    errorHandler(err, mReq as any, mRes as any, mNext);
    const expected = { "error": [{ "message": "test" }] };

    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(expected);
  });
});

describe("failSafeHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call next", () => {
    const mReq = {};
    const mRes = {};
    const mNext = jest.fn();
    const err: Error = new Error("Not Found");
    err.status = 500;

    failSafeHandler(mReq as any, mRes as any, mNext);

    expect(mNext).toBeCalledTimes(1);
    expect(mNext).toBeCalledWith(err);
  });
});

describe("handleUnhandledRejection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call logger error", () => {
    const logErrorSpy = jest.spyOn(logger, "error");

    handleUnhandledRejection("test", undefined);
    expect(logErrorSpy).toBeCalledTimes(1);
  });
});

describe("handleUncaughtException", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call logger error", () => {
    const realProcess = process;
    const exitMock = jest.fn();
    const err = new Error();
    const logErrorSpy = jest.spyOn(logger, "error");
    global.process = { ...realProcess, exit: exitMock } as any;

    handleUncaughtException(err);
    expect(logErrorSpy).toBeCalledTimes(1);
    expect(exitMock).toHaveBeenCalledWith(1);
    global.process = realProcess;
  });
});
