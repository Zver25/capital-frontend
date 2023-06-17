import CashItem from './CashItem';
import { Month } from './Month';

export default interface YearStatistic {
  categoryId: string;
  [Month.JANUARY]: CashItem[];
  [Month.FEBRUARY]: CashItem[];
  [Month.MARCH]: CashItem[];
  [Month.APRIL]: CashItem[];
  [Month.MAY]: CashItem[];
  [Month.JUNE]: CashItem[];
  [Month.JULY]: CashItem[];
  [Month.AUGUST]: CashItem[];
  [Month.SEPTEMBER]: CashItem[];
  [Month.OCTOBER]: CashItem[];
  [Month.NOVEMBER]: CashItem[];
  [Month.DECEMBER]: CashItem[];
}
