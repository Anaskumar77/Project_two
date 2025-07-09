import { create } from "zustand";
import { io } from "socket.io-client";

const authStore = create((set, get) => ({
  authUser: null,
  socket: null,

  connectSocket: () => {
    const { authUser, socket } = get();

    // if (authUser && !socket) {
    const socketConnection = io("http://localhost:3000/");
    socketConnection.connect();
    set({ socket: socketConnection });
    // }
  },
  disconnectSocket: () => {},
}));

export default authStore;
