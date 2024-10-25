import {configureStore} from '@reduxjs/toolkit';
import bookmarkNewsReducer from './reducer';

export const store = configureStore({
  reducer: bookmarkNewsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
