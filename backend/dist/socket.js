"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const lorem_ipsum_1 = require("lorem-ipsum");
const node_cron_1 = __importDefault(require("node-cron"));
const functions_1 = require("./utils/functions");
const lorem = new lorem_ipsum_1.LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});
const wss = new ws_1.WebSocketServer({ port: +((_a = process.env.SOCKET_PORT) !== null && _a !== void 0 ? _a : 8081) });
let connections = [];
node_cron_1.default.schedule("*/5  * * * * * ", () => {
    const message = lorem.generateSentences((0, functions_1.randomIntFromInterval)(1, 5));
    connections.forEach((ws) => {
        ws.send(JSON.stringify({
            message,
            type: "received",
        }));
    });
});
wss.on("connection", function connection(ws, r, c) {
    console.log("connecting");
    console.log(r.headers["cookie"]);
    connections.push(ws);
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        console.log("received: %s", data);
    });
    ws.send(JSON.stringify({
        message: "Hello from the backend!",
        type: "received",
    }));
});
