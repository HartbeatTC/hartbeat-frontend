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
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { AppDispatch } from '../store';

interface User {
  email: string | null;
  id: string;
  photoUrl: string | null;
  displayName: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: SerializedError | null;
}

// initial state of the auth slice
const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

// Async thunk for signing out
export const logoutUser = createAsyncThunk('auth/signOut', async () => {
  try {
    signOut(auth);
    return null; // This will be sent as the action payload on success (user is null)
  } catch (error) {
    throw error; // This will trigger the rejection action
  }
});

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string; displayName: string; name: string },
  { dispatch: AppDispatch }
>('auth/loginUser', async ({ email, password, displayName, name }) => {
  try {
    if (name === 'signup') {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //update display name
      await updateProfile(user, {
        displayName,
      });

      return {
        email: user.email,
        id: user.uid,
        photoUrl: user.photoURL || null,
        displayName: user.displayName || null,
      };
    } else {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      return {
        email: user.email,
        id: user.uid,
        photoUrl: user.photoURL || null,
        displayName: user.displayName || null,
      };
    }
  } catch (error) {
    throw error;
  }
});

// Create an async thunk for checking authentication state
export const checkAuthState = createAsyncThunk<User | null, void>(
  'auth/checkAuthState',
  async (_, { dispatch }) => {
    return new Promise<User | null>((resolve) => {
      // Add your onAuthStateChanged listener
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.email) {
          // If the user is authenticated, dispatch your login action
          const userData: User = {
            email: user.email || null,
            id: user.uid,
            photoUrl: user.photoURL || null,
            displayName: user.displayName || null,
          };
          console.log('authenticated');
          resolve(userData);
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
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
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

export const { login } = authSlice.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;

// export const checkAuthState = createAsyncThunk(
//   'auth/checkAuthState',
//   async (_) => {
//     // Get the current auth state
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user && user.email) {
//         return user;
//       }
//     });

//     return unsubscribe;
//   }
// );
// login: (state, action: PayloadAction<User>) => {
//   state.user = action.payload;
//   state.isLoading = false;
// },
// logout: (state) => {
//   state.user = null;
// },
