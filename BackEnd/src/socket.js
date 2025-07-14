import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import os from "os";
import pty from "node-pty";

var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

var ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: `${process.env.INIT_CWD}/src`,
  env: process.env,
});

// ptyProcess.onData((data) => {
//   process.stdout.write(data);
// });

// ptyProcess.write("ls\r");
// ptyProcess.resize(100, 40);
// ptyProcess.write("ls\r");

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
  //
  console.log(socket.id, " connected ");

  ptyProcess.onData((data) => {
    //
    socket.emit("terminal:data", data);
  });

  socket.on("terminal:write", (data) => {
    ptyProcess.write(data);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
});

export { app, io, server };
