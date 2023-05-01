const fs = require('fs');
const dicomParser = require('dicom-parser');

class DicomMetadata {
  constructor(filePath) {
    const dicomData = fs.readFileSync(filePath);
    const dataSet = dicomParser.parseDicom(dicomData);

    // Patient information
    this.patientName = dataSet.string('x00100010');
    this.patientId = dataSet.string('x00100020');
    this.patientBirthDate = dataSet.string('x00100030');
    this.patientSex = dataSet.string('x00100040');

    // Study information
    this.studyInstanceUid = dataSet.string('x0020000d');
    this.studyDescription = dataSet.string('x00081030');
    this.studyDate = dataSet.string('x00080020');
    this.studyTime = dataSet.string('x00080030');

    // Series information
    this.seriesInstanceUid = dataSet.string('x0020000e');
    this.seriesDescription = dataSet.string('x0008103e');
    this.seriesDate = dataSet.string('x00080021');
    this.seriesTime = dataSet.string('x00080031');
    this.modality = dataSet.string('x00080060');
    this.bodyPartExamined = dataSet.string('x00180015');
    this.frameOfReferenceUid = dataSet.string('x00200052');

    // Image information
    this.sopInstanceUid = dataSet.string('x00080018');
    this.imageType = dataSet.string('x00080008');
    this.instanceNumber = dataSet.intString('x00200013');
    this.imageOrientationPatient = dataSet.string('x00200037');
    this.imagePositionPatient = dataSet.string('x00200032');
    this.pixelSpacing = dataSet.string('x00280030');
    this.bitsAllocated = dataSet.intString('x00280100');
    this.bitsStored = dataSet.intString('x00280101');
    this.highBit = dataSet.intString('x00280102');
    this.samplesPerPixel = dataSet.intString('x00280002');
    this.planarConfiguration = dataSet.intString('x00280006');
    this.photometricInterpretation = dataSet.string('x00280004');
    this.rows = dataSet.intString('x00280010');
    this.columns = dataSet.intString('x00280011');
    this.pixelData = dataSet.byteArray('x7fe00010');
  }

  getPatientName() {
    return this.patientName;
  }

  getPatientId() {
    return this.patientId;
  }

  getPatientBirthDate() {
    return this.patientBirthDate;
  }

  getPatientSex() {
    return this.patientSex;
  }

  getStudyInstanceUid() {
    return this.studyInstanceUid;
  }

  getStudyDescription() {
    return this.studyDescription;
  }

  getStudyDate() {
    return this.studyDate;
  }

  getStudyTime() {
    return this.studyTime;
  }

  getSeriesInstanceUid() {
    return this.seriesInstanceUid;
  }

  getSeriesDescription() {
    return this.seriesDescription;
  }

  getSeriesDate() {
    return this.seriesDate;
  }

  getSeriesTime() {
    return this.seriesTime;
  }

  getModality() {
    return this.modality;
  }

  getBodyPartExamined() {
    return this.bodyPartExamined;
  }

  getFrameOfReferenceUid() {
    return this.frameOfReferenceUid;
  }

  getSopInstanceUid() {
    return this.sopInstanceUid
  }

  getImageType() {
    return this.imageType;
  }

  getInstanceNumber() {
    return this.instanceNumber;
  }

  getImageOrientationPatient() {
    return this.imageOrientationPatient;
  }

  getImagePositionPatient() {
    return this.imagePositionPatient;
  }

  getPixelSpacing() {
    return this.pixelSpacing;
  }

  getBitsAllocated() {
    return this.bitsAllocated;
  }

  getBitsStored() {
    return this.bitsStored;
  }

  getHighBit() {
    return this.highBit;
  }

  getSamplesPerPixel() {
    return this.samplesPerPixel;
  }

  getPlanarConfiguration() {
    return this.planarConfiguration;
  }

  getPhotometricInterpretation() {
    return this.photometricInterpretation;
  }

  getRows() {
    return this.rows;
  }

  getColumns() {
    return this.columns;
  }

  getPixelData() {
    return this.pixelData;
  }

  toString() {
    return `Patient: ${this.patientName}\nPatient ID: ${this.patientId}\nPatient Birth Date: ${this.patientBirthDate}\nPatient Sex: ${this.patientSex}\n\nStudy: ${this.studyDescription}\nStudy Date: ${this.studyDate}\nStudy Time: ${this.studyTime}\n\nSeries: ${this.seriesDescription}\nSeries Date: ${this.seriesDate}\nSeries Time: ${this.seriesTime}\nModality: ${this.modality}\n\nImage: ${this.sopInstanceUid}\nImage Type: ${this.imageType}\nInstance Number: ${this.instanceNumber}\nImage Orientation Patient: ${this.imageOrientationPatient}\nImage Position Patient: ${this.imagePositionPatient}\nPixel Spacing: ${this.pixelSpacing}\nBits Allocated: ${this.bitsAllocated}\nBits Stored: ${this.bitsStored}\nHigh Bit: ${this.highBit}\nSamples Per Pixel: ${this.samplesPerPixel}\nPlanar Configuration: ${this.planarConfiguration}\nPhotometric Interpretation: ${this.photometricInterpretation}\nRows: ${this.rows}\nColumns: ${this.columns}\nPixel Data Length: ${this.pixelData.length} bytes`;
  }
}




const dicomFilePath = 'path/to/dicom/file';
const dicomMetadata = new DicomMetadata(dicomFilePath);

console.log(dicomMetadata.toString());
