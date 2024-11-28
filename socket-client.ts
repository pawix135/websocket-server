import { parseArgs } from 'jsr:@std/cli/parse-args'

let ws = new WebSocket('ws://localhost:4444');

const args = parseArgs(Deno.args)

ws.onopen = () => {
  console.log('Connected to server');
};

ws.onmessage = (message) => {
  console.log('Received message:', message.data);
};

ws.onclose = () => {
  console.log('Disconnected from server');
};

ws.onerror = (error) => {
  console.log('Socket error happened');

};

setInterval(() => {
  if (ws.readyState === ws.OPEN) {
    ws.send(args._.join(" ") as string ?? "No msg");
  } else if (ws.readyState === ws.CLOSED) {
    ws = createWebsocket()
  }
}, 3000)

function createWebsocket() {
  const _ws = new WebSocket('ws://localhost:4444');

  _ws.onopen = () => {
    console.log('Connected to server');
  };

  _ws.onmessage = (message) => {
    console.log('Received message:', message.data);
  };

  _ws.onclose = () => {
    console.log('Disconnected from server');
  };

  _ws.onerror = (error) => {
    console.log('Socket error happened');
  };

  return _ws;
}