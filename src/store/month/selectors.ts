import Transaction from '../../entities/Transaction';
import type { RootState } from '../index';
import { MonthState } from './types';

export const expensesSelector = (state: RootState): Array<Transaction> => (
  state.month.expenses
);

export const incomesSelector = (state: RootState): Array<Transaction> => (
  state.month.incomes
);

export const startEndSelector = (state: RootState): Pick<MonthState, 'start' | 'end'> => ({
  start: state.month.start,
  end: state.month.end,
});

export const isMonthDataLoadingSelector = (state: RootState): boolean => (
  state.month.isLoading
);
