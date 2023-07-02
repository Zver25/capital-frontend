import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Currency from '../../entities/Currency';
import currencyService from '../../services/currencyService';
import type { ThunkConfiguration } from '..';
import { stateName } from './types';

export const fetchCurrencyListThunk = createAsyncThunk<
  Array<string>,
  void,
  ThunkConfiguration
>(
  `${stateName}/fetchCurrencyList`,
  (): Promise<Array<string>> => (
    currencyService.getSelected()
      .then((response) => response.data)
  ),
);

export const fetchAvailableCurrencyListThunk = createAsyncThunk<
  Array<Currency>,
  void,
  ThunkConfiguration
>(
  `${stateName}/fetchAvailableCurrencyList`,
  (): Promise<Array<Currency>> => (
    currencyService.getAvailableList()
      .then((response) => response.data)
  ),
);

export const setCurrenciesThunk = createAsyncThunk<
  Array<string>,
  Array<string>,
  ThunkConfiguration
>(
  `${stateName}/setCurrencies`,
  (currencies: Array<string>): Promise<Array<string>> => (
    currencyService.setSelected(currencies)
      .then((response: AxiosResponse<Array<string>>) => response.data)
  ),
);
