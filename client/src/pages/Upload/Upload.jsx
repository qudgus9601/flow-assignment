import axios from "axios";
import { useRef, useState, useEffect } from "react";

// FIX : 파일 전송하기
const Upload = () => {
  const [file, setFile] = useState({});
  const [list, setList] = useState([]);
  const [deprecate, setDeprecate] = useState("제한됨");
  useEffect(() => {
    const arr = list.filter((e) => {
      return (
        e.name === file?.name?.split(".")[file?.name?.split(".").length - 1]
      );
    });
    setDeprecate(arr.length > 0 ? "제한됨" : "허용");
  }, [file?.name, list]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/api/format/list`,
      withCredentials: true,
    })
      .then((data) => {
        setList(
          data.data.formatList.filter((e) => {
            return e.deprecated === false;
          })
        );
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {});
  const fileRef = useRef();
  /**
   *  @desc input file 열어줌
   */
  const browse = () => {
    fileRef.current.click();
  };

  const fileChange = (e) => {
    const blob = e.target.files[0];
    setFile(blob);
    if (!!e.target.value) {
      const imageData = new FormData();
      const file = new File([blob], blob.name);
      imageData.append("file", file);
      axios({
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {},
      });
    }
  };

  return (
    <div className="h-full mx-auto pt-40 flex-grow text-white">
      <div className="h-full mx-auto container flex justify-between">
        <div
          className="w-5/12 h-5/6 border-dotted border-white border-2 rounded-xl hover:bg-zinc-900 cursor-pointer flex items-center justify-center"
          onClick={browse}
        >
          <img
            className="w-2/12"
            src="https://flow-assignment.s3.ap-northeast-2.amazonaws.com/static-assets/pngwing.com.png"
            alt=""
          />
        </div>
        <input
          type="file"
          className="hidden"
          ref={fileRef}
          onChange={fileChange}
        ></input>
        <div className="w-6/12 h-5/6">
          <p className="text-3xl">파일명</p>
          <p className="text-2xl mt-1 mb-10">{file?.name || "No Name"}</p>
          <p className="text-3xl">확장자</p>
          <p className="text-2xl mt-1 mb-10">
            {file?.name?.split(".")[file?.name?.split(".").length - 1] ||
              "No Format"}
          </p>
          <p className="text-3xl">용량</p>
          <p className="text-2xl mt-1 mb-10">{file?.size || 0}</p>
          <p className="text-3xl">제한 여부</p>
          <p className="text-2xl mt-1 mb-10">{deprecate || "제한됨"}</p>
          <button className="w-9/12 bg-zinc-800 h-10 mt-40 rounded font-bold">
            파일 업로드
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
