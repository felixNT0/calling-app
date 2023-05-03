import "./App.css";
import AgoraCall from "./Components/AgoraCall";
import NavBar from "./Components/NavBar";

export default function App() {
  return (
    <div className="text-center mb-7">
      <NavBar />
      <div className=" mt-7 mx-[15px]">
        <AgoraCall />
      </div>
    </div>
  );
}
