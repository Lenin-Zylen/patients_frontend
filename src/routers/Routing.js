import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
const Routing = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<Home />} />

        {/* Protected routes */}

        {/* Wildcard route */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </>
  );
};

export default Routing;
