import React, { useState, useRef, useEffect } from "react";
import { Terminal as XTerminal } from "@xterm/xterm";
import authStore from "../../lib/store/authStore.js";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { TerminalWrite } from "../../lib/socketHandler.js";

const Terminal = () => {
  //
  const socket = authStore((s) => s.socket);
  // const isSocketConnected = authStore((s) => s.isSocketConnected);

  //

  const terminalRef = useRef();
  const xtermRef = useRef();
  const cmdRendered = useRef(false);

  useEffect(() => {
    //

    if (cmdRendered.current) return;

    const terminal = new XTerminal({
      cursorBlink: true,
      theme: {
        background: "#1e1e1e",
        foreground: "#8800ff",
      },
    });
    const fitAddon = new FitAddon();

    terminal.open(terminalRef.current);
    terminal.focus();
    terminal.loadAddon(fitAddon);
    fitAddon.fit();

    xtermRef.current = terminal;
    cmdRendered.current = true;

    terminal.onData((data) => {
      TerminalWrite(data);
    });

    //
  }, []);

  //

  useEffect(() => {
    if (!socket || !xtermRef?.current) return;

    const dataIncoming = (data) => {
      console.log(data);
      xtermRef.current.write(data);
    };

    socket.on("terminal:data", dataIncoming);

    return () => {
      socket.off("terminal:data", dataIncoming);
    };
  }, [socket]);

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
