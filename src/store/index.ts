import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  AnyAction,
  combineReducers,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import categoriesSlice from './categories/slice';
import currenciesSlice from './currencies/slice';
import monthSlice from './month/slice';
import userSlice from './auth/slice';
import yearSlice from './year/slice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  currencies: currenciesSlice.reducer,
  month: monthSlice.reducer,
  categories: categoriesSlice.reducer,
  year: yearSlice.reducer,
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

export interface ThunkConfiguration {
  state: RootState;
}

export default setupStore();
