function NotJoinCall({ handleStart, isGetStarted }: any) {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-800 md:text-5xl lg:text-6xl ">
        Welcome to Video Call Website
      </h1>
      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-500">
        Where all the user of the website can call each other for any occassion
        all over the world
      </p>
      {isGetStarted && (
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-500">
          Click the below button to start a call or join a call
        </p>
      )}
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <div
          onClick={handleStart}
          className="inline-flex cursor-pointer justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg dark:bg-gray-600 dark:hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
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
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="inline-flex cursor-pointer justify-center bg-gray-300 hover:bg-gray-400 hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white  focus:ring-4 focus:ring-gray-400">
          Learn more
        </div>
      </div>
    </div>
  );
}

export default NotJoinCall;
