type EncryptedData = {
  d: number[]
  i: number[]
  s: number[]
}

// Function to generate a random salt
function generateSalt() {
  return window.crypto.getRandomValues(new Uint8Array(16))
}

// Function to derive a key from a password
async function deriveKey(password: string, salt: Uint8Array) {
  const encoder = new TextEncoder()
  const passwordBuffer = encoder.encode(password)
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  )
  return window.crypto.subtle.deriveKey(
    {
      hash: "SHA-256",
      iterations: 600000,
      name: "PBKDF2",
      salt: salt,
    },
    keyMaterial,
    { length: 256, name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"],
  )
}

// Function to encrypt data
export async function encryptData(data: string, password: string) {
  const salt = generateSalt()
  const key = await deriveKey(password, salt)
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const encryptedContent = await window.crypto.subtle.encrypt(
    { iv: iv, name: "AES-GCM" },
    key,
    dataBuffer,
  )
  return {
    d: Array.from(new Uint8Array(encryptedContent)),
    i: Array.from(iv),
    s: Array.from(salt),
  }
}

// Function to decrypt data
export async function decryptData(encryptedData: EncryptedData, password: string) {
  const salt = new Uint8Array(encryptedData.s)
  const iv = new Uint8Array(encryptedData.i)
  const key = await deriveKey(password, salt)
  const decryptedContent = await window.crypto.subtle.decrypt(
    { iv: iv, name: "AES-GCM" },
    key,
    new Uint8Array(encryptedData.d),
  ).then(result => {
    const decoder = new TextDecoder()
    return decoder.decode(result)
  }).catch(err => {
    console.error(err)
    return null
  })
  return decryptedContent
}

// Example usage
// async function exampleUsage() {
//   const password = 'user-provided-password';
//   const sensitiveData = 'This is sensitive information';
//
//   // Encrypt and store
//   const encrypted = await encryptData(sensitiveData, password);
//   localStorage.setItem('encryptedData', JSON.stringify(encrypted));
//
//   // Retrieve and decrypt
//   const retrievedEncrypted = JSON.parse(localStorage.getItem('encryptedData'));
//   const decrypted = await decryptData(retrievedEncrypted, password);
//   console.log(decrypted); // Should output: "This is sensitive information"
// }
//
// exampleUsage().catch(console.error);