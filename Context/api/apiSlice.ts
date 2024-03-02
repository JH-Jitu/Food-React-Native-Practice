import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
import { API } from "@/helper/API";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<AxiosRequestConfig, unknown, AxiosError> =>
  async ({ url, method, data, params, headers }, { getState }) => {
    try {
      const store = getState() as RootState;
      const result = await Axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: store?.auth?.session
          ? {
              "Content-Type": "application/json",
              Accept: "*/*",
              ...store?.auth?.session,
            }
          : { "Content-Type": "application/json", Accept: "*/*" },
      });
      return { data: result };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error,
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "apiSliceWithoutMicroService",
  baseQuery: axiosBaseQuery({
    baseUrl: API,
    // baseUrl: "...",
  }),
  endpoints: () => ({}),
});
