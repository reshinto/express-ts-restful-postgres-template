export const setMinAndMaxLength = (
  min: number,
  max: number | string = "",
): string => `.{${min},${max}}`;

export const setRegex = (
  min?: number,
  max?: number,
  ...args: string[]
): RegExp => {
  let regex = "";
  for (const arg of args) {
    regex += arg;
  }
  if (min) {
    regex += max ? setMinAndMaxLength(min, max) : setMinAndMaxLength(min, "");
  }
  return new RegExp(`^${regex}$`);
};
