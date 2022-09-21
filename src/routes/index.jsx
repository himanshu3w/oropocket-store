import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FAQPage from "../pages/FAQ";
import HomePage from "../pages/Home";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
