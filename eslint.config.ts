import tseslint from "typescript-eslint";

const nodeGlobals = {
  globals: {
    process: "readonly",
    __dirname: "readonly",
    __filename: "readonly",
    exports: "readonly",
    module: "readonly",
    require: "readonly",
    Buffer: "readonly",
    console: "readonly",
    setImmediate: "readonly",
    clearImmediate: "readonly",
    setInterval: "readonly",
    clearInterval: "readonly",
    setTimeout: "readonly",
    clearTimeout: "readonly",
  },
};

export default [
  tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    ignores: ["dist/**", "build/**"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
      ...nodeGlobals,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-var-requires": "off",
      "no-useless-escape": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
