import logger from "../../config/logger";
import { Error } from "../../resources/types/errors";
import { InspectLevel, SplitString } from "../constants";

export function inspect(e: Error): string[][] {
  const frame: string[] = e.stack?.split(SplitString.NewLine) || [];
  const newFrame = [];
  for (const str of frame) {
    newFrame.push(str.split(SplitString.Space));
  }
  return newFrame;
}

export function logError(
  err: Error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any,
  ...args: unknown[]
): void {
  const funcDetails = inspect(err);
  if (args.length) {
    logger.error(message, {
      method: funcDetails[InspectLevel.One][InspectLevel.Five],
      args,
    });
  } else {
    logger.error(message, {
      method: funcDetails[InspectLevel.One][InspectLevel.Five],
    });
  }
}
