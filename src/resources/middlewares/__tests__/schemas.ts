import Joi from "joi";
import { errorResponse, validateSchema } from "../schemas";

describe("errorResponse", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error", () => {
    const schemaError = [
      {
        message: "error",
        path: ["path"],
        type: "type",
        context: {},
      },
    ];
    const expected = {
      status: "failed",
      errors: [
        {
          path: ["path"],
          message: "error",
        },
      ],
    };

    expect(errorResponse(schemaError, new Error())).toEqual(expected);
  });
});

describe("validateSchema", () => {
  const schema = Joi.object().keys({ id: Joi.string().required() });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error", () => {
    const validationResults = {
      error: {
        details: [
          { message: "validation error", path: ["path"], type: "string" },
        ],
        isJoi: true,
      },
    };
    const validateSpy = jest
      .spyOn(schema, "validate")
      .mockReturnValueOnce(validationResults as any);
    const mReq = { body: { id: "test" } };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mNext = jest.fn();
    const expected = {
      "errors": [{ "message": "validation error", "path": ["path"] }],
      "status": "failed",
    };
    validateSchema(schema)(mReq as any, mRes as any, mNext);
    expect(validateSpy).toBeCalledWith(
      { id: "test" },
      {
        abortEarly: true,
        allowUnknown: false,
      },
    );
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.json).toBeCalledWith(expected);
  });

  it("should pass the validation and call api", () => {
    const validationResults = { error: undefined };
    const validateSpy = jest
      .spyOn(schema, "validate")
      .mockReturnValueOnce(validationResults as any);
    const mReq = { body: { id: "test" } };
    const mRes = {};
    const mNext = jest.fn();
    validateSchema(schema)(mReq as any, mRes as any, mNext);
    expect(validateSpy).toBeCalledWith(
      { id: "test" },
      {
        abortEarly: true,
        allowUnknown: false,
      },
    );
    expect(mNext).toBeCalled();
  });
});
