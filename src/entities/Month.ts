export enum Month {
  JANUARY = 1,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
}

export const monthList: Array<Month> = Object
  .keys(Month)
  .map((key: string): number => Number(key))
  .filter((key: number): boolean => !Number.isNaN(key));

export const monthToString = (month: Month): string => {
  switch (month) {
    case Month.JANUARY: return 'January';
    case Month.FEBRUARY: return 'February';
    case Month.MARCH: return 'March';
    case Month.APRIL: return 'April';
    case Month.MAY: return 'May';
    case Month.JUNE: return 'June';
    case Month.JULY: return 'July';
    case Month.AUGUST: return 'August';
    case Month.SEPTEMBER: return 'September';
    case Month.OCTOBER: return 'October';
    case Month.NOVEMBER: return 'November';
    case Month.DECEMBER: return 'December';
    default: return '';
  }
};
