import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  error: false,
  errorMsg: "",
  patients: [],
  apiSuccess: false,
};

export const PatientSlice = createSlice({
  name: "patient",
  initialState: initialState,
  reducers: {
    getAllPatientsSlice: (state, action) => {
      state.patients = action.payload;
      state.loader = false;
      return state;
    },
    addPatientSlice: (state, action) => {
      state.patients = [action.payload, ...state.patients];
      state.loader = false;
      state.apiSuccess = true;
      state.error = false;
      return state;
    },
    editPatientSlice: (state, action) => {
      state.patients = state.patients.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
      state.loader = false;
      state.apiSuccess = true;
      state.error = false;
      return state;
    },
    resetPatientStateSlice: (state) => {
      state.patients = [];
      state.error = true;
      return state;
    },

    setLoaderTrue: (state) => {
      state.loader = true;
    },
    setPatientError: (state) => {
      state.error = true;
      state.loader = false;
      return state;
    },
    resetPatientError: (state) => {
      state.error = false;
      return state;
    },
    resetApiSuccess: (state) => {
      state.apiSuccess = false;
      return state;
    },
  },
});

export const {
  getAllPatientsSlice,
  resetPatientStateSlice,
  addPatientSlice,
  setPatientError,
} = PatientSlice.actions;

export default PatientSlice.reducer;
