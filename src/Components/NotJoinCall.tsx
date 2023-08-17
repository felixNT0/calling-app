import { useState } from "react";
import CreateMeetingModal from "./CreateMeetingModal";
import { useMutation, useQuery } from "react-query";
import { createMeeting, generateAgoraToken, getAllMeeting } from "../api";
import MeetingCard from "./MeetingCard";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import React from "react";
import Loader from "./Loader";

export type valueType = {
  title: string;
  description: string;
  startDate: string | Date;
};

function NotJoinCall() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const {
    data,
    refetch,
    isLoading: dataIsLoading,
  } = useQuery(["Meetings"], getAllMeeting);

  const { mutate, isLoading, isSuccess } = useMutation(createMeeting, {
    onSuccess: () => {
      toast("Meeting Created Successfully");
    },
    onError(error, variables, context) {
      toast("An Error Occured");
    },
  });

  const currentActiveUserId = localStorage.getItem("currentActiveUserId") || "";

  const onSubmit = async (val: valueType) => {
    const { title, description, startDate } = val;

    const { token, agoraAppId } = await generateAgoraToken(title, startDate);
    if (token) {
      mutate({
        title: title,
        description: description,
        date: startDate,
        token: token,
        createAt: String(new Date()),
        id: uuidv4(),
        agoraAppId: agoraAppId,
        user: currentActiveUserId,
      });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      refetch();
    }
  }, [isSuccess]);

  if (dataIsLoading) return <Loader />;

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <button
        className="bg-gray-600 hover:bg-gray-800 text-white rounded px-4 py-2 mb-7"
        onClick={toggleModal}
      >
        Create A Meeting
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {data &&
          data?.map((item: any) => <MeetingCard key={item.id} {...item} />)}
      </div>
      {data && data?.length === 0 && (
        <p className="text-black mb-4">No Upcoming meeting currently</p>
      )}
      {!data && data?.length === 0 && (
        <p className="text-black mb-4">No Upcoming meeting currently</p>
      )}
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default NotJoinCall;
