import { createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import Transaction from '../../entities/Transaction';
import expenseService from '../../services/expenseService';
import incomeService from '../../services/incomeService';
import type { ThunkConfiguration } from '..';
import {
  expensesSelector,
  incomesSelector,
  startEndSelector,
} from './selectors';
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

export const reloadMonthDataThunk = createAsyncThunk<
  MonthDataResponse,
  void,
  ThunkConfiguration
>(
  `${stateName}/reloadMonthData`,
  (_: void, thunkAPI) => {
    const { start, end } = startEndSelector(thunkAPI.getState());
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
  Array<Transaction>,
  Transaction,
  ThunkConfiguration
>(
  `${stateName}/saveIncome`,
  (transaction: Transaction, thunkAPI): Promise<Array<Transaction>> => (
    transaction.id
      ? incomeService.update(transaction)
        .then((updatedTransaction: Transaction): Array<Transaction> => (
          incomesSelector(thunkAPI.getState())
          .map((item: Transaction): Transaction => (
            item.id === updatedTransaction.id
              ? updatedTransaction
              : item
          ))
        ))
      : incomeService.create(transaction)
        .then((newTransaction: Transaction): Array<Transaction> => {
          const { start, end } = startEndSelector(thunkAPI.getState());
          const updatedIncomes = [...incomesSelector(thunkAPI.getState())];
          const newTransactionDate = dayjs(newTransaction.date);

          if (
            (start.isBefore(newTransactionDate) || start.isSame(newTransactionDate))
            && end.isAfter(newTransactionDate)
          ) {
            updatedIncomes.push(newTransaction);
          }

          return updatedIncomes;
        })
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
  Array<Transaction>,
  Transaction,
  ThunkConfiguration
>(
  `${stateName}/saveExpense`,
  (transaction: Transaction, thunkAPI): Promise<Array<Transaction>> => (
    transaction.id
      ? expenseService.update(transaction)
        .then((updatedTransaction: Transaction): Array<Transaction> => (
          expensesSelector(thunkAPI.getState())
            .map((item: Transaction): Transaction => (
              item.id === updatedTransaction.id
                ? updatedTransaction
                : item
            ))
        ))
      : expenseService.create(transaction)
        .then((newTransaction: Transaction): Array<Transaction> => {
          const { start, end } = startEndSelector(thunkAPI.getState());
          const updatedExpenses = [...expensesSelector(thunkAPI.getState())];
          const newTransactionDate = dayjs(newTransaction.date);

          if (
            (start.isBefore(newTransactionDate) || start.isSame(newTransactionDate))
            && end.isAfter(newTransactionDate)
          ) {
            updatedExpenses.push(newTransaction);
          }

          return updatedExpenses;
        })
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
