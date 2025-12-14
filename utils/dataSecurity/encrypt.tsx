import crypto from "crypto";

async function getCryptoKey(): Promise<CryptoKey> {
    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined in environment variables");
    }

    // Convert hex string to Uint8Array
    const secretKeyBuffer = new Uint8Array(
        Buffer.from(process.env.SECRET_KEY, "hex")
    );

    // Import key for AES-GCM
    return crypto.webcrypto.subtle.importKey(
        "raw",
        secretKeyBuffer,
        { name: "AES-GCM" },
        false, 
        ["encrypt", "decrypt"]
    );
}

export async function encryptData(data: unknown): Promise<string> {
    const cryptoKey = await getCryptoKey();

    const iv = crypto.webcrypto.getRandomValues(new Uint8Array(12));

    const encodedData = new TextEncoder().encode(JSON.stringify(data));

    const encryptedData = await crypto.webcrypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        encodedData
    );

    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.length);

    return Buffer.from(combined).toString("base64");
}
