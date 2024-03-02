import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../api/apiSlice";
import {
  updateFullUser,
  updateLoading,
  updateRole,
  updateUser,
  useLoggedin,
  useLogout,
} from "./authSlice";
import { Alert } from "react-native";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login in user
    login: builder.mutation({
      query: (credentials: { password: string; email: string }) => ({
        method: "POST",
        url: "/v2/professional_auth/sign_in",
        data: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // const result = await queryFulfilled;
          // const session = {
          //   "Content-Type": "application/json",
          //   "access-token": result.data.headers.get("access-token"),
          //   client: result.data.headers.get("client"),
          //   expiry: result.data.headers.get("expiry"),
          //   tokenType: result.data.headers.get("token-type"),
          //   uid: result.data.headers.get("uid"),
          //   ...result.data.data.data,
          //   name: undefined,
          // };
          // if (result.data.status === 200) {
          //   dispatch(useLoggedin({ session, user: result.data.data }));
          //   await AsyncStorage.setItem("session", JSON.stringify(session));
          // } else {
          //   alert("Unable to login.");
          // }
          if (
            arg?.email === "jitu000166@gmail.com" &&
            arg?.password === "123456"
          ) {
            dispatch(
              useLoggedin({
                user: {
                  name: "Jitu",
                  email: "jitu000166@gmail.com",
                  role: "admin",
                },
                session: {
                  name: "Jitu",
                  email: "jitu000166@gmail.com",
                  role: "admin",
                },
              })
            );
            console.log("Ran!!!");
          }
        } catch (error: any) {
          alert("Unable to login.");
        }
      },
    }),
    // user info after login
    fetchUser: builder.query({
      query: (payload: any) => ({
        url: `/v2/professionals/${payload?.username}`,
        method: "GET",
        headers: payload,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateUser(result.data.data));
        } catch (error) {
          dispatch(useLogout());
          alert("Unable to fetch user info. Try again later");
          // alert(JSON.stringify(error?.error?.data?.errors[0]));
        }
      },
    }),
    // user info after login
    fetchUserFull: builder.query({
      query: (payload: any) => {
        // console.log({ checkk: payload });
        return {
          url: `/v1/professionals/${payload?.username}`,
          method: "GET",
          headers: payload,
        };
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // log(result.data.data);
          dispatch(updateFullUser(result.data.data));
        } catch (error) {
          dispatch(useLogout());
          // alert("Unable to fetch user info. Try again later");
          // alert(JSON.stringify(error?.error?.data?.errors[0]));
          log("log error", error?.error?.data);
        }
      },
    }),
    // forgot password
    forgotPass: builder.query({
      query: (payload: any) => ({
        url: `/professional_auth/password?email=${payload}`,
        method: "POST",
        body: JSON.stringify({ email: payload }),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.data?.success) {
            Alert.alert(
              "Success!",
              JSON.stringify(result?.data?.data?.message)
            );
          } else {
            Alert.alert("Error!", JSON.stringify("Unable to send Email"));
          }
          // console.log({ result }, "This is user data");
        } catch (error) {
          // console.log(error, "this is error ");
          // alert(JSON.stringify(error?.error?.data?.errors[0]));
          Alert.alert("Error!", JSON.stringify("Unable to send Email"));
        }
      },
    }),
    editPassword: builder.mutation({
      query: ({ passInfo }) => ({
        url: `/professional_auth/password`,
        // url: `/v1/talent_network/11940/update_status/15650`,
        data: passInfo,
        method: "PUT",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateLoading(false));
          alert(result?.data?.data?.message);
        } catch (error) {
          // pathResult.undo();
          // alert("There was an error updating the Candidate Status");

          dispatch(updateLoading(false));
          if (arg?.passInfo?.password?.length < 8) {
            alert("Password must be at least 8 characters");
          } else if (
            arg?.passInfo?.password !== arg?.passInfo?.password_confirmation
          ) {
            alert("Password and Confirmed Password didn't match!");
          } else {
            alert("There was a problem updating the password!");
          }
          log("this is error", error);
        }
      },
    }),

    editUserInfo: builder.mutation({
      query: ({ payloadForUserInfo, id }) => ({
        url: `/v1/professionals/${id}`,
        // url: `/v1/talent_network/11940/update_status/15650`,
        data: { professional: payloadForUserInfo },
        method: "PUT",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateFullUser(result?.data?.data));
          // log("user info updated", result?.data?.data);
          dispatch(updateLoading(false));
          alert("User information updated Successfully!");
        } catch (error) {
          // pathResult.undo();
          dispatch(updateLoading(false));
          alert("There was a problem updating the User Info!");
          log("this is error", error);
        }
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLazyFetchUserQuery,
  useLazyFetchUserFullQuery,
  useLazyForgotPassQuery,
  useLazyFetchRoleQuery,
  useEditPasswordMutation,
  useEditUserInfoMutation,
} = authApi;
