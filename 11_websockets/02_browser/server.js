require("dotenv").config();

const express = require("express");
const http = require("http");

const WebSocket = require("ws");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach((ws) => {
      ws.send(message);
    });
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
