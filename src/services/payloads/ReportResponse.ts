import { Month } from '../../entities/Month';

export interface ReportResponse {
  income: YearRow;
  expense: YearRow;
}

export interface YearRow {
  [categoryId: string]: MonthRow;
}

export type MonthRow = {
  [monthId in Month]?: MonthData;
};

export interface MonthData {
  [currencyCode: string]: number;
}
