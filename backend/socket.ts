import { WebSocketServer } from "ws";
import { LoremIpsum } from "lorem-ipsum";
import cron from "node-cron";
import { randomIntFromInterval } from "./utils/functions";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const wss = new WebSocketServer({ port: +(process.env.SOCKET_PORT ?? 8081) });

let connections: any[] = [];

cron.schedule("*/5  * * * * * ", () => {
  const message = lorem.generateSentences(randomIntFromInterval(1, 5));

  connections.forEach((ws) => {
    ws.send(
      JSON.stringify({
        message,
        type: "received",
      })
    );
  });
});

wss.on("connection", function connection(ws: any, r: any, c: any) {
  console.log("connecting");
  console.log(r.headers["cookie"]);

  connections.push(ws);

  ws.on("error", console.error);

  ws.on("message", function message(data: any) {
    console.log("received: %s", data);
  });

  ws.send(
    JSON.stringify({
      message: "Hello from the backend!",
      type: "received",
    })
  );
});
