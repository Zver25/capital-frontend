import {
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import Category from '../entities/Category';

class CategoryService {
  constructor(private axios: AxiosInstance, private url: string) {}

  public getList(): Promise<Array<Category>> {
    return this.axios.get<Array<Category>>(this.url)
      .then((response: AxiosResponse<Array<Category>>) => response.data);
  }

  public getById(id: number): Promise<Category> {
    return this.axios.get(`${this.url}/${id}`)
      .then((response: AxiosResponse<Category>) => response.data);
  }

  public create(category: Category): Promise<Category> {
    return this.axios.post(this.url, category)
      .then((response: AxiosResponse<Category>) => response.data);
  }

  public update(category: Category): Promise<Category> {
    return this.axios.put(`${this.url}/${category.id}`, category)
      .then((response: AxiosResponse<Category>) => response.data);
  }

  public delete(id: number): Promise<void> {
    return this.axios.delete(`${this.url}/${id}`)
      .then((response: AxiosResponse<void>) => response.data);
  }
}

export default CategoryService;
