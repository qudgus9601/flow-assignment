import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/userSlice";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/api/user/verifytoken`,
      withCredentials: true,
    }).then((data) => {
      if (!!data.data.userInfo) {
        dispatch(login({ ...data.data.userInfo }));
        setUser({ ...data.data.userInfo, isLogin: true });
      } else {
        dispatch(logout());
        setUser({});
      }
    });
  }, [dispatch]);

  /**
   * @dev 로그아웃 진행합니다.
   */
  const logoutUser = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/api/user/signout`,
      withCredentials: true,
    }).then((data) => {
      if (data.data.success) {
        dispatch(logout());
        window.location.replace("/");
      }
    });
  };
  return (
    <nav className="fixed w-full h-20 bg-zinc-800 px-2 py-2.5 text-white">
      <div className="h-full container flex flex-wrap justify-between items-center mx-auto">
        <Link className="h-full flex-row items-center flex" to="/">
          <span className="text-2xl font-bold hover:text-purple-400">
            BeHoney
          </span>
        </Link>
        <div className="w-96 flex flex-wrap justify-between text-lg font-bold">
          {user?.isLogin && user.role === 1 ? (
            <Link className="hover:text-purple-400" to="/setting">
              Setting
            </Link>
          ) : (
            ""
          )}
          <Link className="hover:text-purple-400" to="/upload">
            Upload
          </Link>
          <Link className="hover:text-purple-400" to="/chat">
            Chat
          </Link>

          {user?.isLogin ? (
            <button
              className="hover:text-purple-400"
              to="/logout"
              onClick={logoutUser}
            >
              Logout
            </button>
          ) : (
            <Link className="hover:text-purple-400" to="/signin">
              Sign-In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
