import { useEffect, useRef, useState } from "react";
import SoundWave from "../SoundWave/SoundWave";

export const AgoraVideoPlayer = ({
  user,
  videoOff,
  activeUser,
  userId,
}: any) => {
  const ref = useRef<any>(null);
  const [showBlackScreen, setShowBlackScreen] = useState(false);

  useEffect(() => {
    if (user) {
      if (videoOff) {
        setShowBlackScreen(true);
        user.videoTrack?.stop(); // Stop the video track if it's off
      } else {
        setShowBlackScreen(false);
        user.videoTrack?.play(ref?.current);
      }
    }
  }, [user, videoOff]);

  return (
    <div
      className={`${
        userId === activeUser ? "relative flex justify-center items-center" : ""
      }`}
    >
      {showBlackScreen && (
        <div
          className="absolute inset-0 bg-black"
          style={{ zIndex: -1 }} // Push the black div behind the video
        />
      )}

      <video
        className={`video_player rounded-[33px] mx-auto cursor-pointer shadow-sm hover:shadow-lg ${
          showBlackScreen ? "hidden" : "" // Hide the video element if black div is shown
        }`}
        ref={ref}
        autoPlay={true}
        playsInline
        muted
      />

      {userId === activeUser && (
        <span className="absolute bottom-0 transform -translate-y-1/2">
          <SoundWave />
        </span>
      )}
    </div>
  );
};
