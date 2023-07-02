import Currency from '../../entities/Currency';

export const stateName = 'currencies';

export interface CurrenciesState {
  list: Array<string>;
  isLoading: boolean;
  available: Array<Currency>;
  isAvailableLoading: boolean;
}
