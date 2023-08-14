import { Radio } from "react-loader-spinner";

function Loader() {
  return (
    <div className="backdrop flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-center items-center">
          <Radio
            visible={true}
            height={80}
            width={80}
            ariaLabel="radio-loading"
            colors={["#1F2937", "#1F2937", "#1F2937"]}
          />
        </div>
      </div>
    </div>
  );
}

export default Loader;
