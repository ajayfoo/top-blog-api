import { generateKeyPair } from "crypto";
import fs from "node:fs/promises";
import path from "path";
import util from "util";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const parentFolder = dirname(fileURLToPath(import.meta.url));
const rootFolder = dirname(parentFolder);

const bootstrapProject = async () => {
  console.log("Creating public key pairs...");
  const generateKeyPairPromisified = util.promisify(generateKeyPair);
  try {
    const { privateKey, publicKey } = await generateKeyPairPromisified("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    await fs.mkdir(path.join(rootFolder, "secrets"));
    fs.writeFile(
      path.join(rootFolder, "secrets", "private-key.pem"),
      privateKey
    );
    fs.writeFile(path.join(rootFolder, "secrets", "public-key.pem"), publicKey);
    console.log("Created public key pairs in secrets directory");
  } catch (err) {
    console.error("Failed to create public key pairs");
    console.error(err);
  }
};

bootstrapProject();
