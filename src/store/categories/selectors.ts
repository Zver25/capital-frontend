import Category from '../../entities/Category';
import type { RootState } from '../index';

export const expenseCategoriesSelector = (state: RootState): Array<Category> => (
  state.categories.expense
);

export const incomeCategoriesSelector = (state: RootState): Array<Category> => (
  state.categories.income
);
