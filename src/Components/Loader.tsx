import { Radio } from "react-loader-spinner";

function Loader() {
  return (
    <div className="backdrop">
      <div
        tabIndex={-1}
        className="fixed flex justify-center items-center z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative bg-white rounded-lg shadow  w-fit max-h-full">
          <div className="p-6 flex justify-center items-center">
            <Radio
              visible={true}
              height="80"
              width="80"
              ariaLabel="radio-loading"
              wrapperStyle={{}}
              wrapperClass="radio-wrapper"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
