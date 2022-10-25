// We use this ESLint plugin as "dg" in .eslintrc.js
const PLUGIN_NAME = "dg";

/**
 * This file + module is used to add our own custom ESLint rules. Add new rules below
 * using the AST explorer at https://astexplorer.net/ to understand what nodes to target.
 * Here's how to add a new rule:
 * 1. Create a new file in this directory that defines the rule
 * 2. Import + add the rule to `rules` below
 * 3. Run `pnpm lint` on failing code and make sure it picks up the error! Run `pnpm install` if it doesn't show up
 */

const rules = {
  "no-restricted-packages": require("./no-restricted-packages.js"),
};

// Make sure we include all rules defined above as errors
const configs = {
  all: {
    plugins: [PLUGIN_NAME],
    rules: Object.fromEntries(
      Object.keys(rules).map((rule) => [`${PLUGIN_NAME}/${rule}`, "error"])
    ),
  },
};

module.exports = {
  rules,
  configs,
};
