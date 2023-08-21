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

  const customButton = {
    borderRadius: 25,
    // borderWidth:
    borderColor: "#1F2937",
  };

  const originalHeightVh = 50; // Replace with your actual value
  const adjustedHeightVh = originalHeightVh - 10;

  const backgroundColor = {
    backgroundColor: "#1F2937",
  };

  const styleProps = {
    theme: "#FFFFFF",
    UIKitContainer: { background: "#1F2937" },
    // BtnTemplateStyles: { background: "#1F2937" },
    // remoteBtnContainer: { background: "#1F2937" },
    // customIcon: { callEnd: `${(<MdCallEnd />)}` },
    minViewStyles: {
      // width: 200,
      // height: 300,
    },

    maxWidthStyles: {
      // height: `${adjustedHeightVh}vh`,
    },
    localControlStyles: {
      bottom: 0,
      heigh: 100,
      backgroundColor: "#1F2937",
    },
    btnStyles: customButton,
    remoteBtnStyles: {
      muteRemoteAudio: customButton,
      muteRemoteVideo: customButton,
      remoteSwap: customButton,
    },
    localBtnStyles: {
      muteLocalAudio: backgroundColor,
      screenshare: backgroundColor,
      muteLocalVideo: backgroundColor,
      switchCamera: backgroundColor,
      endCall: backgroundColor,
    },
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
