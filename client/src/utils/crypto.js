async function encryptFile(file) {
  let data = file,
    reader = new FileReader();

  const iv = crypto.getRandomValues(new Uint8Array(16));
  const algorithm = { name: "AES-CBC", iv };

  const key = await window.crypto.subtle.generateKey(algorithm, false, [
    "encrypt",
    "decrypt",
  ]);

  crypto.subtle.encrypt(algorithm, key, data);

  reader.onload = function (e) {};

  reader.readAsArrayBuffer(file);
}

async function decryptFile() {}
