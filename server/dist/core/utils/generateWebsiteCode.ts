import * as crypto from "crypto";
import fs from "fs";
import path from "path";

const privateKeyPath = path.join(__dirname, "../config/keys/private.pem");

const generateWebsiteCodeAndSignature = (domain: string) => {
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const timestamp = new Date().getTime().toString();
  const baseString = `${domain}-${timestamp}`;
  const hash = crypto.createHash("sha256").update(baseString).digest("hex");
  const code = `SPARK-STUDIO-${hash}`;

  const signer = crypto.createSign("sha256");
  signer.update(baseString);
  signer.end();
  const codeSignature = signer.sign(privateKey, "base64");

  return { code, codeSignature };
};

export default generateWebsiteCodeAndSignature;
