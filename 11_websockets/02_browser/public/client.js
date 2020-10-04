/* eslint-env browser */
/* global faker */

const name = faker.internet.userName();

const wsProto = location.protocol === "https:" ? "wss:" : "ws:";

const client = new WebSocket(`${wsProto}//${location.host}`);

const messagesContainer = document.getElementById("chat");

const addMesage = ({ name, message }) => {
  const messageEl = document.createElement("p");
  messageEl.classList.add("message");
  messageEl.innerHTML = `
    <span class="name">${name}</span>
    <span class="message">${message}</span>
  `;
  messagesContainer.appendChild(messageEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

client.addEventListener("message", (data) => {
  try {
    data = JSON.parse(data.data);
  } catch (err) {
    return;
  }
  if (data.type === "chat_message") {
    addMesage(data);
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
