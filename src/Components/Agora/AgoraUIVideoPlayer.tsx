import AgoraUIKit from "agora-react-uikit";

function AgoraUIVideoPlayer({
  token,
  channelName,
  toggleStart,
  agoraAppId,
}: any) {
  const currentActiveUserId = localStorage.getItem("currentActiveUserId") || "";

  const rtcProps = {
    appId: agoraAppId,
    channel: channelName,
    token: token,
    uid: Number(currentActiveUserId),
  };

  const callbacks = {
    EndCall: () => toggleStart(),
    ActiveSpeaker: (uid: any) => {
      console.log(uid);
    },
    ["user-joined"](user: any): void {
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
