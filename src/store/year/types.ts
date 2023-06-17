import YearStatistic from '../../entities/YearStatistic';

export const stateName = 'year';

export interface YearState {
  isDataLoading: boolean;
  expense: Array<YearStatistic>;
  income: Array<YearStatistic>;
}

export interface YearResponse {
  expense: Array<YearStatistic>;
  income: Array<YearStatistic>;
}
