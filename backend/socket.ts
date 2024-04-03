import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: +(process.env.SOCKET_PORT ?? 8081) });

wss.on("connection", function connection(ws) {
  console.log("connecting");

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("welcome client!");
});
