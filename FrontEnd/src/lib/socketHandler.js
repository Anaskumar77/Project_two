import { io } from "socket.io-client";
import authStore from "./store/authStore.js";
//

export const createSocket = () => {
  //

  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
    withCredentials: true,
  });
  socket.connect();

  //

  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      console.log("CONNECTED:", socket.id);
      resolve(socket);
    });

    socket.on("connect_error", (err) => {
      console.error("Connect error:", err.message);
      reject(false);
    });
  });
};

export const TerminalWrite = (data) => {
  const { socket } = authStore.getState();
  if (!socket) return;
  socket.emit("terminal:write", data);
};

// export const TerminalWrite = () => {
//   const { socket } = authStore.getState();
//   if (!socket) return;
//   socket.emit("terminal:write");
// };
