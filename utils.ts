import { encodeBase64 } from 'jsr:@std/encoding/base64'

const magicString = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

export async function generateWebsocketKey(headers: Headers): Promise<string> {

  const clientKey = headers.get("Sec-WebSocket-Key") ?? undefined

  if (!clientKey) {
    throw new Error("Invalid client key");
  }

  const encodedKey = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(clientKey + magicString));

  return encodeBase64(encodedKey);
}


export const toHex = (num: number): number => {
  return Number.parseInt(num.toString(16));
}

export const toBinary = (num: number): number => {
  return Number.parseInt(num.toString(2));
}