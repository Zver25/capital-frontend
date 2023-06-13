import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchMonthDataThunk } from './thunks';
import {
  MonthDataResponse,
  MonthState,
  stateName,
} from './types';

const initialState: MonthState = {
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
  },
});

export default monthSlice;
