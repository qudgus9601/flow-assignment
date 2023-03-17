import { Routes, Route } from "react-router-dom";
import Setting from "../pages/admin/Setting";
import Upload from "../pages/Upload/Upload";
import Home from "../pages/home/Home";

const Content = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/signin" element={<Home />} />
      <Route path="/signup" element={<Home />} />
    </Routes>
  );
};

export default Content;
