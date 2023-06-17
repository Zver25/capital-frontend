import Category from '../entities/Category';

const categoryName = (categoryId: string, categories: Array<Category>): string => {
  const category: Category | undefined = categories
  .find((c: Category): boolean => c.id === categoryId);

  return category?.name ?? '';
};

export default categoryName;
