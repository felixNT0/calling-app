import { MdCall } from "react-icons/md";
function NavBar() {
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-5">
        <div className="flex items-center">
          <MdCall className="text-white text-[30px] mr-[20px]" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Video Calling App
          </span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
