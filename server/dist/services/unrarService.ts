import { createExtractorFromFile } from "node-unrar-js";
import fs from "fs";
import path from "path";

export async function extractRarFile(filepath) {
  const targetPath = path.join(__dirname, "../templates/temporary/extracted");

  // Ensure the target directory exists
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  try {
    // Create an extractor object from the file
    const extractor = await createExtractorFromFile({
      filepath: filepath,
      targetPath: targetPath,
    });

    // Use the extractor to extract all files
    const result = await extractor.extract();
    console.log("Extraction complete.");

    // If the result provides details of the extracted files, log them
    if (result.files) {
      for (let file of result.files) {
        // Additional processing for each file can be done here
      }
      console.log("Extraction complete.");
    }
  } catch (error) {
    console.error("Failed to extract RAR file:", error);
  }
}
