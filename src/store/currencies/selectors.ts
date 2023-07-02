import Currency from '../../entities/Currency';
import type { RootState } from '../index';

export const currencyListSelector = (state: RootState): Array<string> => (
  state.currencies.list
);

export const isCurrencyListLoadingSelector = (state: RootState): boolean => (
  state.currencies.isLoading
);

export const availableListSelector = (state: RootState): Array<Currency> => (
  state.currencies.available
);

export const isAvailableListLoadingSelector = (state: RootState): boolean => (
  state.currencies.isAvailableLoading
);
