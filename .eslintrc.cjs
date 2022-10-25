const BASE_EXTENSIONS = [
  "prettier",
  "plugin:react/recommended",
  "plugin:astro/recommended",
  "plugin:astro/jsx-a11y-strict",
  "plugin:dg/all",
];

const TYPESCRIPT_EXTENSIONS = [
  ...BASE_EXTENSIONS,
  "airbnb/hooks",
  "plugin:@typescript-eslint/recommended",
  "plugin:@typescript-eslint/recommended-requiring-type-checking",
];

const BASE_PLUGINS = ["react"];

const BASE_RULES = {
  // We want to enable prop spreading (i.e. <Component {...props} />) since it allows us to easily pass props to child components
  "react/jsx-props-no-spreading": "off",
  // Always prefer arrow functions for component definitions
  "react/function-component-definition": [
    "error",
    {
      namedComponents: "arrow-function",
      unnamedComponents: "arrow-function",
    },
  ],
};

const TYPESCRIPT_RULES = {
  ...BASE_RULES,
  // The typescript version of no-return-await takes over to add a few okay cases
  "no-return-await": "off",
  // This needs to be turned on to take over from `no-return-await`
  "@typescript-eslint/return-await": "error",
  // There's a rule against floating promises, but React can't have
  // useEffect be async. We get around it with an immediately invoked function (a void function)
  "@typescript-eslint/no-floating-promises": ["error", { ignoreIIFE: true }],
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
  "@typescript-eslint/restrict-template-expressions": "off",
  // Type assertions (const x: Type = y as Type) create bugs and mask errors, don't allow them at all
  "@typescript-eslint/consistent-type-assertions": [
    "error",
    { assertionStyle: "never" },
  ],
  // In Typescript, default props are supported as default arguments
  "react/require-default-props": "off",
  // There's a typescript option `noFallthroughCasesInSwitch` that's more robust and allows for union types to have no default fallthrough. Preferred!
  "default-case": "off",
  // Typescript makes this obsolete, as it'll warn if there's a value returned that's
  // not what's expected or vice versa
  "consistent-return": "off",
  // This is broken
  "@typescript-eslint/indent": "off",
};

const TYPESCRIPT_OVERRIDE = {
  files: ["src/**/*.{ts,tsx}", "scripts/**/*.ts"],
  extends: TYPESCRIPT_EXTENSIONS,
  plugins: [...BASE_PLUGINS, "@typescript-eslint"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: TYPESCRIPT_RULES,
};

// Scripts allow console logging
const SCRIPTS_OVERRIDE = {
  ...TYPESCRIPT_OVERRIDE,
  files: ["scripts/**/*.ts"],
  rules: {
    ...TYPESCRIPT_RULES,
    // Console logging allowed
    "no-console": "off",
  },
};

const ASTRO_OVERRIDE = {
  files: ["*.astro"],
  extends: BASE_EXTENSIONS,
  plugins: BASE_PLUGINS,
  globals: {
    Astro: "readonly",
  },
  parser: "astro-eslint-parser",
  parserOptions: {
    extraFileExtensions: [".astro"],
  },
  rules: {
    ...BASE_RULES,
    "react/no-unknown-property": ["error", { ignore: ["class"] }],
  },
};

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: BASE_EXTENSIONS,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  globals: {
    React: "readable",
  },
  plugins: BASE_PLUGINS,
  reportUnusedDisableDirectives: true,
  rules: BASE_RULES,
  overrides: [TYPESCRIPT_OVERRIDE, SCRIPTS_OVERRIDE, ASTRO_OVERRIDE],
};
