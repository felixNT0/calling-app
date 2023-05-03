import { useEffect, useRef } from "react";
import SoundWave from "../SoundWave/SoundWave";

export const AgoraVideoPlayer = ({
  user,
  videoOff,
  activeUser,
  userId,
}: any) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    user?.videoTrack?.play(ref?.current);
    console.log("activeUser", ref.current);
  }, [user, videoOff]);

  return (
    <div
      className={`${
        userId === activeUser ? "relative flex justify-center items-center" : ""
      }`}
    >
      <video
        className="video_player rounded-[33px] mx-auto cursor-pointer shadow-sm hover:shadow-lg"
        ref={ref}
        autoPlay={true}
        playsInline
        muted
      />

      {userId === activeUser && (
        <span className="absolute bottom-0  transform translate-y-1/2 ">
          <SoundWave />
        </span>
      )}
    </div>
  );
};
