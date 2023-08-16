import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useEffect, useMemo, useRef, useState } from "react";
import { AgoraVideoPlayer } from "./Agora/AgoraVideoPlayer";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMeetingByIdMeeting } from "../api";
import MeetingDetailPage from "./MeetingDetails";
import BottomActionButtons from "./BottomActionButtons";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

function AgoraCall() {
  const { id } = useParams();
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  // const [userName, setUserName] = useState("");
  const [isGetStarted, setIsGetStarted] = useState(false);

  const titles = "Meeting with the QA Testers";
  const ids =
    "006IACeOEKzBDezyFIjIAOjqfZRlqOSmKLsTMABSBcClQAvPWZXZy0AAAAAIgD38QU9lAjdZAQAAQBEWt5kAgBEWt5kAwBEWt5kBABEWt5k";
  const [activeUser, setActiveUser] = useState("");

  const currentActiveUserId = localStorage.getItem("currentActiveUserId") || "";

  const { data, isLoading, refetch } = useQuery(["Meeting-Id", id], () =>
    getMeetingByIdMeeting(id!)
  );

  const options = {
    appId: String(process.env.REACT_APP_AGORA_APP_ID),
    channel: titles,
    token: ids,
    uid: currentActiveUserId,
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
        // console.log("activeUser", user);
        // console.log("subscribe success");
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

    return () => {
      handleLeave();
    };
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

  // const toggleFlashlight = () => {
  //   if (("torch" in navigator) as any) {
  //     navigator.torch
  //       .toggle()
  //       .then(() => {
  //         console.log("Flashlight toggled");
  //       })
  //       .catch((error: any) => {
  //         console.error("Failed to toggle flashlight:", error);
  //       });
  //   }
  // };

  // if ("torch" in navigator) {
  //   console.log("Torch API is supported");
  // } else {
  //   console.log("Torch API is not supported");
  // }

  const title = "dfkl";

  const allUsers = useMemo(() => {
    return users.filter(
      (obj: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t.uid === obj.uid)
    );
  }, [users]);

  if (isLoading) return <Loader />;

  return (
    <div className="place-content-center text-center">
      {joined && allUsers.length > 0 ? (
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allUsers?.map((user: any) => (
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
      <div className="flex space-x-2 mt-5">
        <FacebookShareButton
          url={`https://fkt-calling-app.vercel.app/${id}`}
          quote={title}
        >
          <FacebookIcon size={33} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={`https://fkt-calling-app.vercel.app/${id}`}
          title={title}
        >
          <TwitterIcon size={33} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={`https://fkt-calling-app.vercel.app/${id}`}
          title={title}
        >
          <WhatsappIcon size={33} round />
        </WhatsappShareButton>
      </div>
      {data && <MeetingDetailPage {...data} refetch={refetch} />}
      {loading && <Loader callConnection={true} />}
      <BottomActionButtons
        joined={joined}
        loading={loading}
        allUsers={allUsers}
        handleStart={handleStart}
        handleLeave={handleLeave}
        togglehandleMuteLocalTrack={togglehandleMuteLocalTrack}
        muted={muted}
        handleToggleVideoOffAndOn={handleToggleVideoOffAndOn}
        videoOff={videoOff}
      />
    </div>
  );
}

export default AgoraCall;
