import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { apiSlice, apiWithToastSlice } from './api/baseApiSlice';
import { appSlice } from './slice/appSlice';
import { groupSlice } from './slice/groupSlice';
import { modalSlice } from './slice/modalSlice';
import { statusSlice } from './slice/statusSlice';
import { tournamentSlice } from './slice/tournamentSlice';
import { userSlice } from './slice/userSlice';

const combinedReducer = combineReducers({
  app: appSlice.reducer,
  user: userSlice.reducer,
  modal: modalSlice.reducer,
  group: groupSlice.reducer,
  tournament: tournamentSlice.reducer,
  status: statusSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiWithToastSlice.reducerPath]: apiWithToastSlice.reducer,
});

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(apiWithToastSlice.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
