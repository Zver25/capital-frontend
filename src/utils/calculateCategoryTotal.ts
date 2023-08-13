import YearStatisticRow from '../components/YearPage/types';
import CashItem from '../entities/CashItem';
import {
  Month,
  monthList,
} from '../entities/Month';
import mergeCashFlowByCurrencyCode from './mergeCashFlowByCurrencyCode';

const calculateCategoryTotal = (row: YearStatisticRow): Array<CashItem> => (
  monthList
    .map((month: Month): Array<CashItem> => row[month])
    .reduce(
      (arr: Array<CashItem>, monthCash: Array<CashItem>): Array<CashItem> => (
        mergeCashFlowByCurrencyCode(monthCash, arr)
      ),
      [],
    )
);

export default calculateCategoryTotal;
