import {
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import Transaction from '../entities/Transaction';

class TransactionService {
  constructor(private axios: AxiosInstance, private url: string) {
  }

  public getListByPeriod(start: string, end: string): Promise<Array<Transaction>> {
    return this.axios.get<Array<Transaction>>(`${this.url}/${start}/${end}`)
    .then((response: AxiosResponse<Array<Transaction>>): Array<Transaction> => response.data);
  }

  public getById(transactionId: number): Promise<Transaction> {
    return this.axios.get(`${this.url}/${transactionId}`)
    .then((response: AxiosResponse<Transaction>): Transaction => response.data);
  }

  public create(transaction: Transaction): Promise<Transaction> {
    return this.axios.post(`${this.url}`, transaction)
    .then((response: AxiosResponse<Transaction>): Transaction => response.data);
  }

  public update(transaction: Transaction): Promise<Transaction> {
    return this.axios.put(`${this.url}/${transaction.id}`, transaction)
    .then((response: AxiosResponse<Transaction>): Transaction => response.data);
  }

  public delete(transactionId: string): Promise<void> {
    return this.axios.delete<void>(`${this.url}/${transactionId}`)
    .then((response: AxiosResponse<void>): void => response.data);
  }
}

export default TransactionService;
