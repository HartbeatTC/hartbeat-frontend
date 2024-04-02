import { SerializedError } from '@reduxjs/toolkit';
import { User } from './IUser';
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: SerializedError | null;
}
