export function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".zip") {
    return "zip";
  } else if (ext === ".rar") {
    return "rar";
  } else {
    return "unknown";
  }
}
