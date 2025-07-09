import { useEffect } from "react";
import authStore from "./lib/store/authStore.js";
import Terminal from "./components/Terminal/Terminal.jsx";

function App() {
  //
  const setAuthUser = authStore((s) => s.setAuthUser);
  const connectSocket = authStore((s) => s.connectSocket);
  const socket = authStore((s) => s.socket);

  useEffect(() => {
    // setAuthUser(true);
    connectSocket();
  }, []);

  return (
    <>
      <Terminal />
    </>
  );
}

export default App;
