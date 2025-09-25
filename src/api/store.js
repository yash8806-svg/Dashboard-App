import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import userReducer from "./userSlice"

export const store =  configureStore({
    reducer :{
        users:userReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
});