import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMeetingByIdMeeting } from "../api";
import MeetingDetailPage from "./MeetingDetails";
import AgoraUIVideoPlayer from "./Agora/AgoraUIVideoPlayer";
import { MdCall } from "react-icons/md";
import NavBar from "./NavBar";

function AgoraCall() {
  const { id } = useParams();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, refetch } = useQuery(["Meeting-Id", id], () =>
    getMeetingByIdMeeting(id!)
  );

  const toggleStart = () => {
    setJoined(!joined);
    setLoading(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  if (isLoading) return <Loader />;

  return (
    <>
      {!joined && <NavBar />}
      <div className="place-content-center text-center">
        {data && !joined && <MeetingDetailPage {...data} refetch={refetch} />}
        {loading && <Loader callConnection={true} />}
        {joined && (
          <AgoraUIVideoPlayer
            toggleStart={toggleStart}
            token={data?.token}
            channelName={data?.title}
            agoraAppId={data?.agoraAppId}
          />
        )}
        {!joined && (
          <div className="flex items-center justify-center">
            <button
              onClick={toggleStart}
              data-tooltip-target="tooltip-start-call"
              type="button"
              className="p-2.5 mt-5 text-center group rounded-lg text-white flex items-center focus:outline-none focus:ring-4 bg-green-500 hover:bg-gray-800"
            >
              <MdCall className="text-white mr-1" /> Start
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AgoraCall;
