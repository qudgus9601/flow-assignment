import { Routes, Route } from "react-router-dom";
import Setting from "../pages/admin/Setting";
import Upload from "../pages/Upload/Upload";
import Home from "../pages/home/Home";
import Signin from "../pages/signin/Signin";
import Signup from "../pages/signup/Signup";
import Chat from "../pages/chat/Chat";

const Content = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default Content;
