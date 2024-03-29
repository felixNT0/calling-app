import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import DropdownMenu from "./DropDown";
dayjs.extend(relativeTime);

interface Props {
  title: string;
  description: string;
  date: string;
  id: string;
}

const MeetingCard = ({ title, description, date, id }: Props) => {
  const navigate = useNavigate();
  const currentTime = dayjs();
  const formattedEventTime = dayjs(date);

  dayjs.locale("en");

  const isEventPassed = formattedEventTime.isBefore(currentTime);
  // const eventDateTimeFormat = "h:mm A";

  const remainingTimeDisplay = formattedEventTime.fromNow();

  const currentTimeCheck = formattedEventTime.add(3, "hour") > currentTime;
  const currentDayCheck = formattedEventTime.add(1, "day") > currentTime;

  return (
    <>
      {currentDayCheck && (
        <div className="w-full p-1 transition duration-300 transform hover:scale-105">
          <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {title || "Team Meeting"}
              </h2>
              <p className="text-gray-600 mb-4">
                {description || "Discussing project updates and next steps."}
              </p>
              <p className="text-gray-500">
                {formattedEventTime.format("MMMM D, YYYY")} at{" "}
                {formattedEventTime.format("h:mm A")}
              </p>
            </div>
            <div className="bg-gray-200 p-4 flex  gap-1 justify-between items-center">
              <>
                {isEventPassed && !currentTimeCheck ? (
                  <p className="text-sm text-gray-600">Event has passed</p>
                ) : (
                  <p className="text-sm text-gray-600">
                    {`Event starts ${remainingTimeDisplay}`}
                  </p>
                )}
                <button
                  onClick={() => navigate(`/${id}`)}
                  className={`px-4 py-2 ${
                    isEventPassed && !currentTimeCheck
                      ? "bg-gray-400 cursor-not-allowed"
                      : " bg-gray-600 hover:bg-gray-800"
                  } text-white rounded-lg transition-colors duration-300`}
                  disabled={isEventPassed && !currentTimeCheck}
                >
                  Join
                </button>
              </>
              <DropdownMenu title={title} id={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MeetingCard;
