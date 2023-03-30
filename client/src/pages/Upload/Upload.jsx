import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(undefined);
  const [list, setList] = useState([]);

  const [deprecate, setDeprecate] = useState(true);
  useEffect(() => {
    if (!!file) {
      const arr = list.filter((e) => {
        return (
          e.name === file?.name?.split(".")[file?.name?.split(".").length - 1]
        );
      });
      setDeprecate(arr.length === 0 ? false : arr[0].deprecated ? true : false);
    }
  }, [file, list]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/api/format/list`,
      withCredentials: true,
    })
      .then((data) => {
        setList(data.data.formatList);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {});
  const navigator = useNavigate();
  const fileRef = useRef();
  /**
   *  @desc input file 열어줌
   */
  const browse = () => {
    fileRef.current.click();
  };

  /**
   * @desc 파일 변화를 감지합니다.
   * @param {Event} e
   */
  const fileChange = (e) => {
    const blob = e.target.files[0];
    setFile(blob);
    if (deprecate) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/api/format/increment`,
        data: { format_name: blob?.name.split(".").pop() },
      });
    }
  };

  /**
   * @desc 파일을 업로드 합니다.
   */
  const uploadFile = () => {
    if (file) {
      const fileData = new FormData();
      const uploadedFile = new File([file], encodeURI(file?.name));
      fileData.append("file", uploadedFile);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/api/upload/file`,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: fileData,
      })
        .then((data) => {
          if (!!data.data.fileInfo) {
            window.alert("파일 업로드 성공");
            navigator("/");
          } else {
            window.alert("파일 업로드 실패!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="h-full mx-auto pt-40 flex-grow text-white">
      <div className="h-screen mx-auto container flex justify-between">
        <div
          className="w-5/12 h-4/6 border-dotted border-white border-2 rounded-xl hover:bg-zinc-900 cursor-pointer flex items-center justify-center"
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
        <div className="w-6/12 h-4/6">
          <p className="text-3xl font-extrabold text-zinc-900">File Upload</p>
          <p className="text-xl mb-10 font-bold text-red-200">
            파일의 크기 제한은 10 MB 입니다.
          </p>
          <p className="text-2xl font-bold">파일명</p>
          <p className="text-1xl mt-1 mb-6">{file?.name || "No Name"}</p>
          <p className="text-2xl font-bold">확장자</p>
          <p className="text-1xl mt-1 mb-6">
            {file?.name?.split(".")[file?.name?.split(".").length - 1] ||
              "No Format"}
          </p>
          <p className="text-2xl font-bold">용량</p>
          <p className="text-1xl mt-1 mb-6">{file?.size || 0}</p>
          <p className="text-2xl font-bold">제한 여부</p>
          <p
            className={`text-1xl mt-1 mb-6 ${
              deprecate || file?.size >= 10000000
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {deprecate
              ? "파일 형식 제한"
              : file?.size >= 10000000
              ? "파일 용량 초과"
              : "허용"}
          </p>
          <button
            className={`w-9/12 bg-zinc-800 h-10 mt-4 rounded font-bold ${
              deprecate || file?.size >= 10000000 ? "cursor-not-allowed" : ""
            }`}
            onClick={uploadFile}
            disabled={deprecate || file?.size >= 10000000}
          >
            {deprecate
              ? "파일 형식 제한"
              : file?.size >= 10000000
              ? "파일 용량 초과"
              : "파일 업로드"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
