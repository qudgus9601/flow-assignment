import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";

const Content = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signup" element={<Home />} />
      <Route exact path="/signup" element={<Home />} />
    </Routes>
  );
};

export default Content;
