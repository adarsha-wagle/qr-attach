import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import appReducer from './appSlice';

import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(apiSlice.middleware),
  devTools: true,
});
