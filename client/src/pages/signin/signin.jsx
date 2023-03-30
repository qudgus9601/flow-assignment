import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";

const Signin = () => {
  const [user, setUser] = useState({});
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  useEffect(() => {
    if (userInfo.isLogin) {
      navigator("/");
    }
  }, [userInfo.isLogin, navigator]);

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
    if (user.loginId && user.password) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/api/user/signin`,
        data: user,
        withCredentials: true,
      }).then((data) => {
        if (!!data.data?.userInfo) {
          dispatch(
            login({
              _id: data.data.userInfo.userId,
              role: data.data.userInfo.role,
            })
          );
          window.location.replace("/");
        } else {
          window.alert("아이디 비밀번호를 확인해주세요.");
        }
      });
    } else {
      window.alert("아이디 비밀번호를 입력해주세요.");
    }
  };

  useEffect(() => {});
  return (
    <div className="h-full py-24 container mx-auto">
      <div className="h-5/6 w-1/2 bg-white flex flex-wrap mx-auto">
        <div className="w-full h-5/6 bg-zinc-800">
          <div className="w-8/12 h-full flex flex-col mx-auto py-20 text-white">
            <p className="text-5xl font-bold mb-4 text-purple-400">Flowg-In</p>
            <p className="text-gray-200 mb-2">플로우~~~그인</p>
            <p className="text-gray-200 mb-5">id : flow / pwd : team</p>
            <p className="mb-1">ID</p>
            <input
              className="w-full h-10 rounded mb-8 text-black indent-4 font-bold"
              type="text"
              onChange={inputChange}
              onKeyDown={isEnter}
              value={user.loginId || ""}
              id="loginId"
            ></input>
            <p className="mb-1">PASSWORD</p>
            <input
              className="w-full h-10 rounded mb-8 text-black indent-4 font-bold"
              type="password"
              onChange={inputChange}
              onKeyDown={isEnter}
              value={user.password || ""}
              id="password"
            ></input>
            <button
              className="w-full h-10 rounded mb-7 text-white font-bold bg-zinc-700 text-lg hover:text-purple-400"
              onClick={submit}
            >
              로그인
            </button>
            <Link
              className="flex mx-auto hover:text-purple-400 text-lg"
              to="/signup"
            >
              신규 회원으로 변신하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
