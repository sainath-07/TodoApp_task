import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todoapp from "../components/Todoapp";
import PageNotFound from "../components/Pagenotfound";

const Navigationscreen = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todoapp />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Navigationscreen;
