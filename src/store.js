import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store/Reducer";
import createSagaMiddleware from "@redux-saga/core";
import { watcherSaga } from "./store/Sagas/rootSaga";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.CUSTOM_NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export const persistor = persistStore(store);
sagaMiddleware.run(watcherSaga);
