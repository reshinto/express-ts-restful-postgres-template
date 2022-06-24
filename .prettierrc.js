module.exports = {
  trailingComma: "all",
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  printWidth: 80,
  proseWrap: "preserve",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  quoteProps: "preserve",
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],
};
