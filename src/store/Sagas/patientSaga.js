import { put, takeEvery } from "redux-saga/effects";
import { getPatientsAPI, createPatientsAPI } from "../../apis";
import {
  getAllPatientsSlice,
  resetPatientStateSlice,
  addPatientSlice,
  setPatientError,
} from "../Slices/PatientSlice";
import { GET_ALL_PATIENTS, CREATE_PATIENT, EDIT_PATIENTS } from "../Types";
import { toast } from "react-toastify";

export function* getPatientsSaga() {
  try {
    const clients = yield getPatientsAPI();
    yield put(getAllPatientsSlice(clients.data));
  } catch (error) {
    console.error(error);
    if (typeof error.response.data.messages === "object") {
      yield put(resetPatientStateSlice());
      error.response.data.messages.map((item) => {
        return toast.error(`${item.message} `);
      });
    } else if (
      typeof error.response.data.message === "undefined" ||
      typeof error.response.data === "undefined"
    ) {
      toast.error(error.message);
      yield put(resetPatientStateSlice());
    }
    toast.error(error.response.data.message);
    yield put(resetPatientStateSlice());
  }
}

export function* createPatientSaga(action) {
  try {
    console.log(action.payload, "<---------------");
    const response = yield createPatientsAPI(action.payload);
    yield put(addPatientSlice(response.data));
    toast.success("Patient Added Sucessfully");
  } catch (error) {
    console.error(error);

    if (
      typeof error.response.data !== "undefined" &&
      typeof error.response.data.messages === "object"
    ) {
      yield put(setPatientError());
      error.response.data.messages.map((item) => {
        return toast.error(`${item.message} `);
      });
    } else if (
      typeof error.response.data === "undefined" ||
      typeof error.response.data.message === "undefined"
    ) {
      toast.error(error.message);
      yield put(setPatientError());
    } else {
      toast.error(error.response.data.message);
      yield put(setPatientError());
    }
  }
}

export function* watchPatientSaga() {
  yield takeEvery(GET_ALL_PATIENTS, getPatientsSaga);
  yield takeEvery(CREATE_PATIENT, createPatientSaga);
}
