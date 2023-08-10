import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfiguration } from '..';
import Category from '../../entities/Category';
import expenseCategoryService from '../../services/expenseCategoryService';
import incomeCategoryService from '../../services/incomeCategoryService';
import {
  expenseCategoriesSelector,
  incomeCategoriesSelector,
} from './selectors';
import { stateName } from './types';

export const fetchIncomeCategoryListThunk = createAsyncThunk<
  Array<Category>,
  void,
  ThunkConfiguration
>(
  `${stateName}/fetchIncomeCategoryList`,
  (): Promise<Array<Category>> => (
    incomeCategoryService.getList()
  ),
);

export const saveIncomeCategoryThunk = createAsyncThunk<
  Array<Category>,
  Category,
  ThunkConfiguration
>(
  `${stateName}/saveIncomeCategory`,
  (category: Category, thunkAPI): Promise<Array<Category>> => {
    const categoryPromise: Promise<Category> = category.id
      ? incomeCategoryService.update(category)
      : incomeCategoryService.create(category);

    return categoryPromise
      .then((newCategory: Category): Array<Category> => {
        const currentIncomeCategories: Array<Category> = incomeCategoriesSelector(
          thunkAPI.getState(),
        );

        return [
          ...currentIncomeCategories.filter((item: Category): boolean => (
            item.id !== newCategory.id
          )),
          newCategory,
        ];
      });
  },
);

export const fetchExpenseCategoryListThunk = createAsyncThunk<
  Array<Category>,
  void,
  ThunkConfiguration
>(
  `${stateName}/fetchExpenseCategoryList`,
  (): Promise<Array<Category>> => (
    expenseCategoryService.getList()
  ),
);

export const saveExpenseCategoryThunk = createAsyncThunk<
  Array<Category>,
  Category,
  ThunkConfiguration
>(
  `${stateName}/saveExpenseCategory`,
  (category: Category, thunkAPI): Promise<Array<Category>> => {
    const categoryPromise: Promise<Category> = category.id
      ? expenseCategoryService.update(category)
      : expenseCategoryService.create(category);

    return categoryPromise
      .then((newCategory: Category): Array<Category> => {
        const currentExpenseCategories: Array<Category> = expenseCategoriesSelector(
          thunkAPI.getState(),
        );

        return [
          ...currentExpenseCategories.filter((item: Category): boolean => (
            item.id !== newCategory.id
          )),
          newCategory,
        ];
      });
  },
);
