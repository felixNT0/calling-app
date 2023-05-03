import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useEffect, useRef, useState } from "react";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from "react-icons/bs";
import { MdCall, MdCallEnd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { AgoraVideoPlayer } from "./Agora/AgoraVideoPlayer";
import Loader from "./Loader";
import NotJoinCall from "./NotJoinCall";

function AgoraCall() {
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  // const [userName, setUserName] = useState("");
  const [isGetStarted, setIsGetStarted] = useState(false);

  const [activeUser, setActiveUser] = useState("");

  const options = {
    appId: String(process.env.REACT_APP_AGORA_APP_ID),
    channel: String(process.env.REACT_APP_AGORA_APP_CHANNEL_NAME),
    token: String(process.env.REACT_APP_AGORA_APP_TOKEN),
    uid: uuidv4(),
  };

  const rtc = useRef<{
    client: IAgoraRTCClient | null;
    localAudioTrack: any;
    localVideoTrack: any;
  }>({
    localAudioTrack: null,
    client: null,
    localVideoTrack: null,
  });

  async function handleStart() {
    try {
      setJoined(true);
      rtc.current.client = AgoraRTC.createClient({
        mode: "rtc",
        codec: "h264",
      });

      rtc.current.client
        .join(options.appId, options.channel, options.token, options.uid)
        .then((uid) =>
          Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
        )
        .then(([tracks, uid]) => {
          const [audioTrack, videoTrack] = tracks;
          // setLocalTracks(tracks);
          rtc.current.localAudioTrack = audioTrack;
          rtc.current.localVideoTrack = videoTrack;
          setUsers((previousUsers: any) => [
            ...previousUsers,
            {
              uid,
              videoTrack,
              audioTrack,
            },
          ]);
          rtc.current.client?.publish(tracks);
        });

      rtc.current.client?.on("user-published", async (user, mediaType) => {
        // Subscribe to a remote user
        await rtc.current.client?.subscribe(user, mediaType);
        console.log("activeUser", user);
        console.log("subscribe success");
        // console.log(user);

        if (mediaType === "video") {
          // Get `RemoteVideoTrack` in the `user` object.
          setUsers((previousUsers: any) => [...previousUsers, user]);
        }

        if (mediaType === "audio") {
          // Get `RemoteAudioTrack` in the `user` object.
          const remoteAudioTrack = user?.audioTrack;
          // Play the audio track. Do not need to pass any DOM element
          remoteAudioTrack?.play();
        }
      });
    } catch (error) {
      console.error(error);
      setJoined(false);
    }
  }

  async function handleLeave() {
    try {
      setJoined(false);

      rtc.current.client?.on("user-unpublished", (user) => {
        // setUsers((previousUsers: any) =>
        //   previousUsers.filter((u: any) => u.uid !== user.uid)
        // );
        // Get the dynamically created DIV container
      });

      rtc.current.client?.on("user-left", (user: any) =>
        setUsers((previousUsers: any) =>
          previousUsers.filter((u: any) => u.uid !== user.uid)
        )
      );

      await rtc.current.client?.leave();
    } catch (err) {
      setJoined(true);

      console.error(err);
    }
  }

  const togglehandleMuteLocalTrack = async () => {
    if (!muted) {
      try {
        setMuted(true);
        await rtc.current.localAudioTrack?.setEnabled(false);
      } catch (e) {
        setMuted(false);
      }
    } else {
      try {
        setMuted(false);
        await rtc.current.localAudioTrack?.setEnabled(true);
      } catch (e) {
        setMuted(true);
      }
    }
  };

  const handleToggleVideoOffAndOn = async () => {
    if (!videoOff) {
      try {
        setVideoOff(true);
        await rtc.current.localVideoTrack?.setEnabled(false);
      } catch (error) {
        setVideoOff(false);
      }
    } else {
      try {
        setVideoOff(false);
        await rtc.current.localVideoTrack?.setEnabled(true);
      } catch (error) {
        setVideoOff(true);
      }
    }
  };

  useEffect(() => {
    rtc.current.client?.enableAudioVolumeIndicator();
    rtc.current.client?.on("volume-indicator", (volumes: any) => {
      volumes.forEach((volume: any) => {
        if (
          (options.uid !== volume.uid && volume.level > 30) ||
          (options.uid === volume.uid && volume.level > 30)
        ) {
          setActiveUser(volume.uid);
        }
        if (
          (options.uid !== volume.uid && volume.level < 30) ||
          (options.uid === volume.uid && volume.level < 30)
        ) {
          setActiveUser("");
        }
      });
    });
  }, [joined, options.uid]);

  useEffect(() => {
    if (!loading && users.length === 0 && joined) {
      setLoading(true);
    }
  }, [loading, users, joined]);

  useEffect(() => {
    if (loading && users.length !== 0 && joined) {
      setLoading(false);
    }
  }, [loading, users, joined]);

  return (
    <div className="place-content-center text-center">
      {/* {!joined && (
        <div className="flex justify-center items-center">
          <div className="text-center w-[300px]">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Name"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
      )} */}
      {!joined && (
        <NotJoinCall
          handleStart={() => setIsGetStarted(true)}
          isGetStarted={isGetStarted}
        />
      )}
      {joined ? (
        <div className="grid max-md:grid-cols-1 grid-cols-2 gap-8">
          {users?.map((user: any) => (
            <AgoraVideoPlayer
              key={user.uid}
              userId={user.uid}
              user={user}
              videoOff={videoOff}
              activeUser={activeUser}
            />
          ))}
        </div>
      ) : null}

      {loading && <Loader />}
      <div className="navbar_bg w-fit">
        <div className=" w-full p-2 flex items-center justify-center">
          {joined && (
            <>
              <button
                onClick={togglehandleMuteLocalTrack}
                data-tooltip-target="tooltip-microphone"
                type="button"
                className="p-2.5 group bg-gray-100 rounded-full hover:bg-gray-200 mr-4 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
              >
                {muted ? (
                  <BsFillMicMuteFill className="text-white" />
                ) : (
                  <BsFillMicFill className="text-white" />
                )}
              </button>
              <button
                onClick={handleToggleVideoOffAndOn}
                data-tooltip-target="tooltip-camera"
                type="button"
                className="p-2.5 bg-gray-100 group rounded-full hover:bg-gray-200 mr-4 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:bg-gray-600 dark:hover:bg-gray-800"
              >
                {videoOff ? (
                  <BsFillCameraVideoOffFill className="text-white" />
                ) : (
                  <BsFillCameraVideoFill className="text-white" />
                )}
              </button>
            </>
          )}
          {!joined ? (
            <>
              {isGetStarted && (
                <button
                  onClick={handleStart}
                  data-tooltip-target="tooltip-start-call"
                  type="button"
                  className="p-2.5 bg-gray-100 group rounded-full hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200  dark:bg-gray-600 dark:hover:bg-gray-800"
                >
                  <MdCall className="text-white" />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={handleLeave}
              data-tooltip-target="tooltip-end-call"
              type="button"
              className="p-2.5 bg-gray-100 group rounded-full hover:bg-gray-200  focus:outline-none focus:ring-4 focus:ring-gray-200  dark:bg-gray-600 dark:hover:bg-gray-800"
            >
              <MdCallEnd className="text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgoraCall;
