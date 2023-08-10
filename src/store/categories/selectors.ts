import { createSelector } from '@reduxjs/toolkit';
import Category from '../../entities/Category';
import type { RootState } from '../index';

export const expenseCategoriesSelector = (state: RootState): Array<Category> => (
  state.categories.expense
);

export const expenseSortedCategoriesSelector = createSelector(
  expenseCategoriesSelector,
  (categories: Array<Category>): Array<Category> => (
    [...categories].sort((a: Category, b: Category): number => a.name.localeCompare(b.name))
  ),
);

export const expenseEnabledSortedCategoriesSelector = createSelector(
  expenseCategoriesSelector,
  (categories: Array<Category>): Array<Category> => (
    [...categories]
      .filter((category: Category): boolean => !category.disabled)
      .sort((a: Category, b: Category): number => a.name.localeCompare(b.name))
  ),
);

export const incomeCategoriesSelector = (state: RootState): Array<Category> => (
  state.categories.income
);

export const incomeSortedCategoriesSelector = createSelector(
  incomeCategoriesSelector,
  (categories: Array<Category>): Array<Category> => (
    [...categories].sort((a: Category, b: Category): number => a.name.localeCompare(b.name))
  ),
);

export const incomeEnabledSortedCategoriesSelector = createSelector(
  incomeCategoriesSelector,
  (categories: Array<Category>): Array<Category> => (
    [...categories]
      .filter((category: Category): boolean => !category.disabled)
      .sort((a: Category, b: Category): number => a.name.localeCompare(b.name))
  ),
);
