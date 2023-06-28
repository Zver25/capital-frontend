import React from 'react';
import YearStatistic from '../../entities/YearStatistic';

export default interface YearStatisticRow extends YearStatistic {
  key: React.Key;
  isGroup: boolean;
  category: string;
  children?: Array<YearStatisticRow>;
}
