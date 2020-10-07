/* eslint-env browser */

let client = null;

const loginContainer = document.getElementById("login");
const chatContainer = document.getElementById("chat");
const newMessageContainer = document.getElementById("new-message-container");
const newMessage = document.getElementById("new-message");

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

  chatContainer.appendChild(cEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

const postMessage = (message) => {
  client.send(
    JSON.stringify({
      type: "chat_message",
      message,
    })
  );
};

newMessage.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const value = (newMessage.value || "").trim();
    if (value) {
      postMessage(value);
      newMessage.value = "";
    }
  }
});

loginContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = loginContainer.querySelector(".username").value;
  const password = loginContainer.querySelector(".password").value;

  fetch("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then((message) => {
          throw new Error(message);
        });
      }
    })
    .then(({ token }) => {
      loginContainer.style.display = "none";

      const wsProto = location.protocol === "https:" ? "wss:" : "ws:";
      client = new WebSocket(`${wsProto}//${location.host}?token=${token}`);

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

      client.addEventListener("open", () => {
        chatContainer.style.display = "block";
        newMessageContainer.style.display = "block";
      });
    })
    .catch((err) => {
      alert(err.message);
    });
});
