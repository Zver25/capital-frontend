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
  .filter((key: number | string) => !Number.isNaN(Number(key)))
  .map((month: any) => (month as Month));
