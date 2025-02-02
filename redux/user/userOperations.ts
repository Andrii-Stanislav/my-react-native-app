import { createAsyncThunk } from "@reduxjs/toolkit";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, getUser } from "../../firebase/firestore";
import { auth } from "../../firebase/config";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data: { email: string; password: string; displayName: string }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      const user = auth.currentUser;

      if (!user) return;

      // const url =
      //   data.profilePhoto &&
      //   (await uploadPhoto(data.profilePhoto, "avatars", uid));

      await addUser(user.uid, {
        uid: user.uid,
        email: data.email || "",
        displayName: data?.displayName || "",
      });

      return { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const signIn = createAsyncThunk("auth/signIn", async (data: { email: string; password: string }, thunkAPI) => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = auth.currentUser;

    if (!user) return;

    const userData = await getUser(user.uid);

    return userData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.message);
  }
});

export const signOutUser = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const isLoggedIn = createAsyncThunk("auth/isLoggedIn", async (_, thunkAPI) => {
  try {
    let uid = null;
    let email: string | null = null;
    let displayName: string | null = null;
    let profilePhoto: string | null = null;

    await onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);

      if (user) {
        uid = user.uid;
        email = user.email;
        displayName = user.displayName;
        profilePhoto = user.photoURL;
      }
    });

    if (!email) {
      return thunkAPI.rejectWithValue("Don't have user email");
    }

    return { displayName, email, profilePhoto, uid };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
