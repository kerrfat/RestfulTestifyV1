const dicomParser = require('dicom-parser');

class DicomMetadata {
  constructor(dicomFilePath) {
    const byteArray = fs.readFileSync(dicomFilePath);
    const dataSet = dicomParser.parseDicom(byteArray);
    
    // Patient Information
    this.patientName = dataSet.string('x00100010');
    this.patientId = dataSet.string('x00100020');
    this.patientBirthDate = dataSet.string('x00100030');
    this.patientSex = dataSet.string('x00100040');
    
    // Study Information
    this.studyInstanceUid = dataSet.string('x0020000d');
    this.studyDescription = dataSet.string('x00081030');
    this.studyDate = dataSet.string('x00080020');
    this.studyTime = dataSet.string('x00080030');
    
    // Series Information
    this.seriesInstanceUid = dataSet.string('x0020000e');
    this.seriesDescription = dataSet.string('x0008103e');
    this.seriesDate = dataSet.string('x00080021');
    this.seriesTime = dataSet.string('x00080031');
    this.modality = dataSet.string('x00080060');
    this.bodyPartExamined = dataSet.string('x00180015');
    this.frameOfReferenceUid = dataSet.string('x00200052');
    
    // Image Information
    this.sopInstanceUid = dataSet.string('x00080018');
    this.imageType = dataSet.string('x00080008').split('\\');
    this.instanceNumber = parseInt(dataSet.string('x00200013'), 10);
    this.imageOrientationPatient = dataSet.string('x00200037').split('\\');
    this.imagePositionPatient = dataSet.string('x00200032').split('\\');
    this.pixelSpacing = dataSet.string('x00280030').split('\\').map(parseFloat);
    this.bitsAllocated = parseInt(dataSet.string('x00280100'), 10);
    this.bitsStored = parseInt(dataSet.string('x00280101'), 10);
    this.highBit = parseInt(dataSet.string('x00280102'), 10);
    this.samplesPerPixel = parseInt(dataSet.string('x00280002'), 10);
    this.planarConfiguration = parseInt(dataSet.string('x00280006'), 10);
    this.photometricInterpretation = dataSet.string('x00280004');
    this.rows = parseInt(dataSet.string('x00280010'), 10);
    this.columns = parseInt(dataSet.string('x00280011'), 10);
    
    // Pixel Data
    const pixelDataElement = dataSet.elements.x7fe00010;
    this.pixelData = pixelDataElement && pixelDataElement.length > 0 ? pixelDataElement.value : null;
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
    return this.sopInstanceUid;
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

  toJsonObject() {
    return {
      patient: {
        name: this.patientName,
        id: this.patientId,
        birthDate: this.patientBirthDate,
        sex: this.patientSex,
      },
      study: {
        instanceUid: this.studyInstanceUid,
        description: this.studyDescription,
        date: this.studyDate,
        time: this.studyTime,
      },
      series: {
        instanceUid: this.seriesInstanceUid,
        description: this.seriesDescription,
        date: this.seriesDate,
        time: this.seriesTime,
        modality: this.modality,
        bodyPartExamined: this.bodyPartExamined,
        frameOfReferenceUid: this.frameOfReferenceUid,
      },
      image: {
        sopInstanceUid: this.sopInstanceUid,
        imageType: this.imageType,
        instanceNumber: this.instanceNumber,
        imageOrientationPatient: this.imageOrientationPatient,
        imagePositionPatient: this.imagePositionPatient,
        pixelSpacing: this.pixelSpacing,
        bitsAllocated: this.bitsAllocated,
        bitsStored: this.bitsStored,
        highBit: this.highBit,
        samplesPerPixel: this.samplesPerPixel,
        planarConfiguration: this.planarConfiguration,
        photometricInterpretation: this.photometricInterpretation,
        rows: this.rows,
        columns: this.columns,
      },
    };
  }
}

module.exports = DicomMetadata;

