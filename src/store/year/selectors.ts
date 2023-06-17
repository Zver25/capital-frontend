import YearStatistic from '../../entities/YearStatistic';
import type { RootState } from '../index';

export const yearIncomeSelector = (state: RootState): Array<YearStatistic> => (
  state.year.income
);

export const yearExpenseSelector = (state: RootState): Array<YearStatistic> => (
  state.year.expense
);
