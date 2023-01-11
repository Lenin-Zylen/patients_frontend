import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PATIENTS } from "./../../../store/Types/index";
import Loader from "../../../components/Loader";
import BreadCrumbs from "../../../components/BreadCrumbs/BreadCrumbs";
import PatientGrid from "./PatientGrid";

const PatientList = () => {
  const patientList = useSelector((state) => state.PatientReducer.patients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_PATIENTS });
  }, []);

  return (
    <div>
      <BreadCrumbs title="Patient" breadcrumbItem="Patient List" />
      <PatientGrid productData={patientList} />
    </div>
  );
};

export default PatientList;
