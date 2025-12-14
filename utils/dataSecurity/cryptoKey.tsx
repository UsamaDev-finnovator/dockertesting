
export async function getCryptoKey(): Promise<CryptoKey> {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined in environment variables");
    }

    // Convert hex string to Uint8Array
    const secretKeyBuffer = new Uint8Array(
        Buffer.from(secretKey, "hex")
    );

    // Ensure window.crypto.subtle is available
    if (!window?.crypto?.subtle) {
        throw new Error("Web Crypto API is not available in this environment");
    }

    // Import key for AES-GCM
    return window.crypto.subtle.importKey(
        "raw",
        secretKeyBuffer,
        { name: "AES-GCM" },
        false, // non-extractable
        ["encrypt", "decrypt"]
    );
}

export default getCryptoKey;
