const js = require("@eslint/js");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },

    rules: {
      ...js.configs.recommended.rules,

      "no-unused-vars": "warn",
    },
  },
]);
