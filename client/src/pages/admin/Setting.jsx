const Setting = () => {
  return (
    <div className="h-full mx-auto pt-40 flex-grow text-white">
      <div className="h-full mx-auto container">
        <div className="text-3xl font-bold">
          <p>
            고정 확장자{" "}
            <span className="text-xs text-neutral-200">
              자주 차단하는 확장자입니다.
            </span>
          </p>
        </div>
        <div>
          <div className="bg-gray-100 text-black cursor-pointer w-20 h-8 flex flex-row justify-center items-center rounded">
            <span className="inline-flex items-center p-1 mr-1 text-sm font-semibold text-gray-800 bg-transparent">
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="mx-1">bat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
