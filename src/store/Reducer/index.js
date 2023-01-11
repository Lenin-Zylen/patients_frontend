import { combineReducers } from "redux";
import PatientReducer from "../Slices/PatientSlice";

export const rootReducer = combineReducers({
  PatientReducer,
});
