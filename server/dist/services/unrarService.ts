const Unrar = require("unrar");
const fs = require("fs");
const path = require("path");

async function extractRarFile(filePath) {
  const archive = new Unrar(filePath);
  const list = await archive.list();

  console.log("List of the files:", list);

  const extractPath = path.join(__dirname, "extracted");
  if (!fs.existsSync(extractPath)) {
    fs.mkdirSync(extractPath, { recursive: true });
  }

  try {
    await archive.extract(extractPath);
    console.log("Extraction complete");
  } catch (error) {
    console.error("Failed to extract RAR file:", error);
  }
}
