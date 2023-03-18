import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Signin = () => {
  const [user, setUser] = useState({});

  /**
   * @desc 입력 값을 반영합니다.
   * @param {Event} e
   */
  const inputChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  /**
   * @desc 엔터 여부를 확인합니다.
   * @param {Event} e
   */
  const isEnter = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  /**
   * @desc 입력받은 user값을 서버로 전송합니다.
   */
  const submit = () => {
    // user값이 제대로 들어가있나 확인
    if (user.id && user.password) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/api/user/signin`,
        data: user,
        withCredentials: true,
      }).then((data) => {
        console.log(data);
      });
    } else {
    }
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL);
  });
  return (
    <div className="h-full py-32 container mx-auto">
      <div className="h-full w-full bg-white flex flex-wrap">
        <div className="w-1/2 bg-zinc-800">
          <div className="w-8/12 h-full flex flex-col mx-auto py-36 text-white">
            <p className="text-6xl font-bold mb-4 text-purple-400">Flowg-In</p>
            <p className="text-gray-200 mb-10">플로우~~~그인</p>
            <p className="mb-1">ID</p>
            <input
              className="w-full h-14 rounded mb-10 text-black indent-4 font-bold"
              type="text"
              onChange={inputChange}
              onKeyDown={isEnter}
              value={user.id || ""}
              id="id"
            ></input>
            <p className="mb-1">PASSWORD</p>
            <input
              className="w-full h-14 rounded mb-10 text-black indent-4 font-bold"
              type="password"
              onChange={inputChange}
              onKeyDown={isEnter}
              value={user.password || ""}
              id="password"
            ></input>
            <button
              className="w-full h-14 rounded mb-10 text-white font-bold bg-zinc-700 text-lg hover:text-purple-400"
              onClick={submit}
            >
              로그인
            </button>
            <Link
              className="flex mx-auto hover:text-purple-400 text-xl"
              to="/signup"
            >
              신규 회원으로 변신하기
            </Link>
          </div>
        </div>
        <div className="w-1/2 bg-blue-50"></div>
      </div>
    </div>
  );
};

export default Signin;
