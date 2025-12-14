import crypto from "crypto";


async function getCryptoKey(): Promise<CryptoKey> {
    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const secretKeyBuffer = new Uint8Array(
        Buffer.from(process.env.SECRET_KEY, "hex")
    );

    return crypto.webcrypto.subtle.importKey(
        "raw",
        secretKeyBuffer,
        { name: "AES-GCM" },
        false, // non-extractable
        ["encrypt", "decrypt"]
    );
}

// -------------------------
// Helper: Base64 to ArrayBuffer
// -------------------------
function base64ToArrayBuffer(base64: string): ArrayBuffer {
    // Ensure Base64 is properly padded
    base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
        base64 += "=";
    }

    // Decode Base64
    const binaryString = Buffer.from(base64, "base64").toString("binary");
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
}

// -------------------------
// Decrypt Data
// -------------------------
export async function decryptDetails(
    encryptedDataBase64: string
): Promise<any> {
    const cryptoKey = await getCryptoKey();

    const encryptedDataArrayBuffer = base64ToArrayBuffer(encryptedDataBase64);

    // Extract IV (first 12 bytes)
    const iv = encryptedDataArrayBuffer.slice(0, 12);

    // Extract actual encrypted data
    const encryptedData = encryptedDataArrayBuffer.slice(12);

    // Decrypt
    const decryptedData = await crypto.webcrypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(iv) },
        cryptoKey,
        encryptedData
    );

    // Decode UTF-8 text
    const decodedText = new TextDecoder().decode(decryptedData);

    // Parse JSON
    return JSON.parse(decodedText);
}
