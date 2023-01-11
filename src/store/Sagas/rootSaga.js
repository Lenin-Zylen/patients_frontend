import { all } from "redux-saga/effects";
import { watchPatientSaga } from "./patientSaga";

export function* watcherSaga() {
  yield all([watchPatientSaga()]);
}
