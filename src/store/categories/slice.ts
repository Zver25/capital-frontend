import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import Category from '../../entities/Category';
import {
  fetchExpenseCategoryListThunk,
  fetchIncomeCategoryListThunk,
  saveExpenseCategoryThunk,
  saveIncomeCategoryThunk,
} from './thunks';
import {
  CategoriesState,
  stateName,
} from './types';

const initialState: CategoriesState = {
  income: [],
  expense: [],
};

const categoriesSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CategoriesState>):void => {
    builder.addCase(
      fetchExpenseCategoryListThunk.fulfilled,
      (state: CategoriesState, action: PayloadAction<Array<Category>>): CategoriesState => ({
        ...state,
        expense: action.payload,
      }),
    );
    builder.addCase(
      fetchIncomeCategoryListThunk.fulfilled,
      (state: CategoriesState, action: PayloadAction<Array<Category>>): CategoriesState => ({
        ...state,
        income: action.payload,
      }),
    );
    builder.addCase(
      saveExpenseCategoryThunk.fulfilled,
      (state: CategoriesState, action: PayloadAction<Array<Category>>): CategoriesState => ({
        ...state,
        expense: action.payload,
      }),
    );
    builder.addCase(
      saveIncomeCategoryThunk.fulfilled,
      (state: CategoriesState, action: PayloadAction<Array<Category>>): CategoriesState => ({
        ...state,
        income: action.payload,
      }),
    );
  },
});

export default categoriesSlice;
