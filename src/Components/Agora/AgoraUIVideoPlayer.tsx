import AgoraUIKit from "agora-react-uikit";
import { message } from "antd";

function AgoraUIVideoPlayer({
  token,
  channelName,
  setJoined,
  setLoading,
  agoraAppId,
}: // agoraAppId,
any) {
  const currentActiveUserId = localStorage.getItem("currentActiveUserId") || "";

  const rtcProps = {
    appId: String(process.env.REACT_APP_AGORA_APP_ID) || agoraAppId,
    channel: channelName,
    token: token,
    uid: Number(currentActiveUserId),
  };

  const callbacks = {
    EndCall: () => setJoined(false),
    ActiveSpeaker: (uid: any) => {
      // console.log(uid);
    },
    ["connection-state-change"](curState: any, _: any, reason: any): void {
      // console.log(curState, reason);
      if (curState === "DISCONNECTED") {
        setJoined(false);
        setLoading(false);
        message.error("Sorry An Error Occur when connection to the call");
      }
      if (curState === "CONNECTED") {
        setLoading(false);
        message.success("Connected");
      }
      // Implementation for leave-channel event
    },
  };

  const styleProps = {
    theme: "#1F2937",
    UIKitContainer: { background: "#1F2937" },
    // BtnTemplateStyles: { background: "#1F2937" },
    // remoteBtnContainer: { background: "#1F2937" },
    // customIcon: { callEnd: `${(<MdCallEnd />)}` },
  };
  return (
    <>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <AgoraUIKit
          rtcProps={rtcProps}
          callbacks={callbacks}
          styleProps={styleProps}
        />
      </div>
    </>
  );
}

export default AgoraUIVideoPlayer;
