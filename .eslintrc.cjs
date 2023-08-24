module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true, jest: true },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-hooks", "react-refresh", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ["src/**/*.ts?(x)"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    {
      files: ["vite.config.ts", "tailwind.config.js"],
      parserOptions: {
        project: ["./tsconfig.node.json"],
      },
    },
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
      rules: {
        "@typescript-eslint/no-magic-numbers": ["off"],
        "testing-library/no-await-sync-events": [
          "error",
          {
            eventModules: ["fire-event"],
          },
        ],
        "testing-library/no-manual-cleanup": "error",
        "testing-library/prefer-explicit-assert": "error",
        "testing-library/prefer-user-event": "error",
      },
    },
  ],
};
