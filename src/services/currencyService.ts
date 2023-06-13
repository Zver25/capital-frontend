import {
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import axiosInstance from './axiosInstance';

class CurrencyService {
  private readonly url = '/api/currency';

  constructor(private axios: AxiosInstance) {
  }

  public getList(): Promise<AxiosResponse<Array<string>>> {
    return this.axios.get<Array<string>>(this.url);
  }
}

export default new CurrencyService(axiosInstance);
