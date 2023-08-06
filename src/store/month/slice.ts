import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import Transaction from '../../entities/Transaction';
import {
  deleteExpenseThunk,
  deleteIncomeThunk,
  fetchMonthDataThunk,
  reloadMonthDataThunk,
  saveExpenseThunk,
  saveIncomeThunk,
} from './thunks';
import {
  MonthDataResponse,
  MonthState,
  stateName,
} from './types';

const initialState: MonthState = {
  start: dayjs().startOf('M'),
  end: dayjs().endOf('M'),
  expenses: [],
  incomes: [],
  isLoading: false,
};

const monthSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<MonthState>): void => {
    builder.addCase(
      fetchMonthDataThunk.pending,
      (state: MonthState): MonthState => ({
        ...state,
        isLoading: true,
      }),
    );
    builder.addCase(
      fetchMonthDataThunk.fulfilled,
      (state: MonthState, action: PayloadAction<MonthDataResponse>): MonthState => ({
        ...state,
        ...action.payload,
        isLoading: false,
      }),
    );

    builder.addCase(
      reloadMonthDataThunk.pending,
      (state: MonthState): MonthState => ({
        ...state,
        isLoading: true,
      }),
    );
    builder.addCase(
      reloadMonthDataThunk.fulfilled,
      (state: MonthState, action: PayloadAction<MonthDataResponse>): MonthState => ({
        ...state,
        ...action.payload,
        isLoading: false,
      }),
    );

    builder.addCase(
      deleteExpenseThunk.fulfilled,
      (state: MonthState, action: PayloadAction<string>): MonthState => ({
        ...state,
        expenses: state.expenses.filter((expense: Transaction) => expense.id !== action.payload),
      }),
    );

    builder.addCase(
      deleteIncomeThunk.fulfilled,
      (state: MonthState, action: PayloadAction<string>): MonthState => ({
        ...state,
        incomes: state.incomes.filter((income: Transaction) => income.id !== action.payload),
      }),
    );

    builder.addCase(
      saveExpenseThunk.fulfilled,
      (state: MonthState, action: PayloadAction<Transaction[]>): MonthState => ({
        ...state,
        expenses: action.payload,
      }),
    );
    builder.addCase(
      saveIncomeThunk.fulfilled,
      (state: MonthState, action: PayloadAction<Transaction[]>): MonthState => ({
        ...state,
        incomes: action.payload,
      }),
    );
  },
});

export default monthSlice;
