import CashItem from '../entities/CashItem';
import {
  Month,
  monthList,
} from '../entities/Month';
import YearStatistic from '../entities/YearStatistic';
import mergeCashFlow from './mergeCashFlow';

const calculateYearTotal = (statistic: Array<YearStatistic>): Omit<YearStatistic, 'categoryId'> => ({
  ...monthList
  .reduce(
    (obj, month: Month) => (
      {
        ...obj,
        [month]: statistic
        .map((yearStatistic: YearStatistic) => yearStatistic[month])
        .reduce(
          (arr: Array<CashItem>, item: Array<CashItem>): Array<CashItem> => (
            mergeCashFlow(arr, item)
          ),
          [],
        )
        ?? [],
      }),
    {} as Omit<YearStatistic, 'categoryId'>,
  ),
});

export default calculateYearTotal;
