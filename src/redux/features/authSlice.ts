/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  UserCredential,
  updateProfile,
  getAuth,
} from 'firebase/auth';
import { auth } from '../../firebase';
import firebase from 'firebase/compat/app';
import { AppDispatch } from '../store';

interface AuthParams {
  email: string;
  password: string;
  displayName: string;
}
interface User {
  email: string;
  id: string;
  photoUrl: string | null;
  displayName: string | null;
}

interface SignInParams {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: SerializedError | null;
}

interface AuthResponse {
  user: firebase.User | null;
}

// initial state of the auth slice
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// fetchUser async function
export const fetchUser = createAsyncThunk<AuthResponse>(
  'auth/fetchUser',
  async () => {
    try {
      const user = await new Promise<firebase.User | null>(
        (resolve, reject) => {
          onAuthStateChanged(
            auth,
            (user) => {
              if (user) {
                resolve(user as firebase.User);
              } else {
                resolve(null);
              }
            },
            reject
          );
        }
      );
      return { user: user ? user.toJSON() : null } as AuthResponse;
    } catch (error) {
      console.log('Error getting user: ', error);
      throw error;
    }
  }
);

// signUpUser async function
export const signUpUser = createAsyncThunk<
  AuthResponse,
  AuthParams,
  { dispatch: AppDispatch }
>('auth/signUpUser', async ({ email, password, displayName }) => {
  console.log('env in signUpUser', import.meta.env.VITE_FIREBASE_KEY);
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName });

    console.log('user: ', user);
    return user.toJSON() as AuthResponse;
  } catch (error) {
    console.log('Error signing up user: ', error);
    throw error;
  }
});

// signInUser async function
export const signInUser = createAsyncThunk<
  AuthResponse,
  SignInParams,
  { dispatch: AppDispatch }
>('auth/signInUser', async ({ email, password }) => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log('user: ', user);
    return user.toJSON() as AuthResponse;
  } catch (error) {
    console.log('Error signing in user: ', error);
    throw error;
  }
});

// Async thunk for signing out
// export const logout = createAsyncThunk('auth/signOut', async () => {
//   const auth = getAuth();
//   try {
//     signOut(auth);
//     return null; // This will be sent as the action payload on success (user is null)
//   } catch (error) {
//     throw error; // This will trigger the rejection action
//   }
// });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUser.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(fetchUser.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.user = action.payload?.user || null;
  //     })
  //     .addCase(fetchUser.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.error;
  //     })
  //     .addCase(signUpUser.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(signUpUser.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.user = action.payload.user;
  //     })
  //     .addCase(signUpUser.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.error;
  //     })
  //     .addCase(signInUser.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(signInUser.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.user = action.payload.user;
  //     })
  //     .addCase(signInUser.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.error;
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //       state.user = null;
  //     });
  // },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
