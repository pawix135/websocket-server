import { parseHeaders } from "./headers.ts";

export function parseRequest(rawRequest: Uint8Array, readBytes: number | null) {

  if (!readBytes) {
    console.log("No data received");
    return undefined;
  }

  const rawTextData = new TextDecoder().decode(rawRequest.subarray(0, readBytes));

  const lines = rawTextData.split("\r\n").filter((line) => line !== "");

  const requestLine = lines.shift();

  if (!requestLine) {
    return undefined
  }

  const initializeHeaders = parseHeaders(lines);

  const host = initializeHeaders.get("host");

  if (!host) {
    return undefined
  }

  const method = requestLine.split(" ")[0]

  if (method !== "GET") {
    return undefined
  }

  const requestPath = requestLine.split(" ")[1]

  if (!requestPath) {
    return undefined
  }

  const path = new URL(requestPath, `http://${host}`)

  const request = new Request(path, {
    headers: initializeHeaders,
    method: method
  })

  return request

}