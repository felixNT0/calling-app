import dayjs from "dayjs";
import { deleteMeeting, editMeeting, generateAgoraToken } from "../api";
import { useMutation } from "react-query";
import React, { useState } from "react";
import { valueType } from "./NotJoinCall";
import CreateMeetingModal from "./CreateMeetingModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./modal/DeleteModal";
import DropdownMenu from "./DropDown";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  const { mutate, isLoading, isSuccess } = useMutation(
    (data: any) => editMeeting(id!, data),
    {
      onSuccess: () => {
        toast("Meeting Edited Successfully");
      },
      onError(error, variables, context) {
        toast("An Error Occured");
      },
    }
  );
  const mutation = useMutation(() => deleteMeeting(id), {
    onSuccess: () => {
      toast("Meeting Deleted Successfully");
      navigate("/");
    },
    onError(error, variables, context) {
      toast("An Error Occured");
    },
  });
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

  const onDelete = () => {
    mutation.mutate();
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
                <button
                  onClick={toggleDeleteModal}
                  className="py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 "
                >
                  Delete
                </button>
                <button
                  onClick={toggleDeleteModal}
                  className="py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 "
                >
                  Edit
                </button>
              </div> */}

              <div className="flex items-center justify-center gap-3 mt-5">
                <p>Share</p>
                <DropdownMenu title={title} id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        open={isDeleteModalOpen}
        toggleModal={toggleModal}
        onDelete={onDelete}
      />
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
