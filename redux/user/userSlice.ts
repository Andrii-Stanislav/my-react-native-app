import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../types";

import { signUp, signIn, isLoggedIn, signOutUser } from "./userOperations";

interface UserState {
  userInfo: UserData;
}

const initialState: UserState = {
  userInfo: {
    uid: "",
    email: "",
    displayName: "",
    profilePhoto: "",
    isAuth: false,
    isLoading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getCurrentUser: (state, action: PayloadAction<UserState["userInfo"]>) => {
      state.userInfo.isLoading = false;
      state.userInfo.uid = action.payload.uid;
      state.userInfo.email = action.payload.email;
      state.userInfo.displayName = action.payload.displayName;
      state.userInfo.profilePhoto = action.payload?.photoURL;
      state.userInfo.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.userInfo.isLoading = true;
        state.userInfo.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.userInfo.isLoading = false;
        state.userInfo.uid = action.payload?.uid ?? "";
        state.userInfo.email = action.payload?.email ?? "";
        state.userInfo.displayName = action.payload?.displayName;
        state.userInfo.profilePhoto = action.payload?.photoURL;
        state.userInfo.isAuth = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.userInfo.isLoading = false;
        state.userInfo.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.userInfo.isLoading = true;
        state.userInfo.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.userInfo.isLoading = false;
        state.userInfo.isAuth = true;
        state.userInfo.uid = action?.payload?.uid;
        state.userInfo.email = action?.payload?.email;
        state.userInfo.displayName = action?.payload?.displayName;
        state.userInfo.profilePhoto = action?.payload?.photoURL;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.userInfo.isLoading = false;
        state.userInfo.error = action.payload;
      })

      .addCase(signOutUser.pending, (state) => {
        state.userInfo.isLoading = true;
        state.userInfo.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.userInfo.isLoading = false;
        state.userInfo.isAuth = false;
        state.userInfo.profilePhoto = null;
        state.userInfo.email = null;
        state.userInfo.uid = null;
        state.userInfo.displayName = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.userInfo.isLoading = false;
        state.userInfo.error = action.payload;
      })
      .addCase(isLoggedIn.pending, (state) => {
        state.userInfo.isLoading = true;
        state.userInfo.error = null;
      })
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.userInfo.isLoading = false;
        state.userInfo.isAuth = true;
        state.userInfo.email = action.payload.email;
        state.userInfo.displayName = action.payload.displayName;
        state.userInfo.uid = action.payload.uid;
        state.userInfo.profilePhoto = action.payload.profilePhoto;
      })
      .addCase(isLoggedIn.rejected, (state, action) => {
        console.log("rejected isLoggedIn", action);
        state.userInfo.isLoading = false;
        state.userInfo.error = action.payload;
      });
  },
});

export const { getCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
