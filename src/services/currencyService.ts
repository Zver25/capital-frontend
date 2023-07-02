import {
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import Currency from '../entities/Currency';
import axiosInstance from './axiosInstance';

class CurrencyService {
  private readonly url = '/api/currency';

  constructor(private axios: AxiosInstance) {
  }

  public getSelected(): Promise<AxiosResponse<Array<string>>> {
    return this.axios.get<Array<string>>(this.url);
  }

  public getAvailableList(): Promise<AxiosResponse<Array<Currency>>> {
    return this.axios.get(`${this.url}/available`);
  }

  public setSelected(currencies: Array<string>): Promise<AxiosResponse<Array<string>>> {
    return this.axios.post(`${this.url}`, currencies);
  }
}

export default new CurrencyService(axiosInstance);
