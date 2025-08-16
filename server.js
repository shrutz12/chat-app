const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend files from /public
app.use(express.static("public"));

// Socket.IO events
io.on("connection", (socket) => {
    console.log("A user connected");

    // User joins with a name
    socket.on("join", (username) => {
        socket.username = username;
        io.emit("message", `${username} joined the chat`);
    });

    // When a user sends a chat message
    socket.on("chatMessage", (msg) => {
        io.emit("message", `${socket.username}: ${msg}`);
    });

    // When a user leaves
    socket.on("disconnect", () => {
        if (socket.username) {
            io.emit("message", `${socket.username} left the chat`);
        }
    });
});

// Start server
server.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
});
