// src/components/EcommerceOnboardingModal.tsx
import React from "react";
import image from "../../get-started.svg";

interface Props {
  open: boolean;
  toggleModal: () => void;
}

const OnboardingModal: React.FC<Props> = ({ open, toggleModal }) => {
  React.useEffect(() => {
    if (!open) {
      localStorage.setItem("modal", true.toString());
    }
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 ${
          open ? "visible opacity-70" : "invisible opacity-0"
        } bg-black backdrop-blur transition-opacity duration-300`}
      ></div>
      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          open
            ? "visible opacity-100 scale-100"
            : "invisible opacity-0 scale-95"
        } transition-opacity transform duration-300`}
      >
        <div className="bg-white w-[50%] max-sm:w-[95%] sm:w-[50%] md:w-[50%] max-lg:w-[35%] xl:w-[25%] p-5 rounded shadow-lg">
          <p
            // onClick={() => toggleWelcomeModal()}
            className="h-6 w-6 text-black absolute right-4 top-4 cursor-pointer sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
          >
            close
          </p>
          <h3 className="mb-4 text-lg font-extrabold tracking-tight leading-none text-gray-800 text-center">
            Welcome to Video Call Website
          </h3>
          <div className="flex justify-center items-center">
            <img
              className="max-w-full h-auto mb-5"
              src={image}
              alt="Responsive SVG"
            />
          </div>
          <p className="mb-8 text-md text-center text-gray-600">
            Where all the user of the website can call each other for any
            occassion all over the world
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <div
              onClick={toggleModal}
              className="inline-flex cursor-pointer justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 "
            >
              Get started
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            {/* <div
              onClick={toggleModal}
              className="inline-flex cursor-pointer justify-center bg-gray-300 hover:bg-gray-400 hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white  focus:ring-4 focus:ring-gray-400"
            >
              Close
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingModal;
