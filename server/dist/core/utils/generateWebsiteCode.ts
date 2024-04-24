import * as crypto from "crypto";

const generateWebsiteCode = (domain: string) => {
  const timestamp = new Date().getTime;

  const hash = crypto
    .createHash("sha256")
    .update(`${domain}-${timestamp}`)
    .digest("hex");

  return `SPARK-STUDIO-${hash}`;
};

module.exports = generateWebsiteCode;
