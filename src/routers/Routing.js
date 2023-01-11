import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home/Home";
import PatientList from "../pages/Patient/PatientList/PatientList";
import CreatePatient from "../pages/Patient/CreatePatient/CreatePatient";
import EditPatient from "../pages/Patient/EditPatient/EditPatient";

const Routing = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PatientList />} />
        <Route path="/patient" element={<PatientList />} />
        <Route path="/patient/create" element={<CreatePatient />} />
        <Route path="/patient/edit" element={<EditPatient />} />

        {/* Protected routes */}

        {/* Wildcard route */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </>
  );
};

export default Routing;
