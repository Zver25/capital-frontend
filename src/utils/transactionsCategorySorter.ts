import Category from '../entities/Category';
import Transaction from '../entities/Transaction';
import categoryNameById from './categoryNameById';

const transactionsCategorySorter = (categories: Array<Category>) => (
  (a: Transaction, b: Transaction): number => {
    const aCategoryName: string = categoryNameById(categories, a.categoryId);
    const bCategoryName: string = categoryNameById(categories, b.categoryId);

    return aCategoryName.localeCompare(bCategoryName);
  }
);

export default transactionsCategorySorter;
