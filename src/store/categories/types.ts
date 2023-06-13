import Category from '../../entities/Category';

export const stateName = 'categories';

export interface CategoriesState {
  income: Array<Category>;
  expense: Array<Category>;
}
