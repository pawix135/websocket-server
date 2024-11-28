import { readFrame } from "./frame.ts";
import { parseRequest } from "./request.ts";
import { generateResponse } from "./response.ts";
import { generateWebsocketKey } from "./utils.ts";

const server = Deno.listen({ port: 4444, transport: 'tcp' });

for await (const connection of server) {
  handleConnection(connection);
}

async function handleConnection(conn: Deno.Conn) {

  const buffer = new Uint8Array(1024);
  const readBytes = await conn.read(buffer);

  const request = parseRequest(buffer, readBytes);

  if (!request) {
    console.log("Invalid request");
    conn.close();
    return;
  }

  const socKey = await generateWebsocketKey(request.headers);

  const response = generateResponse(socKey);

  await conn.write(new TextEncoder().encode(response))

  // Connection is now upgraded to websocket
  while (true) {
    try {

      const soc_buffer = new Uint8Array(1024);
      const soc_readBytes = await conn.read(soc_buffer);

      // Exit from loop if no data is read
      if (soc_readBytes === null) {
        conn.close();
        break;
      }

      const frame = readFrame(soc_buffer);
    } catch (error) {
      console.log('Something went wrong while reading frame');
      conn.close();
      break;
    }

    // if (frame === 0) conn.close()
  }
}