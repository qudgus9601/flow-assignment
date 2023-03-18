import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({});
  const navigator = useNavigate();
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
        url: `${process.env.REACT_APP_SERVER_URL}/api/user/signup`,
        data: user,
        withCredentials: true,
      }).then((data) => {
        if (!!data.data?.userInfo) {
          navigator("/signin");
        } else {
          window.alert("이미 존재하는 아이디입니다.");
        }
      });
    } else {
      window.alert("아이디 비밀번호를 입력해주세요.");
    }
  };

  return (
    <div className="h-full py-32 container mx-auto">
      <div className="h-full w-1/2 bg-white flex flex-wrap mx-auto">
        <div className="w-full bg-zinc-800">
          <div className="w-8/12 h-full flex flex-col mx-auto py-36 text-white">
            <p className="text-6xl font-bold mb-4 text-purple-400">Sign-up</p>
            <p className="text-gray-200 mb-10">To Be A Flowian</p>
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
              회원가입 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
