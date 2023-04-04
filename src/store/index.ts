import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  AnyAction,
  combineReducers,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import userSlice from './user/slice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export const setupStore = () => (
  configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
  })
);

export type RootState = ReturnType<typeof rootReducer>;
export type TypedAppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<TypedAppDispatch>();
