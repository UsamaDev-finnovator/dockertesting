
// -------------------------
// Encrypt Token

import getCryptoKey from "./cryptoKey";

// -------------------------
export async function encryptToken(data: unknown): Promise<string> {
  const cryptoKey = await getCryptoKey();

  // Generate random 12-byte IV
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encode data as Uint8Array
  const encodedData = new TextEncoder().encode(JSON.stringify(data));

  // Encrypt data
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encodedData
  );

  // Convert IV and encrypted data to Base64
  const ivBase64 = Buffer.from(iv).toString("base64");
  const encryptedBase64 = Buffer.from(encryptedData).toString("base64");

  // Return as colon-separated string
  return `${ivBase64}:${encryptedBase64}`;
}

export default encryptToken;
