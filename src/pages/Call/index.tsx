import AgoraCall from "../../Components/AgoraCall";
import NavBar from "../../Components/NavBar";

function Call() {
  return (
    <div className="text-center">
      <NavBar />
      <div className="mt-7 mx-[15px]">
        <AgoraCall />
      </div>
    </div>
  );
}

export default Call;
