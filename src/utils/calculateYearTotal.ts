import CashItem from '../entities/CashItem';
import {
  Month,
  monthList,
} from '../entities/Month';
import YearStatistic from '../entities/YearStatistic';
import mergeCashFlowByCurrencyCode from './mergeCashFlowByCurrencyCode';

const calculateYearTotal = (statistic: Array<YearStatistic>): Omit<YearStatistic, 'categoryId'> => ({
  ...monthList
    .reduce(
      (obj, month: Month) => ({
        ...obj,
        [month]: statistic
          .map((yearStatistic: YearStatistic): Array<CashItem> => yearStatistic[month])
          .reduce(
            (arr: Array<CashItem>, item: Array<CashItem>): Array<CashItem> => (
              mergeCashFlowByCurrencyCode(arr, item)
            ),
            [],
          )
          ?? [],
      }),
      {} as Omit<YearStatistic, 'categoryId'>,
    ),
});

export default calculateYearTotal;
