import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="fixed w-full h-20 bg-zinc-800 px-2 py-2.5 text-white">
      <div className="h-full container flex flex-wrap justify-between items-center mx-auto">
        <Link className="h-full flex-row items-center flex" to="/">
          <span className="text-3xl font-bold hover:text-purple-400">
            BeHoney
          </span>
        </Link>
        <div className="w-96 flex flex-wrap justify-between text-lg font-bold">
          <Link className="hover:text-purple-400" to="/setting">
            Setting
          </Link>
          <Link className="hover:text-purple-400" to="/upload">
            Upload
          </Link>
          <Link className="hover:text-purple-400" to="/signin">
            Sign-In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
