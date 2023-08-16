import { useEffect } from "react";
import "./App.css";
import AgoraCall from "./Components/AgoraCall";
import NavBar from "./Components/NavBar";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  useEffect(() => {
    const activeUserId = uuidv4();
    localStorage.setItem("currentActiveUserId", activeUserId);
  }, []);

  return (
    <div className="text-center mb-7">
      <NavBar />
      <div className=" mt-7 mx-[15px]">
        <AgoraCall />
      </div>
    </div>
  );
}
