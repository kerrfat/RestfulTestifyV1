Sure, here are the steps to set up the project:

Create a new directory for the project, and navigate into it.

Initialize a new NPM project with the command npm init. This will create a package.json file for the project.

Install the following development dependencies:

typescript for TypeScript support.
ts-node for running TypeScript files directly.
@types/node for type definitions for Node.js.
eslint for code linting.
prettier for code formatting.
eslint-config-prettier to disable conflicting rules between ESLint and Prettier.
eslint-plugin-prettier to integrate Prettier with ESLint.
You can install these dependencies with the following command:

sh
Copy code
npm install --save-dev typescript ts-node @types/node eslint prettier eslint-config-prettier eslint-plugin-prettier
Create a tsconfig.json file for TypeScript configuration. You can generate one with the command npx tsc --init.

Create a src directory for TypeScript source files.

Create an index.ts file in the src directory. This will be the entry point for the application.

Create a dist directory for compiled JavaScript files.

Add the following script entries to the package.json file:

"start": "ts-node src/index.ts" to run the application with TypeScript support.
"build": "tsc" to compile the TypeScript files to JavaScript.
"watch": "tsc --watch" to watch the TypeScript files for changes and recompile them automatically.
Create a .eslintignore file to ignore files from ESLint. You can add the following entries:

Copy code
node_modules/
dist/
Create an .eslintrc.json file for ESLint configuration. You can add the following entries:

json
Copy code
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": "error"
  }
}
Create a .prettierrc.json file for Prettier configuration. You can add the following entries:
json
Copy code
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2
}
Your project is now set up and ready to begin development. You can start by writing the TypeScript code for the OarmSimulator class in the src directory.