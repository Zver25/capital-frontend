const numberFormat = (
  value: number,
  fractionDigit: number = 2,
  decimalDelimiter: string = '.',
  thousandDelimiter: string = ' ',
): string => {
  const num: string[] = value.toFixed(fractionDigit).split('.');

  return num[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousandDelimiter}`)
    + decimalDelimiter
    + num[1];
};

export default numberFormat;
