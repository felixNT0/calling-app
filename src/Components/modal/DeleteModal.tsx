interface Props {
  open: boolean;
  toggleModal: () => void;
  onDelete: () => void;
}

function DeleteModal({ open, toggleModal, onDelete }: Props) {
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
            Confirm
          </h3>
          <div className="flex flex-row gap-5 justify-center items-center mt-5">
            <button
              onClick={onDelete}
              className="py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 "
            >
              Yes
            </button>
            <button
              onClick={toggleModal}
              className="py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 "
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
