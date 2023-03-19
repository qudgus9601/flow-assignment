import axios from "axios";
import { useEffect, useState, useRef } from "react";

// FIX : 200개 체크하기

const Setting = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {});

  /**
   * @desc 입력 값을 반영합니다.
   * @param {Event} e
   */
  const inputChange = (e) => {
    setInput(e.target.value);
  };

  /**
   * @desc 엔터 여부를 확인합니다.
   * @param {Event} e
   */
  const isEnter = (e) => {
    if (e.key === "Enter") {
      if (input.length === 0 || input.length > 20) {
        inputRef.current.classList.add("border-2");
        inputRef.current.classList.add("border-red-700");
      } else {
        inputRef.current.classList.remove("border-2");
        inputRef.current.classList.remove("border-red-700");
        addFormat();
      }
    }
  };
  /**
   * @desc 포멧을 추가합니다.
   */
  const addFormat = () => {
    const len = list.filter((e) => {
      return e.name === input;
    }).length;

    if (len !== 0) {
      window.alert("이미 등록 되어 있는 포멧입니다.");
    } else {
      if (input.length > 0 && input.length <= 20) {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}/api/format/add`,
          data: { name: input },
          withCredentials: true,
        }).then((data) => {
          inputRef.current.value = "";
          inputRef.current.classList.remove("border-2");
          inputRef.current.classList.remove("border-red-700");
          setInput("");
          if (!!data.data.formatInfo) {
            getList();
          }
        });
      } else {
        inputRef.current.classList.add("border-2");
        inputRef.current.classList.add("border-red-700");
      }
    }
  };

  /**
   * @desc 포멧을 제거합니다.
   */
  const deleteFormat = (e) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/format/remove`,
      data: { name: e.currentTarget.id },
      withCredentials: true,
    })
      .then((data) => {
        if (data.data.success) {
          getList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * @desc 포멧을 제한합니다
   */
  const deprecateToggle = (e, deprecated) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/format/deprecate`,
      data: { name: e.currentTarget.id, deprecated: deprecated },
      withCredentials: true,
    }).then((data) => {
      if (data.data.success) {
        getList();
      }
    });
  };

  /**
   * @desc 모든 포멧 리스트를 받아옵니다.
   */
  const getList = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/api/format/list`,
      withCredentials: true,
    }).then((data) => {
      const formatList = data.data.formatList;
      setList(formatList);
    });
  };

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
        <div className="flex flex-wrap mt-10">
          {list
            ?.filter((e) => {
              return e.static === true;
            })
            ?.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
            .map((e, idx) => {
              return (
                <div
                  className={`${
                    e.deprecated ? "bg-blue-500" : "bg-gray-100"
                  } text-black cursor-pointer w-20 h-10 flex flex-row justify-center items-center rounded mr-4 hover:scale-105`}
                  key={idx}
                  id={e.name}
                  onClick={(event) => {
                    deprecateToggle(event, e.deprecated);
                  }}
                >
                  <span className="mx-1">{e.name}</span>
                  <span className="inline-flex items-center p-1 mr-1 text-sm font-semibold text-gray-800 bg-transparent">
                    <svg
                      aria-hidden="true"
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d={
                          e.deprecated
                            ? "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            : "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0zz"
                        }
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </div>
              );
            })}
        </div>
        <div className="text-3xl font-bold mt-20">
          <p>
            커스텀 확장자{" "}
            <span className="text-xs text-neutral-200">
              원하는 확장자를 자유롭게 제한 할 수 있습니다 (20글자, 200개 제한)
            </span>
          </p>
        </div>
        <input
          type="text"
          className="mt-10 w-3/12 indent-3 text-black h-10 rounded"
          onChange={inputChange}
          onKeyDown={isEnter}
          ref={inputRef}
        ></input>
        <button
          className="ml-5 w-1/12 bg-zinc-800 h-10 rounded hover:scale-105"
          onClick={addFormat}
        >
          추가
        </button>
        <div className="flex mt-10 flex-wrap">
          {list
            ?.filter((e) => {
              return e.static === false;
            })
            .map((e, idx) => {
              return (
                <div
                  className="bg-blue-500 text-black cursor-pointer px-3 h-10 flex flex-row justify-center items-center rounded mr-4 hover:scale-105 my-3"
                  key={idx}
                  id={e.name}
                  onClick={deleteFormat}
                >
                  <span className="mx-1">{e.name}</span>
                  <span className="inline-flex items-center p-1 mr-1 text-sm font-semibold text-gray-800 bg-transparent">
                    <svg
                      aria-hidden="true"
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Setting;
