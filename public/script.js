const socket = io();
const messages = document.getElementById("messages");
const msgInput = document.getElementById("msg");
const usernameInput = document.getElementById("username");
const sendBtn = document.getElementById("send");

let username = "";

sendBtn.onclick = () => {
  if (!username) {
    username = usernameInput.value.trim();
    if (username) socket.emit("join", username);
    usernameInput.disabled = true;
  } else {
    const msg = msgInput.value.trim();
    if (msg) {
      socket.emit("chatMessage", msg);
      msgInput.value = "";
    }
  }
};

socket.on("message", (msg) => {
  const div = document.createElement("div");
  div.textContent = msg;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});
