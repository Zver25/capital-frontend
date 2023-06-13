import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchCurrencyListThunk } from './thunks';
import {
  CurrenciesState,
  stateName,
} from './types';

const initialState: CurrenciesState = {
  list: [],
  isLoading: false,
};

const currenciesSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CurrenciesState>): void => {
    builder.addCase(
      fetchCurrencyListThunk.pending,
      (state: CurrenciesState): CurrenciesState => ({
        ...state,
        isLoading: true,
      }),
    );
    builder.addCase(
      fetchCurrencyListThunk.rejected,
      (state: CurrenciesState): CurrenciesState => ({
        ...state,
        isLoading: false,
        list: [],
      }),
    );
    builder.addCase(
      fetchCurrencyListThunk.fulfilled,
      (state: CurrenciesState, action: PayloadAction<Array<string>>): CurrenciesState => ({
        ...state,
        isLoading: false,
        list: action.payload,
      }),
    );
  },
});

export default currenciesSlice;
