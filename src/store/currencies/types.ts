export const stateName = 'currencies';

export interface CurrenciesState {
  list: Array<string>;
  isLoading: boolean;
}
