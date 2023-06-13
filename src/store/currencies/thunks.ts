import { createAsyncThunk } from '@reduxjs/toolkit';
import currencyService from '../../services/currencyService';
import type { ThunkConfiguration } from '..';
import { stateName } from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchCurrencyListThunk = createAsyncThunk<
  Array<string>,
  void,
  ThunkConfiguration
>(
  `${stateName}/fetchCurrencyList`,
  (): Promise<Array<string>> => (
    currencyService.getList()
      .then((response) => response.data)
  ),
);
