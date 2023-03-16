import { Link } from "react-router-dom";
import Assignment from "../pages/assignment/Assignment";

const Header = () => {
  return (
    <nav className="fixed w-full h-20 bg-zinc-800 px-2 py-2.5 text-white">
      <div className="h-full container flex flex-wrap justify-between items-center mx-auto">
        <Link className="h-full" to="/">
          <img
            className="h-full"
            src="https://flow-assignment.s3.ap-northeast-2.amazonaws.com/static-assets/behoney+logo+white.png"
            alt=""
          />
        </Link>
        <div className="w-64 flex flex-wrap justify-between text-lg font-bold">
          <Link to="/assignment">
            <Assignment />
          </Link>
          <Link to="/signin">Sign-In</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
