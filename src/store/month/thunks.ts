import { createAsyncThunk } from '@reduxjs/toolkit';
import Transaction from '../../entities/Transaction';
import expenseService from '../../services/expenseService';
import incomeService from '../../services/incomeService';
import type { ThunkConfiguration } from '..';
import {
  MonthDataRequest,
  MonthDataResponse,
  stateName,
} from './types';

export const fetchMonthDataThunk = createAsyncThunk<
  MonthDataResponse,
  MonthDataRequest,
  ThunkConfiguration
>(
  `${stateName}/fetchMonthData`,
  ({ start, end }: MonthDataRequest): Promise<MonthDataResponse> => {
    const startStr: string = start.format('YYYY-MM-DD');
    const endStr: string = end.format('YYYY-MM-DD');

    return Promise
      .all([
        expenseService.getListByPeriod(startStr, endStr),
        incomeService.getListByPeriod(startStr, endStr),
      ])
      .then(([expenses, incomes]: [Array<Transaction>, Array<Transaction>]): MonthDataResponse => ({
        start,
        end,
        expenses,
        incomes,
      }));
  },
);

export const saveIncomeThunk = createAsyncThunk<
  Transaction,
  Transaction,
  ThunkConfiguration
>(
  `${stateName}/saveIncome`,
  (transaction: Transaction): Promise<Transaction> => (
    transaction.id
      ? incomeService.update(transaction)
      : incomeService.create(transaction)
  ),
);

export const deleteIncomeThunk = createAsyncThunk<
  string,
  string,
  ThunkConfiguration
>(
  `${stateName}/deleteIncome`,
  async (transactionId: string): Promise<string> => {
    await incomeService.delete(transactionId);

    return transactionId;
  },
);

export const saveExpenseThunk = createAsyncThunk<
  Transaction,
  Transaction,
  ThunkConfiguration
>(
  `${stateName}/saveExpense`,
  (transaction: Transaction): Promise<Transaction> => (
    transaction.id
      ? expenseService.update(transaction)
      : expenseService.create(transaction)
  ),
);
export const deleteExpenseThunk = createAsyncThunk<
  string,
  string,
  ThunkConfiguration
>(
  `${stateName}/deleteExpense`,
  async (transactionId: string): Promise<string> => {
      await expenseService.delete(transactionId);

      return transactionId;
  },
);
