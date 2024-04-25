import * as crypto from "crypto";

const fs = require("fs");
const path = require("path");

const privateKeyPath = path.join(__dirname, "../config/keys/private.pem");
const publicKeyPath = path.join(__dirname, "../config/keys/public.pem");

const signData = (uniqueIdentifier) => {
  const privateKey = fs.readFileySync(privateKeyPath, "utf8");
  const signer = crypto.createSign("sha256");
  signer.update(uniqueIdentifier);
  signer.end();
  return signer.sign(privateKey, "base64");
};

const verifyData = (dataToVerify, signature) => {
  const publicKey = fs.readFileySync(publicKeyPath, "utf8");
  const verifier = crypto.createVerify("sha256");
  verifier.update(dataToVerify);
  verifier.end();
  return verifier.verify(publicKey, signature, "base64");
};

module.exports = { signData, verifyData };

import * as crypto from "crypto";

const fs = require("fs");
const path = require("path");

const privateKeyPath = path.join(__dirname, "../config/keys/private.pem");
const publicKeyPath = path.join(__dirname, "../config/keys/public.pem");

const signData = (uniqueIdentifier) => {
  const privateKey = fs.readFileySync(privateKeyPath, "utf8");
  const signer = crypto.createSign("sha256");
  signer.update(uniqueIdentifier);
  signer.end();
  return signer.sign(privateKey, "base64");
};

const verifyData = (dataToVerify, signature) => {
  const publicKey = fs.readFileySync(publicKeyPath, "utf8");
  const verifier = crypto.createVerify("sha256");
  verifier.update(dataToVerify);
  verifier.end();
  return verifier.verify(publicKey, signature, "base64");
};

module.exports = { signData, verifyData };
