import Transaction from '../../entities/Transaction';
import { RootState } from '../index';

export const expensesSelector = (state: RootState): Array<Transaction> => (
  state.month.expenses
);

export const incomesSelector = (state: RootState): Array<Transaction> => (
  state.month.incomes
);

export const isMonthDataLoadingSelector = (state: RootState): boolean => (
  state.month.isLoading
);
