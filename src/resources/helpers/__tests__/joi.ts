import { Regex } from "../../constants";
import { setMinAndMaxLength, setRegex } from "../joi";

describe("setMinAndMaxLength", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return string when both inputs are numbers", () => {
    const expected = ".{1,2}";

    expect(setMinAndMaxLength(1, 2)).toBe(expected);
  });

  it("should return string when fist input is a number and the second is a string", () => {
    const expected = ".{1,2}";

    expect(setMinAndMaxLength(1, "2")).toBe(expected);
  });

  it("should return string when fist input is a number and the second is undefined", () => {
    const expected = ".{1,}";

    expect(setMinAndMaxLength(1)).toBe(expected);
  });
});

describe("setRegex", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return bare minimum regex", () => {
    const expected = /^$/;

    expect(setRegex()).toEqual(expected);
  });

  it("should return with only minimum regex", () => {
    const expected = /^.{1,}$/;

    expect(setRegex(1)).toEqual(expected);
  });

  it("should not return with only maximum regex", () => {
    const expected = /^.{,2}$/;

    expect(setRegex(undefined, 2)).not.toEqual(expected);
  });

  it("should return with minimum and maximum regex", () => {
    const expected = /^.{1,2}$/;

    expect(setRegex(1, 2)).toEqual(expected);
  });

  it("should return with minimum, maximum, and one uppercase regex", () => {
    const expected = /^(?=.*?[A-Z]).{1,2}$/;

    expect(setRegex(1, 2, Regex.OneUppercase)).toEqual(expected);
  });

  it("should return with minimum, and one uppercase regex", () => {
    const expected = /^(?=.*?[A-Z]).{1,}$/;

    expect(setRegex(1, undefined, Regex.OneUppercase)).toEqual(expected);
  });

  it("should return one uppercase regex", () => {
    const expected = /^(?=.*?[A-Z])$/;

    expect(setRegex(undefined, undefined, Regex.OneUppercase)).toEqual(
      expected,
    );
  });

  it("should only return one uppercase regex", () => {
    const expected = /^(?=.*?[A-Z])$/;

    expect(setRegex(undefined, 2, Regex.OneUppercase)).toEqual(expected);
  });
});
