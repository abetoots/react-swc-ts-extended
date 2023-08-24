# `react-swc-ts-extended`

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/wtchnm/Vitamin/blob/main/LICENSE)

This template provides a minimal setup using Vite's `react-swc-ts` template and extending it with a few features.

## Features

- [Vite](https://vitejs.dev) and [SWC](https://swc.rs/) with [React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths).
- [Tailwind CSS v3](https://tailwindcss.com) with a [basic reset for form styles](https://github.com/tailwindlabs/tailwindcss-forms) and a [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) that automatically sorts classes.
- Use [ESLint](https://eslint.org) and [Prettier](https://prettier.io) on VSCode and before you commit with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- Write unit and integration tests with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) using `happy-dom`.

## Getting started

Use this repository as a [GitHub template](https://github.com/wtchnm/Vitamin/generate) or use [degit](https://github.com/Rich-Harris/degit) to clone to your machine with an empty git history:

```
npx degit abetoots/react-swc-ts-extended#main my-app
```

Then, install the dependencies:

```
pnpm install
```

## Before you start coding

- [ ] Change the title, description and theme color in the `index.html` and `vite.config.ts`. The [Inter](https://rsms.me/inter/) font is included, so remove it if you want.
- [ ] Modify or delete the `LICENSE` file.
- [ ] Change the `name` field in package.json.

## Committing your code using `commitizen`

```
npm run commit
```

## Main changes added

1. **Package.json**

   - [x] remove type "module" from package.json

2. **tsconfig**

   - [x] update tsconfig.json to `module: "ESNext"`
   - [x] update tsconfig.node.json to `"strictNullChecks": true`

3. **eslint**

   - [x] update eslint and added `-D npm-run-all eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh`
   - [x] add scripts to `package.json`:

   ```
   "lint": "run-p run-eslint",
   "run-eslint": "eslint . --ext ts,tsx  --cache --fix --ignore-path .gitignore"
   ```

   - [x] update the following to `.eslintrc.cjs`:

   ```
    settings: {
    react: {
      version: "detect",
    },
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
    ],
    plugins: ["react", "react-hooks", "react-refresh", "@typescript-eslint"],
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
    ]
   ```

4. **Add prettier**

   - [x] install `-D prettier eslint-config-prettier`
   - [x] follow https://prettier.io/docs/en/install and https://prettier.io/docs/en/integrating-with-linters.html

5. **Add unit testing**

   - [x] add `-D vitest @testing-library/react eslint-plugin-testing-library @testing-library/dom @testing-library/jest-dom @testing-library/user-event happy-dom`
   - [x] update package.json scripts:

   ```
    "test": "vitest",
    "coverage": "vitest run --coverage",
    "test:ci": "vitest run",
    "test:ui": "vitest --ui"
   ```

   - [x] update tsconfig.json compilerOptions.types

   ```
   "types": ["vite/client", "vitest/globals"]
   "types": ["vitest"]// to tsconfig.node.json
   ```

   - [x] add to eslint `overrides`

   ```
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
   ```

   - [x] update vite config

   ```
    test: {
        globals: true,
        include: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
        environment: "happy-dom",
        setupFiles: "./src/setupTests.ts",
    },
   ```

6. **Add commitizen**

   - [x] add `-D commitizen cz-conventional-changelog`
   - [x] add `"commit": "cz"` to package.json scripts
   - [x] add .cz.json file

7. **Use git hooks to lint before committing**

   - [x] add husky, lint-staged, and npm-run-all

   ```
   pnpm install -D husky lint-staged npm-run-all
   pnpm exec husky install
   npm pkg set scripts.prepare="husky install"
   pnpm exec husky add .husky/pre-commit "pnpm exec lint-staged"
   ```

   - [x] update package.json

   ```
   //add to scripts
       "lint": "run-p typecheck run-eslint",
       "run-eslint": "eslint . --ext ts,tsx  --cache --fix --ignore-path .gitignore"
   //add
   "lint-staged": {
   	"*": "prettier -uw --cache",
   	"*.css": "stylelint --cache --fix",
   	"*.{ts,tsx}": [
   		"eslint --cache --fix",
   		"vitest related --run --coverage=false"
   	]
   },

   ```

8. **Add tailwind v3**

   - [x] follow https://tailwindcss.com/docs/guides/vite and add `-D prettier-plugin-tailwindcss eslint-plugin-tailwindcss tailwindcss postcss autoprefixer`
   - [x] update prettier config with plugin: "prettier-plugin-tailwindcss"
   - [x] update eslint extends with: "plugin:tailwindcss/recommended"

9. **Enable using absolute paths**
   - [x] add `-D eslint-plugin-import vite-tsconfig-paths`
   - [x] update eslint extends
   ```
   "plugin:import/recommended",
   "plugin:import/typescript",
   ```
   - [x] add vite-tsconfig-paths to vite config plugins

## Optional

1. If publishing to npm

   - remove private:true
   - add exports field to package.json
   - move react and react-dom to peer dependencies

2. If a PWA

   - add `-D vite-plugin-pwa` and update vite config
   - update tsconfig.json compilerOptions.types with: `"types": ["vite-plugin-pwa/client"]`

3. If using stylelint

   - follow https://stylelint.io/user-guide/get-started
   - add `"*.css": "stylelint --cache --fix"` to package.json "lint-staged"

4. If you to want to add eslint to Vite dev server and output logs to console
   - add `-D @nabla/vite-plugin-eslint`
