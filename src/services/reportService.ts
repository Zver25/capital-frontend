import {
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import CashItem from '../entities/CashItem';
import {
  Month,
  monthList,
} from '../entities/Month';
import YearStatistic from '../entities/YearStatistic';
import { YearResponse } from '../store/year/types';
import axiosInstance from './axiosInstance';
import {
  MonthData,
  ReportResponse,
  YearRow,
} from './payloads/ReportResponse';

class ReportService {
  private readonly url = '/api/report';

  constructor(private axios: AxiosInstance) {}

  private static mapMonthDataToCashArray = (data: MonthData): CashItem[] => (
    Object.keys(data)
    .map((currencyCode: string) => ({
      currencyCode,
      amount: data[currencyCode],
    }))
  );

  private static mapYearRowToYearStatistic = (row: YearRow): YearStatistic[] => (
    Object.keys(row)
    .map((categoryId: string): YearStatistic => ({
      categoryId,
      ...(monthList.reduce(
        (obj, month: Month): Partial<Omit<YearStatistic, 'categoryId'>> => ({
          ...obj,
          [month]: (row[categoryId][month] as MonthData)
            ? ReportService.mapMonthDataToCashArray(row[categoryId][month] as MonthData)
            : [],
        }),
        {} as Partial<Omit<YearStatistic, 'categoryId'>>,
      ) as Omit<YearStatistic, 'categoryId'>),
    }))
  );

  private static mapResponseToState = (report: ReportResponse): YearResponse => ({
    expense: ReportService.mapYearRowToYearStatistic(report.expense),
    income: ReportService.mapYearRowToYearStatistic(report.income),
  });

  public getReport(year: number): Promise<YearResponse> {
    return this.axios.get<ReportResponse>(`${this.url}/${year}`)
      .then((response: AxiosResponse<ReportResponse>): YearResponse => (
        ReportService.mapResponseToState(response.data)
      ));
  }
}

export default new ReportService(axiosInstance);
