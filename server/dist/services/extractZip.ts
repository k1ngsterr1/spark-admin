const AdmZip = require("adm-zip");

/**
 * Extracts a ZIP file to a specified location.
 * @param {string} filePath - The full path to the ZIP file.
 * @param {string} extractTo - The directory where files should be extracted.
 */

function extractZip(filePath, extractTo) {
  try {
    const zip = new AdmZip(filePath);
    zip.extractAllTo(extractTo, true);
    console.log(`Files extracted to ${extractTo}`);
  } catch (error) {
    throw new Error(`Failed to extract ZIP file: ${error.message}`);
  }
}

module.exports = {
  extractZip,
};
