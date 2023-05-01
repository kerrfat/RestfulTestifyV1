/**
 * Represents metadata extracted from a DICOM file.
 */
class DicomMetadata {
  /**
   * Creates a new instance of `DicomMetadata`.
   * @param {string} filePath - The path to the DICOM file to extract metadata from.
   */
  constructor(filePath) {
    // implementation details
  }

  /**
   * Gets the patient name.
   * @returns {string} The patient name.
   */
  getPatientName() {
    // implementation details
  }

  /**
   * Gets the patient ID.
   * @returns {string} The patient ID.
   */
  getPatientId() {
    // implementation details
  }

  /**
   * Gets the patient's birth date.
   * @returns {string} The patient's birth date in YYYYMMDD format.
   */
  getPatientBirthDate() {
    // implementation details
  }

  /**
   * Gets the patient's sex.
   * @returns {string} The patient's sex: "M", "F", or "O".
   */
  getPatientSex() {
    // implementation details
  }

  /**
   * Gets the study instance UID.
   * @returns {string} The study instance UID.
   */
  getStudyInstanceUid() {
    // implementation details
  }

  /**
   * Gets the study description.
   * @returns {string} The study description.
   */
  getStudyDescription() {
    // implementation details
  }

  /**
   * Gets the study date.
   * @returns {string} The study date in YYYYMMDD format.
   */
  getStudyDate() {
    // implementation details
  }

  /**
   * Gets the study time.
   * @returns {string} The study time in HHMMSS format.
   */
  getStudyTime() {
    // implementation details
  }

  /**
   * Gets the series instance UID.
   * @returns {string} The series instance UID.
   */
  getSeriesInstanceUid() {
    // implementation details
  }

  /**
   * Gets the series description.
   * @returns {string} The series description.
   */
  getSeriesDescription() {
    // implementation details
  }

  /**
   * Gets the series date.
   * @returns {string} The series date in YYYYMMDD format.
   */
  getSeriesDate() {
    // implementation details
  }

  /**
   * Gets the series time.
   * @returns {string} The series time in HHMMSS format.
   */
  getSeriesTime() {
    // implementation details
  }

  /**
   * Gets the modality.
   * @returns {string} The modality.
   */
  getModality() {
    // implementation details
  }

  /**
   * Gets the body part examined.
   * @returns {string} The body part examined.
   */
  getBodyPartExamined() {
    // implementation details
  }

  /**
   * Gets the frame of reference UID.
   * @returns {string} The frame of reference UID.
   */
  getFrameOfReferenceUid() {
    // implementation details
  }

  /**
   * Gets the SOP instance UID.
   * @returns {string} The SOP instance UID.
   */
  getSopInstanceUid() {
    // implementation details
  }

  /**
   * Gets the image type.
   * @returns {Array<string>} An array of strings representing the image type.
   */
  getImageType() {
    // implementation details
  }

  /**
   * Gets the instance number.
   * @returns {number} The instance number
getInstanceNumber() {
// implementation details
}

/**

Gets the image position patient.
@returns {Array<number>} An array of three numbers representing the x, y, and z coordinates
of the image position patient.
*/
getImagePositionPatient() {
// implementation details
}
/**

Gets the image orientation patient.
@returns {Array<number>} An array of six numbers representing the first row and second row
of the image orientation patient.
*/
getImageOrientationPatient() {
// implementation details
}
/**

Gets the pixel spacing.
@returns {Array<number>} An array of two numbers representing the row and column pixel spacing.
*/
getPixelSpacing() {
// implementation details
}
/**

Gets the rows.
@returns {number} The number of rows in the image.
*/
getRows() {
// implementation details
}
/**

Gets the columns.
@returns {number} The number of columns in the image.
*/
getColumns() {
// implementation details
}
/**

Gets the pixel representation.
@returns {number} The pixel representation (0 or 1).
*/
getPixelRepresentation() {
// implementation details
}
/**

Gets the bits allocated.
@returns {number} The number of bits allocated for each pixel.
*/
getBitsAllocated() {
// implementation details
}
/**

Gets the bits stored.
@returns {number} The number of bits stored for each pixel.
*/
getBitsStored() {
// implementation details
}
/**

Gets the high bit.
@returns {number} The highest bit for each pixel.
*/
getHighBit() {
// implementation details
}
/**

Gets the pixel data type.
@returns {string} The pixel data type ("Uint8Array", "Uint16Array", etc.).
*/
getPixelDataType() {
// implementation details
}
/**

Gets the pixel data.
@returns {TypedArray} The pixel data as a typed array.
*/
getPixelData() {
// implementation details
}
/**

Converts the DICOM metadata to a JSON object.
@returns {object} A JSON object representing the DICOM metadata.
*/
toJsonObject() {
// implementation details
}
}
module.exports = DicomMetadata;
