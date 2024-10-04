/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "vuetify",
    "@vue/eslint-config-typescript",
    "./.eslintrc-auto-import.json",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "eslint:recommended",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  },
};
