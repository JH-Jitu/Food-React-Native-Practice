import { useDispatch } from "react-redux";
import { apiSlice } from "../Context/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/Context/auth/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    dashboard: authReducer,
    // [apiSliceMicroService.reducerPath]: apiSliceMicroService.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      apiSlice.middleware
      // apiSliceMicroService.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
