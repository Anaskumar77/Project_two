import { create } from "zustand";
import { io } from "socket.io-client";

const authStore = create((set, get) => ({
  authUser: null,
  socket: null,
  isSocketConnected: false,

  setAuthUser: (data) => {
    set({ authStore: data });
  },
  connectSocket: async () => {
    const { authUser, socket } = get();

    console.log("connect socket");
    // if (authUser && !socket) {
    const socketConnection = io("http://localhost:3000", {
      transports: ["websocket"],
      withCredentials: true,
    });
    socketConnection.connect();

    await new Promise((resolve, reject) => {
      socketConnection.on("connect", () => {
        console.log("CONNECTED:", socketConnection.id);
        set({ socket: socketConnection, isSocketConnected: true });
        resolve(true);
      });

      socketConnection.on("connect_error", (err) => {
        console.error("Connect error:", err.message);
        reject(err);
      });
    });

    //
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) socket.disconnect();
  },
}));

export default authStore;
