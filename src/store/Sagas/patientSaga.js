import { put, takeEvery } from "redux-saga/effects";
import { getPatientsAPI } from "../../apis";
import {
  getAllPatientsSlice,
  resetPatientStateSlice,
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

export function* watchPatientSaga() {
  yield takeEvery(GET_ALL_PATIENTS, getPatientsSaga);
}
