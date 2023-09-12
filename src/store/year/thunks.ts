import { createAsyncThunk } from '@reduxjs/toolkit';
import Transaction from '../../entities/Transaction';
import expenseService from '../../services/expenseService';
import incomeService from '../../services/incomeService';
import reportService from '../../services/reportService';
import type { ThunkConfiguration } from '../index';
import {
  CategoryMonthRequest,
  stateName,
  YearResponse,
} from './types';

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

export const fetchIncomeCategoryMonthThunk = createAsyncThunk<
  Array<Transaction>,
  CategoryMonthRequest,
  ThunkConfiguration
>(
  `${stateName}/fetchIncomeCategoryMonth`,
  ({ category, start, end }: CategoryMonthRequest): Promise<Array<Transaction>> => (
    incomeService.getListByCategoryAndPeriod(
      category,
      start.format('YYYY-MM-DD'),
      end.format('YYYY-MM-DD'),
    )
  ),
);

export const fetchExpenseCategoryMonthThunk = createAsyncThunk<
  Array<Transaction>,
  CategoryMonthRequest,
  ThunkConfiguration
>(
  `${stateName}/fetchExpenseCategoryMonth`,
  ({ category, start, end }: CategoryMonthRequest): Promise<Array<Transaction>> => (
    expenseService.getListByCategoryAndPeriod(
      category,
      start.format('YYYY-MM-DD'),
      end.format('YYYY-MM-DD'),
    )
  ),
);
