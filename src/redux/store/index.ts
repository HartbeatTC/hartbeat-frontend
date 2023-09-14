/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

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
