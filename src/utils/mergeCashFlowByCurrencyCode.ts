import CashItem from '../entities/CashItem';
import deepClone from './deepClone';

const mergeCashFlowByCurrencyCode = (
  source: Array<CashItem>,
  target: Array<CashItem>,
): Array<CashItem> => {
  const result: CashItem[] = deepClone(target);

  source.forEach((item: CashItem): void => {
    const targetItem: CashItem | undefined = result.find((i: CashItem): boolean => (
      i.currencyCode === item.currencyCode
    ));

    if (targetItem) {
      targetItem.amount += item.amount;
    } else {
      result.push(item);
    }
  });

  return result;
};

export default mergeCashFlowByCurrencyCode;
