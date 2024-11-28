import { toBinary, toHex } from "./utils.ts";

export const enum FIN {
  CONTINUE = 0x00,
  FINAL = 0x01,
}

export const enum RSV {
  OFF = 0x00,
  ON = 0x01,
}

export const enum OPCODE {
  CONTINUATION = 0x00,
  TEXT_FRAME = 0x01,
  BINARY_FRAME = 0x02,
  CONNECTION_CLOSE = 0x08,
  PING = 0x09,
  PONG = 0x0A,
}

export const readFrame = (rawData: Uint8Array) => {
  const view = new DataView(rawData.buffer);

  const firstByte = view.getUint8(0);
  const fin = (firstByte & 0x80) !== 0; // FIN bit is the most significant bit
  const rsv1 = (firstByte & 0x40) !== 0; // RSV1 bit
  const rsv2 = (firstByte & 0x20) !== 0; // RSV2 bit
  const rsv3 = (firstByte & 0x10) !== 0; // RSV3 bit
  const opcode = firstByte & 0x0F; // Opcode is the least significant 4 bits

  const secondByte = view.getUint8(1);

  const mask = (secondByte & 0x80) !== 0;
  const payloadLength = secondByte & 0x7F;

  console.log(mask, payloadLength);

  return 0
}

