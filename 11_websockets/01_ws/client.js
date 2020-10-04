require("dotenv").config();

const faker = require("faker");
const chalk = require("chalk");

const WebSocket = require("ws");

const name = faker.internet.userName();

const client = new WebSocket(`ws://localhost:${process.env.PORT}`);

client.on("message", (data) => {
  try {
    data = JSON.parse(data);
  } catch (err) {
    return;
  }
  if (data.type === "chat_message") {
    console.log(`${chalk.bold.green(data.name)}: ${chalk.blue(data.message)}`);
  }
});

const postMessage = () => {
  const message = faker.lorem.sentence();
  client.send(
    JSON.stringify({
      type: "chat_message",
      name,
      message,
    })
  );

  setTimeout(postMessage, 2000 + (Math.random() - 0.5) * 300);
};

client.on("open", postMessage);
