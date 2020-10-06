require("dotenv").config();

const { nanoid } = require("nanoid");
const express = require("express");
const http = require("http");

const WebSocket = require("ws");

const DB = {
  users: [
    { id: 1, username: "jane", password: "pwd007" },
    { id: 2, username: "joe", password: "pwd008" },
    { id: 3, username: "jack", password: "pwd009" },
  ],
  tokens: {},
};

const clients = new Map();

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch (err) {
      return;
    }

    if (data.type === "login") {
      const { username, password } = data;
      const user = DB.users.find((u) => u.username === username);

      if (!user) {
        return ws.send(
          JSON.stringify({
            type: "auth_error",
            error: "Unknown username",
          })
        );
      }
      if (user.password !== password) {
        return ws.send(
          JSON.stringify({
            type: "auth_error",
            error: "Wrong password",
          })
        );
      }

      const token = nanoid();
      DB.tokens[token] = user.id;

      clients.set(user.id, ws);

      return ws.send(
        JSON.stringify({
          type: "auth_success",
          token,
        })
      );
    }

    if (data.type === "chat_message") {
      const { token } = data;
      if (!token || !DB.tokens[token]) {
        return ws.send(
          JSON.stringify({
            type: "chat_message_error",
            error: "Missing or invalid token",
          })
        );
      }

      const userId = DB.tokens[token];
      const user = DB.users.find((u) => u.id === userId);

      const fullMessage = JSON.stringify({
        type: data.type,
        message: data.message,
        name: user.username,
      });

      for (ws of clients.values()) {
        ws.send(fullMessage);
      }
    }
  });

  ws.on("close", () => {
    for (const userId of clients.keys()) {
      if (clients.get(userId) === ws) {
        clients.delete(userId);
      }
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
