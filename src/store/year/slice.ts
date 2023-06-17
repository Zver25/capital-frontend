import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchYearDataThunk } from './thunks';
import {
  stateName,
  YearResponse,
  YearState,
} from './types';

const initialState: YearState = {
  isDataLoading: false,
  expense: [],
  income: [],
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
  },
});

export default yearSlice;
