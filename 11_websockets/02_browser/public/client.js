/* eslint-env browser */
/* global faker */

const name = faker.internet.userName();

const wsProto = location.protocol === "https:" ? "wss:" : "ws:";

const client = new WebSocket(`${wsProto}//${location.host}`);

const messagesContainer = document.getElementById("chat");

const addMessage = ({ name, message }) => {
  const cEl = document.createElement("p");

  const nEl = document.createElement("span");
  nEl.className = "name";
  nEl.innerText = name;
  cEl.appendChild(nEl);

  const mEl = document.createElement("span");
  mEl.className = "message";
  mEl.innerText = message;
  cEl.appendChild(mEl);

  messagesContainer.appendChild(cEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

client.addEventListener("message", (message) => {
  let data;
  try {
    data = JSON.parse(message.data);
  } catch (err) {
    return;
  }
  if (data.type === "chat_message") {
    addMessage(data);
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

client.addEventListener("open", postMessage);
