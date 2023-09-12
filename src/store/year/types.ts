import { Dayjs } from 'dayjs';
import Transaction from '../../entities/Transaction';
import YearStatistic from '../../entities/YearStatistic';

export const stateName = 'year';

export interface YearState {
  isDataLoading: boolean;
  expense: Array<YearStatistic>;
  income: Array<YearStatistic>;
  isMonthLoading: boolean;
  month: Array<Transaction>;
}

export interface YearResponse {
  expense: Array<YearStatistic>;
  income: Array<YearStatistic>;
}

export interface CategoryMonthRequest {
  category: string;
  start: Dayjs;
  end: Dayjs;
}
