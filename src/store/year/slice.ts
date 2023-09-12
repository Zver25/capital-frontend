import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import Transaction from '../../entities/Transaction';
import {
  fetchExpenseCategoryMonthThunk,
  fetchIncomeCategoryMonthThunk,
  fetchYearDataThunk,
} from './thunks';
import {
  stateName,
  YearResponse,
  YearState,
} from './types';

const initialState: YearState = {
  isDataLoading: false,
  expense: [],
  income: [],
  isMonthLoading: false,
  month: [],
};

const yearSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<YearState>): void => {
    builder.addCase(
      fetchYearDataThunk.pending,
      (state: YearState): YearState => ({
        ...state,
        isDataLoading: true,
      }),
    );
    builder.addCase(
      fetchYearDataThunk.fulfilled,
      (state: YearState, action: PayloadAction<YearResponse>): YearState => ({
        ...state,
        ...action.payload,
        isDataLoading: false,
      }),
    );
    builder.addCase(
      fetchYearDataThunk.rejected,
      (state: YearState): YearState => ({
        ...state,
        isDataLoading: false,
        expense: [],
        income: [],
      }),
    );

    builder.addCase(
      fetchIncomeCategoryMonthThunk.pending,
      (state: YearState): YearState => ({
        ...state,
        isMonthLoading: true,
      }),
    );
    builder.addCase(
      fetchIncomeCategoryMonthThunk.rejected,
      (state: YearState): YearState => ({
        ...state,
        isMonthLoading: false,
      }),
    );
    builder.addCase(
      fetchIncomeCategoryMonthThunk.fulfilled,
      (state: YearState, action: PayloadAction<Array<Transaction>>): YearState => ({
        ...state,
        isMonthLoading: false,
        month: action.payload,
      }),
    );

    builder.addCase(
      fetchExpenseCategoryMonthThunk.pending,
      (state: YearState): YearState => ({
        ...state,
        isMonthLoading: true,
      }),
    );
    builder.addCase(
      fetchExpenseCategoryMonthThunk.rejected,
      (state: YearState): YearState => ({
        ...state,
        isMonthLoading: false,
      }),
    );
    builder.addCase(
      fetchExpenseCategoryMonthThunk.fulfilled,
      (state: YearState, action: PayloadAction<Array<Transaction>>): YearState => ({
        ...state,
        isMonthLoading: false,
        month: action.payload,
      }),
    );
  },
});

export default yearSlice;
