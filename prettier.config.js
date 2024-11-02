/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  trailingComma: "es5",
  tabWidth: 2,
  jsxSingleQuote: true,
  singleQuote: true,
  semi: false,
  useTabs: false,
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
};
