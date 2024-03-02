import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  session: undefined,
  user: undefined,
  fullUser: undefined,
  role: undefined,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    useLoggedin: (state, action) => {
      state.session = action.payload.session;
      state.user = action.payload.user;
    },
    useLogout: (state) => {
      const removeSession = async () => {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
      };
      removeSession();
      state.session = undefined;
      state.user = undefined;
      state.fullUser = undefined;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateFullUser: (state, action) => {
      state.fullUser = action.payload;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    // updateRole: (state, action) => {
    //   const formatRole = (role: any) => {
    //     return {
    //       ...role,
    //       permission: role.is_member,
    //       role_permissions: {
    //         is_member: role.is_member,
    //         master_owner: role.team_member.master_owner,
    //         owner:
    //           role.team_member.master_owner ||
    //           role.team_member.permission === "owner",
    //         admin: role.team_member.permission === "admin",
    //         manager: role.team_member.permission === "manager",
    //         marketer:
    //           role.team_member.permission === "owner" ||
    //           role.team_member.roles.includes("marketer"),
    //         recruiter:
    //           role.team_member.permission === "owner" ||
    //           role.team_member.roles.includes("recruiter"),
    //         hiring_manager: role.team_member.roles.includes("hiring_manager"),
    //         business:
    //           role.team_member.permission === "owner" ||
    //           role.team_member.roles.includes("business"),
    //       },
    //     };
    //   };
    //   state.role = formatRole(action.payload);
    // },
  },
});

export const {
  useLoggedin,
  useLogout,
  updateUser,
  updateFullUser,
  updateLoading,
  updateRole,
} = authSlice.actions;
export default authSlice.reducer;
