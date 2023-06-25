import React from 'react';
import YearStatistic from '../../entities/YearStatistic';

export default interface YearStatisticRow extends Partial<YearStatistic> {
  key: React.Key;
  isGroup: boolean;
  category: string;
  children?: Array<YearStatisticRow>;
}
