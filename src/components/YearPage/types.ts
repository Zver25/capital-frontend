import React from 'react';
import { Month } from '../../entities/Month';
import YearStatistic from '../../entities/YearStatistic';

export default interface YearStatisticRow extends YearStatistic {
  key: React.Key;
  isGroup: boolean;
  category: string;
  children?: Array<YearStatisticRow>;
  onClick?: (month: Month, categoryId: string) => void;
}
