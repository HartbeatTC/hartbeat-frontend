import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
  UserCredential,
  updateProfile,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';

const auth = getAuth();

interface AuthParams {
  email: string;
  password: string;
  displayName: string;
}

interface AuthState {
  user: firebase.User | null;
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
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password, displayName }: AuthParams) => {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName });

      return user.toJSON() as AuthResponse;
    } catch (error) {
      console.log('Error signing up user: ', error);
      throw error;
    }
  }
);

// signInUser async function
export const signInUser = createAsyncThunk<AuthResponse, AuthParams>(
  'auth/signInUser',
  async ({ email, password }: AuthParams) => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user.toJSON() as AuthResponse;
    } catch (error) {
      console.log('Error signing in user: ', error);
      throw error;
    }
  }
);

// Async thunk for signing out
export const logout = createAsyncThunk('auth/signOut', async () => {
  try {
    signOut(auth);
    return null; // This will be sent as the action payload on success (user is null)
  } catch (error) {
    throw error; // This will trigger the rejection action
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user || null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;