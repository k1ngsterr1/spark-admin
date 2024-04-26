import * as crypto from "crypto";
const fs = require('fs');
import path from "path";

const privateKeyPath = path.join(__dirname, '../../infrastructure/config/keys/private.pem');

const generateWebsiteCodeAndSignature = async (url: string) => {
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const timestamp = new Date().getTime().toString();
  const baseString = `${url}-${timestamp}`;
  const hash = crypto.createHash("sha256").update(baseString).digest("hex");
  const code = `SPARK-STUDIO-${hash}`;
  const signer = crypto.createSign("sha256");
  signer.update(baseString);
  signer.end();
  const codeSignature = signer.sign(privateKey, "base64");
  console.log("codesign=", codeSignature, "code=",code);
  return { code, codeSignature };
};

export default generateWebsiteCodeAndSignature;
