import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    if (import.meta.env.NODE_ENV !== 'production') {
      middleware.push(logger);
    }
    return middleware;
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
