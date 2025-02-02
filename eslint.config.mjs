import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/*.{js,mjs,cjs,ts}"],
    rules: {}
  },
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "_"
    }],
    "@typescript-eslint/no-explicit-any": "off"
  },
  ...tseslint.configs.recommended,
];
