import React, { useState, useRef, useEffect } from "react";
import { Terminal as XTerminal } from "@xterm/xterm";
import authStore from "../../lib/store/authStore.js";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { TerminalWrite } from "../../lib/socketHandler.js";

const Terminal = () => {
  //
  const socket = authStore((s) => s.socket);
  console.log(socket);
  // const { socket } = authStore();
  const isSocketConnected = authStore((s) => s.isSocketConnected);
  console.log(isSocketConnected);

  //

  const terminalRef = useRef();
  const cmdRendered = useRef(false);
  const terminal = new XTerminal({
    cursorBlink: true,
    theme: {
      background: "#1e1e1e",
      foreground: "#8800ff",
    },
  });
  const fitAddon = new FitAddon();

  useEffect(() => {
    if (cmdRendered.current) return;

    terminal.open(terminalRef.current);
    terminal.focus();
    terminal.loadAddon(fitAddon);
    fitAddon.fit();
    cmdRendered.current = true;

    terminal.onData((data) => {
      TerminalWrite(data);
    });

    //
  }, []);

  //

  socket?.on("terminal:data", (data) => {
    console.log("data kiti : ", data);
  });

  //

  return (
    <div style={{ width: "100dvw", height: "50dvh" }}>
      <div
        id="terminal"
        ref={terminalRef}
        style={{ width: "100dvw", height: "50dvh" }}
      ></div>
      <button onClick={() => console.log(socket)}></button>
    </div>
  );
};

export default Terminal;
