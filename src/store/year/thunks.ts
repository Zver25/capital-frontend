import { createAsyncThunk } from '@reduxjs/toolkit';
import reportService from '../../services/reportService';
import type { ThunkConfiguration } from '../index';
import {
  stateName,
  YearResponse,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchYearDataThunk = createAsyncThunk<
  YearResponse,
  number,
  ThunkConfiguration
>(
  `${stateName}/fetchYearData`,
  (year: number): Promise<YearResponse> => (
    reportService.getReport(year)
  ),
);
