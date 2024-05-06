import * as crypto from "crypto";
const fs = require('fs');
import path from "path";

const privateKeyPath = path.join(__dirname, '../../infrastructure/config/keys/private.pem');


// изменил создание кода и сигнатуры
const generateWebsiteCodeAndSignature = async (url: string) => {
  const timestamp = new Date().getTime().toString();
  const baseString = `${url}-${timestamp}`;
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const signer = crypto.createSign('sha256');
  signer.update(baseString);
  signer.end();
  const codeSignature = signer.sign(privateKey, 'base64');
  console.log(codeSignature);
  const hash = crypto.createHash("sha256").update(codeSignature).digest("hex");
  const code = `SPARK-STUDIO-${hash}`;
  return { code, codeSignature };
};

// валидация кода по сигнатуре
export const validateCodeWithSignature = (code, codeSignature) => {
  try {
    const expected = crypto.createHash("sha256").update(codeSignature).digest("hex");
    const given = code.substring("SPARK-STUDIO-".length);
    console.log('Expected Hash:', expected, 'Given Hash:', given);

    return expected === given;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
};

export default generateWebsiteCodeAndSignature;
