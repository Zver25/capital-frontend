import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfiguration } from '../index';
import {
  stateName,
  YearResponse,
} from './types';

/* eslint-disable */
export const fetchYearDataThunk = createAsyncThunk<
  YearResponse,
  number,
  ThunkConfiguration
>(
  `${stateName}/fetchYearData`,
  (year: number): Promise<YearResponse> => {
    return Promise.resolve({
      expense: [],
      income: [],
    });
  },
);
