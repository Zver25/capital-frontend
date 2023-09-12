import Category from '../entities/Category';

const categoryNameById = (categories: Array<Category>, categoryId: string): string => (
  categories
    .find((category: Category):boolean => category.id === categoryId)
      ?.name
    ?? ''
);

export default categoryNameById;
