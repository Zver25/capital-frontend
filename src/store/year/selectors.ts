import Transaction from '../../entities/Transaction';
import YearStatistic from '../../entities/YearStatistic';
import type { RootState } from '../index';

export const yearIncomeSelector = (state: RootState): Array<YearStatistic> => (
  state.year.income
);

export const yearExpenseSelector = (state: RootState): Array<YearStatistic> => (
  state.year.expense
);

export const categoryMonthTransactionsSelector = (state: RootState): Array<Transaction> => (
  state.year.month
);

export const isCategoryMonthLoadingSelector = (state: RootState): boolean => (
  state.year.isMonthLoading
);
