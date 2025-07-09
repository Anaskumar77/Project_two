import React, { useState, useRef, useEffect } from "react";
import { Terminal as XTerminal } from "@xterm/xterm";
import authStore from "../../lib/store/authStore.js";

const Terminal = () => {
  //
  const socket = authStore((s) => s.socket);
  const isSocketConnected = authStore((s) => s.isSocketConnected);

  //

  const terminalRef = useRef();
  const cmdRendered = useRef(false);

  useEffect(() => {
    if (cmdRendered.current) return;

    const terminal = new XTerminal();
    terminal.open(terminalRef.current);
    cmdRendered.current = true;

    const attachTerminalListeners = () => {
      // 🔁 Always register onData — it's safe to do
      terminal.onData((data) => {
        console.log("typed:", data);
        if (socket && socket.connected) {
          socket.emit("terminal:write", data);
        }
      });

      if (socket) {
        socket.on("terminal:data", (data) => {
          terminal.write(data);
        });
      }
    };

    // 🧠 If socket is already connected, attach listeners
    if (socket?.connected) {
      console.log(socket);

      attachTerminalListeners();
    } else if (socket) {
      // 🔁 Wait for connection, then attach listeners
      socket.on("connect", attachTerminalListeners);
    }

    // return () => {
    //   socket?.off("connect", attachTerminalListeners);
    //   socket?.off("terminal:data");
    //   terminal.dispose?.();
    // };
  }, [socket]);

  return (
    <div
      id="terminal"
      ref={terminalRef}
      style={{ width: "100dvw", height: "50dvh" }}
    ></div>
  );
};

export default Terminal;
