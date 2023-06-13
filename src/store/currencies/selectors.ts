import type { RootState } from '../index';

export const currencyListSelector = (state: RootState): Array<string> => (
  state.currencies.list
);

export const isCurrencyListLoadingSelector = (state: RootState): boolean => (
  state.currencies.isLoading
);
