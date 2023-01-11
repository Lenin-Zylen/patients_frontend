import axios from "axios";

const BASE_API = process.env.REACT_APP_API_ENDPOINT;
const token = JSON.parse(localStorage.getItem("token"));

const config = {
  headers: { Authorization: `Bearer ${token}` },
  params: {},
};

export const getPatientsAPI = async () =>
  axios.get(`${BASE_API}/patients/`, config);