import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import LoadingCircle from "./LoadingCircle";
import { valueType } from "./NotJoinCall";
import dayjs from "dayjs";

interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (val: valueType) => void;
  isLoading: boolean;
  defaultValue?: valueType;
}

const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  defaultValue,
}) => {
  const [title, setTitle] = useState(defaultValue?.title || "");
  const [description, setDescription] = useState(
    defaultValue?.description || ""
  );
  const [startDate, setStartDate] = useState(
    defaultValue?.startDate || String(new Date())
  );

  const value = dayjs(defaultValue?.startDate).format("MMMM D, YYYY:h:mm A");

  const [dateValue, setDateValue] = useState(value || String(new Date()));

  const verifyInput = () => {
    if (title.trim() === "" && description.trim() === "") return false;
    return true;
  };

  const handleSave = async () => {
    onSubmit({ title, description, startDate });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleStartDateChange = (e: any) => {
    setDateValue(e.target.value);
    const newStartDate = new Date(e.target.value);
    setStartDate(String(newStartDate));
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 ${
          isOpen ? "visible opacity-70" : "invisible opacity-0"
        } bg-black backdrop-blur transition-opacity duration-300`}
      ></div>

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          isOpen
            ? "visible opacity-100 scale-100"
            : "invisible opacity-0 scale-95"
        } transition-opacity transform duration-300`}
      >
        <div className="bg-white w-[50%] max-sm:w-[95%] sm:w-[50%] md:w-[50%] max-lg:w-[35%] xl:w-[25%] p-6 rounded shadow-lg">
          <h2 className="text-xl mb-4">
            {defaultValue?.title ? "Edit Meeting" : " Create Meeting"}
          </h2>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Meeting Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-none"
            placeholder="Meeting Description"
            value={description}
            onChange={handleDescriptionChange}
            rows={5} // Starting rows
          />
          <input
            type="datetime-local"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Meeting Title"
            value={dateValue}
            // defaultValue={currentDateTime}
            onChange={handleStartDateChange}
          />

          <div className="flex justify-center">
            <button
              className={`bg-gray-600 flex flex-row gap-3 justify-center items-center hover:bg-gray-800 text-white rounded  text-center  px-4 py-2 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              onClick={handleSave}
              disabled={isLoading || !verifyInput()}
            >
              {isLoading && <LoadingCircle />}{" "}
              {defaultValue?.title ? "Edit" : "Save"}
            </button>
            <button
              className={`ml-2 bg-gray-300 hover:bg-gray-400 text-center text-gray-700 rounded px-4 py-2 ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMeetingModal;
