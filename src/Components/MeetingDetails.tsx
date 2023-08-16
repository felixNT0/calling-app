import dayjs from "dayjs";
import { editMeeting, generateAgoraToken } from "../api";
import { useMutation } from "react-query";
import React, { useState } from "react";
import { valueType } from "./NotJoinCall";
import CreateMeetingModal from "./CreateMeetingModal";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const MeetingDetailPage = ({
  title,
  description,
  date,
  id,
  refetch,
  user,
  createAt,
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const { mutate, isLoading, isSuccess } = useMutation((data: any) =>
    editMeeting(id!, data)
  );
  const onSubmit = async (val: valueType) => {
    const { title, description, startDate } = val;
    const { token, agoraAppId } = await generateAgoraToken(title, startDate);
    if (token) {
      mutate({
        title: title,
        description: description,
        date: startDate,
        token: token,
        createAt: createAt,
        updateAt: String(new Date()),
        id: id,
        user: user,
        agoraAppId: agoraAppId,
      });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      refetch();
    }
  }, [isSuccess]);
  return (
    <>
      <div className="mt-10 flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold mb-4">Meeting Details</h1>
          <div className="bg-gray-200 p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <h3 className="text-md text-gray-600 mb-4">{description}</h3>
            <div className="flex flex-col  justify-center items-center">
              <div className="md:w-1/2">
                <p className="mb-2">
                  <strong>Date:</strong> {dayjs(date).format("MMMM D, YYYY")}
                </p>
                <p>
                  <strong>Time:</strong> {dayjs(date).format("h:mm A")}
                </p>
              </div>
              {/* <div className="md:w-1/2 flex flex-row gap-5 justify-center items-center mt-5">
                <button className="py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 ">
                  Delete
                </button>
                <button
                  onClick={toggleModal}
                  className="py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 "
                >
                  Edit
                </button>
              </div> */}
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
                <TelegramShareButton
                  url={`https://fkt-calling-app.vercel.app/${id}`}
                  title={title}
                >
                  <TelegramIcon size={33} round />
                </TelegramShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        isLoading={isLoading}
        onSubmit={onSubmit}
        defaultValue={{
          title: title,
          description: description,
          startDate: date,
        }}
      />
    </>
  );
};

export default MeetingDetailPage;
