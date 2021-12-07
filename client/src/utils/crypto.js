import CryptoJS from "crypto-js";
import { encode, decode } from "base64-arraybuffer";

async function encryptFile(file, password) {
  const buffer = await file.arrayBuffer();
  console.log(buffer);
  console.log(String(buffer));
  const base64 = encode(buffer);
  console.log(base64);
  const encrypted = String(CryptoJS.AES.encrypt(base64, password));
  console.log(encrypted);
  return encrypted;
}

async function decryptFile(file, password) {
  const decrypted = CryptoJS.AES.decrypt(file, password).toString(
    CryptoJS.enc.Utf8
  );
  const base64 = decode(String(decrypted));
  const pic = new File([base64], "image");
  return pic;
}

export { encryptFile, decryptFile };
