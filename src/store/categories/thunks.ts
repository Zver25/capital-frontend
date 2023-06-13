import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfiguration } from '..';
import Category from '../../entities/Category';
import expenseCategoryService from '../../services/expenseCategoryService';
import incomeCategoryService from '../../services/incomeCategoryService';
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
  Category,
  Category,
  ThunkConfiguration
>(
  `${stateName}/saveIncomeCategory`,
  (category: Category): Promise<Category> => (
    category.id
      ? incomeCategoryService.update(category)
      : incomeCategoryService.create(category)
  ),
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
  Category,
  Category,
  ThunkConfiguration
>(
  `${stateName}/saveExpenseCategory`,
  (category: Category): Promise<Category> => (
    category.id
      ? expenseCategoryService.update(category)
      : expenseCategoryService.create(category)
  ),
);
