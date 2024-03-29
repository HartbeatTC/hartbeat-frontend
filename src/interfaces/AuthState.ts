import { SerializedError } from '@reduxjs/toolkit';
import { User } from './User';
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: SerializedError | null;
}
