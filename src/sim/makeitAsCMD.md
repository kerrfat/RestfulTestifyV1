To make your project an NPM package, you will need to do the following:

Create a package.json file in the root directory of your project. You can use the npm init command to create this file and follow the prompts.

Add the main field to your package.json file. This should point to the entry point of your package, which is typically the compiled JavaScript file. In your case, this would be dist/index.js.

Add the bin field to your package.json file if you want to expose a command-line interface (CLI) for your package. This field should contain an object with the name of your CLI command and the path to the script that should be executed. For example:

json
Copy code
"bin": {
  "oarm-sim": "dist/cli.js"
}
This would create a command called oarm-sim that would execute the cli.js script in the dist directory.

Compile your TypeScript code to JavaScript by running the tsc command. This will generate the compiled JavaScript files in the dist directory.

Copy any additional files that are needed for your package (e.g. XML templates) to the dist directory.

Test your package by running npm pack in the root directory of your project. This will create a tarball of your package in the dist directory.

Publish your package to the NPM registry by running npm publish. This will upload your package to the registry and make it available for installation with the npm install command.

Once your package is published, users can install it by running npm install <your-package-name> in their project directory. They can then import and use your OarmSimulator class in their TypeScript or JavaScript code. If you included a CLI interface, they can also run the oarm-sim command from the command line.