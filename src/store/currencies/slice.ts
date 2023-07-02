import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import Currency from '../../entities/Currency';
import {
  fetchAvailableCurrencyListThunk,
  fetchCurrencyListThunk,
  setCurrenciesThunk,
} from './thunks';
import {
  CurrenciesState,
  stateName,
} from './types';

const initialState: CurrenciesState = {
  list: [],
  isLoading: false,
  available: [],
  isAvailableLoading: false,
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

    builder.addCase(
      fetchAvailableCurrencyListThunk.pending,
      (state: CurrenciesState): CurrenciesState => ({
        ...state,
        isAvailableLoading: true,
      }),
    );
    builder.addCase(
      fetchAvailableCurrencyListThunk.fulfilled,
      (state: CurrenciesState, action: PayloadAction<Array<Currency>>): CurrenciesState => ({
        ...state,
        available: action.payload,
        isAvailableLoading: false,
      }),
    );

    builder.addCase(
      setCurrenciesThunk.fulfilled,
      (state: CurrenciesState, action: PayloadAction<Array<string>>): CurrenciesState => ({
        ...state,
        list: action.payload,
      }),
    );
  },
});

export default currenciesSlice;
