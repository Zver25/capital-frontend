import {
  Button,
  Card,
  List,
  Space,
} from 'antd';
import React, {
  ChangeEvent,
  useState,
} from 'react';
import Category from '../../../entities/Category';
import AddCategoryButton from '../../AddCategoryButton';
import CategoryEditor from '../CategoryEditor';

export interface CategoriesEditorProps {
  title: string;
  categories: Array<Category>;
  onCategoryCreate: (categoryName: string) => void;
  onChange: (category: Category) => void;
}

const CategoriesEditor: React.FC<CategoriesEditorProps> = ({
  title,
  categories,
  onCategoryCreate,
  onChange,
}: CategoriesEditorProps): JSX.Element => {
  const [editCategory, setEditCategory] = useState<Category | undefined>(undefined);

  const handleEditCategoryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEditCategory((currentCategory: Category | undefined): Category | undefined => (
      currentCategory
        ? {
          ...currentCategory,
          name: event.target.value,
        }
        : currentCategory
    ));
  };

  const handleEditCategorySave = (): void => {
    if (editCategory) {
      onChange(editCategory);
    }

    setEditCategory(undefined);
  };

  const handleCategoryEnable = (category: Category): void => {
    onChange({
      ...category,
      disabled: false,
    });
  };

  const handleCategoryDisable = (category: Category): void => {
    onChange({
      ...category,
      disabled: true,
    });
  };

  return (
    <Card style={{ height: '100%', maxHeight: '100%' }}>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <h2>{title}</h2>
        <AddCategoryButton onCategoryCreate={onCategoryCreate}>
          <Button type="primary">Add</Button>
        </AddCategoryButton>
      </Space>
      <List
        bordered
        dataSource={categories}
        renderItem={
          (category: Category): JSX.Element => (
            <CategoryEditor
              category={category}
              editCategory={editCategory}
              onEditCategorySelect={setEditCategory}
              onEditCategoryChange={handleEditCategoryChange}
              onEditCategoryEnable={handleCategoryEnable}
              onEditCategoryDisable={handleCategoryDisable}
              onEditCategorySave={handleEditCategorySave}
            />
          )
        }
      />
    </Card>
  );
};

export default CategoriesEditor;
