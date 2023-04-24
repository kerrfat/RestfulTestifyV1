const fs = require('fs');
const path = require('path');
const readline = require('readline');

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Please specify a module name');
  process.exit(1);
}

// Check if the module directory already exists
const moduleDir = path.resolve(__dirname, '..', 'modules', moduleName);
if (fs.existsSync(moduleDir)) {
  console.error(`Module directory already exists: ${moduleName}`);
  process.exit(1);
}

// Create the module directory
fs.mkdirSync(moduleDir);

// Create the __tests__ directory
const testsDir = path.resolve(moduleDir, '__tests__');
fs.mkdirSync(testsDir);

// Create the data directory
const dataDir = path.resolve(moduleDir, 'data');
fs.mkdirSync(dataDir);

// Create the docs directory
const docsDir = path.resolve(moduleDir, 'docs');
fs.mkdirSync(docsDir);

// Create the reports directory
const reportsDir = path.resolve(moduleDir, 'reports');
fs.mkdirSync(reportsDir);

// Create the actions.ts file
const actionsFile = path.resolve(moduleDir, 'actions.ts');
fs.writeFileSync(actionsFile, '');

// Create the objects.ts file
const objectsFile = path.resolve(moduleDir, 'objects.ts');
fs.writeFileSync(objectsFile, '');

// Prompt the user for a description and author
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Enter a description for the new module: ', (description) => {
  rl.question('Enter the author of the module: ', (author) => {
    rl.close();

    // Create the service.config.ts file
    const configData = `{
      "name": "${moduleName}",
      "description": "${description}",
      "ignoredTests": [],
      "createDate": "${new Date().toISOString()}",
      "author": "${author}",
      "testsDir": "__tests__"
    }`;
    const configFile = path.resolve(moduleDir, 'service.config.ts');
    fs.writeFileSync(configFile, configData);

    console.log(`Module created successfully: ${moduleName}`);
  });
});
