import { logResponseTime } from "../loggers";

describe("logResponseTime", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate response time when event finish is triggered", () => {
    const mReq = {};
    const mRes = { on: jest.fn() };
    const mNext = jest.fn();

    mRes.on.mockImplementation((event, cb) => {
      if (event === "finish") {
        // eslint-disable-next-line callback-return
        cb();
      }
    });

    logResponseTime(mReq as any, mRes as any, mNext);

    expect(mRes.on).toBeCalledWith("finish", expect.any(Function));

    expect(mNext).toBeCalledTimes(1);
  });
});
