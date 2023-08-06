import { Dayjs } from 'dayjs';
import Transaction from '../../entities/Transaction';

export const stateName = 'month';

export interface MonthState {
  start: Dayjs;
  end: Dayjs;
  expenses: Transaction[];
  incomes: Transaction[];
  isLoading: boolean;
}

export interface MonthDataRequest {
  start: Dayjs;
  end: Dayjs;
}

export interface MonthDataResponse {
  start: Dayjs;
  end: Dayjs;
  expenses: Transaction[];
  incomes: Transaction[];
}
