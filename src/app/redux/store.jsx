import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import layoutReducer from './slices/layoutSlice'
import authReducer from "./slices/loginSlice";
import taskTypeReducer from "./slices/taskType"
import taskInputReducer from "./slices/inputSlice"
import taskReducer from "./slices/taskSlice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth', 'task']
};

const rootReducer = combineReducers({
    layout: layoutReducer,
    auth: authReducer,
    taskType: taskTypeReducer,
    taskInput: taskInputReducer,
    task: taskReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => []
});

export const persistor = persistStore(store);
