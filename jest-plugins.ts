const Generator = require('yeoman-generator');
const chalk = require('chalk');
const inquirer = require('inquirer');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  async prompting() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'moduleName',
        message: 'Enter the name of the new module:',
        validate: function (input) {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          else return 'Module name may only include letters, numbers, underscores and hashes.';
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description for the module:'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Enter the author name for the module:'
      }
    ]);

    this.props = answers;
  }

  writing() {
    const { moduleName, description, author } = this.props;

    // Create the module directory
    mkdirp.sync(`Modules/${moduleName}`);

    // Create the necessary files
    this.fs.copyTpl(
      this.templatePath('service.config.ts'),
      this.destinationPath(`Modules/${moduleName}/service.config.ts`),
      { moduleName, description, author }
    );

    this.fs.copy(
      this.templatePath('__tests__/index.test.ts'),
      this.destinationPath(`Modules/${moduleName}/__tests__/index.test.ts`)
    );

    this.fs.copy(
      this.templatePath('data/data.json'),
      this.destinationPath(`Modules/${moduleName}/data/data.json`)
    );

    this.fs.copy(
      this.templatePath('docs/README.md'),
      this.destinationPath(`Modules/${moduleName}/docs/README.md`)
    );

    this.fs.copy(
      this.templatePath('reports/index.html'),
      this.destinationPath(`Modules/${moduleName}/reports/index.html`)
    );

    this.fs.copy(
      this.templatePath('actions.ts'),
      this.destinationPath(`Modules/${moduleName}/actions.ts`)
    );

    this.fs.copy(
      this.templatePath('objects.ts'),
      this.destinationPath(`Modules/${moduleName}/objects.ts`)
    );
  }

  end() {
    this.log(chalk.green('New module created successfully!'));
  }
};

export const serviceName = {
  name: "User Management Service",
  description: "API for managing user accounts and authentication",
  author: "John Doe",
  createDate: "2022-04-22",
  testsDir: "__tests__",
  ignoredTests: [
    "createUser.test.ts",
    "deleteUser.test.ts",
  ],
};


const fs = require('fs');
const dicomParser = require('dicom-parser');

class DicomMetadata {
  constructor(filePath) {
    const dicomData = fs.readFileSync(filePath);
    const dataSet = dicomParser.parseDicom(dicomData);

    this.studyId = dataSet.string('x00200010');
    this.seriesId = dataSet.string('x0020000e');
    this.patientName = dataSet.string('x00100010');
    this.patientId = dataSet.string('x00100020');
    this.modality = dataSet.string('x00080060');
    this.sopInstanceUid = dataSet.string('x00080018');
    this.frameNumber = dataSet.intString('x00200013');
  }

  getStudyId() {
    return this.studyId;
  }

  getSeriesId() {
    return this.seriesId;
  }

  getPatientName() {
    return this.patientName;
  }

  getPatientId() {
    return this.patientId;
  }

  getModality() {
    return this.modality;
  }

  getSopInstanceUid() {
    return this.sopInstanceUid;
  }

  getFrameNumber() {
    return this.frameNumber;
  }
}

// Example usage:
const dicomMetadata = new DicomMetadata('path/to/dicom/file.dcm');
console.log('Study ID:', dicomMetadata.getStudyId());
console.log('Series ID:', dicomMetadata.getSeriesId());
console.log('Patient Name:', dicomMetadata.getPatientName());
console.log('Patient ID:', dicomMetadata.getPatientId());
console.log('Modality:', dicomMetadata.getModality());
console.log('SOP Instance UID:', dicomMetadata.getSopInstanceUid());
console.log('Frame Number:', dicomMetadata.getFrameNumber());

const fs = require('fs');
const dicomParser = require('dicom-parser');

function getAllDicomTags(filePath) {
  const dicomData = fs.readFileSync(filePath);
  const dataSet = dicomParser.parseDicom(dicomData);

  const tags = dataSet.elements;
  const dicomTags = {};

  for (let tag of tags) {
    const tagValue = dataSet.string(tag.tag);
    dicomTags[tag.tag] = tagValue;
  }

  return dicomTags;
}

// Example usage:
const dicomTags = getAllDicomTags('path/to/dicom/file.dcm');
console.log(dicomTags);
