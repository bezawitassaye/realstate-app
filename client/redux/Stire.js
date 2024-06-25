// Store.js

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "./user/userSlice";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    user: userReducer,
    // other reducers if any
});

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    // Optionally add whitelist or blacklist for persisting specific reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
