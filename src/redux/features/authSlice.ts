/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
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
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import { AppDispatch } from '../store';
import { AuthState } from '../../interfaces/AuthState';
import { User } from '../../interfaces/IUser';

// initial state of the auth slice
const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

// Async thunk for signing out
export const logoutUser = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string; displayName: string; name: string },
  { dispatch: AppDispatch }
>('auth/loginUser', async ({ email, password, displayName, name }) => {
  try {
    if (name === 'signup') {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('user credential', userCredential);
      console.log('auth', auth);
      const user = userCredential.user;

      // if user email is naguila.mandich@gmail.com then make user an admin

      //update display name
      await updateProfile(user, {
        displayName,
      });

      const userData = {
        email: user.email || null,
        photoUrl: user.photoURL || null,
        displayName: user.displayName || null,
      };

      const idToken = await auth.currentUser?.getIdToken();
      console.log('TOKEN HERE', idToken);

      const response = await axios.get('http://localhost:8080/auth/signedIn', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      console.log('response data!', response.data);

      return userData;
    } else {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('user credential', userCredential);
      console.log('auth', auth);

      const user = userCredential.user;
      const userData = {
        email: user.email || null,
        photoUrl: user.photoURL || null,
        displayName: user.displayName || null,
      };

      const idToken = await auth.currentUser?.getIdToken();
      console.log('TOKEN HERE', idToken);

      const response = await axios.get('http://localhost:8080/auth/signedIn', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      console.log('response data!', response.data);

      return userData;
    }
  } catch (error) {
    throw error;
  }
});

// Create an async thunk for checking authentication state
export const checkAuthState = createAsyncThunk<User | null, void>(
  'auth/checkAuthState',
  async (_) => {
    return new Promise<User | null>((resolve) => {
      // Add your onAuthStateChanged listener
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user && user.email) {
          try {
            // If the user is authenticated, dispatch your login action
            const idToken = await user.getIdToken();
            console.log('TOKEN HERE', idToken);

            // const response = await axios.get(
            //   'http://localhost:8080/auth/signedIn',
            //   {
            //     headers: {
            //       Authorization: `Bearer ${idToken}`,
            //     },
            //   }
            // );

            // console.log('response data!', response.data);

            const userData: User = {
              email: user.email || null,
              photoUrl: user.photoURL || null,
              displayName: user.displayName || null,
            };
            console.log('authenticated');
            resolve(userData);
          } catch (error) {
            throw error;
          }
        } else {
          // If the user is not authenticated, resolve with null
          console.log('not authenticated');
          resolve(null);
        }
      });
      // Return the unsubscribe function for cleanup
      return () => unsubscribe();
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login: (state, action: PayloadAction<User>) => {
    //   state.user = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(checkAuthState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuthState.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
});

// export const { login } = authSlice.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
