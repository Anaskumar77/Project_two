import { create } from "zustand";
import { createSocket } from "../socketHandler.js";

const authStore = create((set, get) => ({
  authUser: null,
  socket: null,
  isSocketConnected: false,

  setAuthUser: (data) => {
    set({ authStore: data });
  },
  connectSocket: async () => {
    const socket = await createSocket();
    console.log(socket);
    if (socket) {
      set({ socket: socket, isSocketConnected: true });
    }
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) socket.disconnect();
  },
}));

export default authStore;
