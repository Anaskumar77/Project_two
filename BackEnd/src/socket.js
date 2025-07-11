import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, " connected ");

  socket.on("terminal:write", (data) => {
    console.log(data);
    socket.emit("terminal:data", data);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
});

export { app, io, server };
