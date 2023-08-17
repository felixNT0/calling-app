import { useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    const activeUserId = uuidv4();
    localStorage.setItem("currentActiveUserId", activeUserId);
  }, []);
  return <Outlet />;
}

export default App;
