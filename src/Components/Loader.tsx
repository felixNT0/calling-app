import { Radio, FallingLines } from "react-loader-spinner";

function Loader({ callConnection }: { callConnection?: boolean }) {
  return (
    <>
      <div
        className={`fixed inset-0 "visible opacity-70
        bg-black backdrop-blur transition-opacity duration-300`}
      />
      <div
        className={`fixed inset-0 flex items-center justify-center  "visible opacity-100 scale-100"
         transition-opacity transform duration-300`}
      >
        <div className="bg-white p-7 rounded-lg shadow-lg">
          <div className="flex justify-center items-center">
            {callConnection ? (
              <Radio
                visible={true}
                height={80}
                width={80}
                ariaLabel="radio-loading"
                colors={["#1F2937", "#1F2937", "#1F2937"]}
              />
            ) : (
              <FallingLines
                color="#1F2937"
                height={"80"}
                width={"80"}
                visible={true}
                // ariaLabel="falling-lines-loading"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader;
