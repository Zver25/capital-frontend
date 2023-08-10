import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  List,
} from 'antd';
import clsx from 'clsx';
import React, { ChangeEvent } from 'react';
import Category from '../../../entities/Category';
import './styles.scss';

export interface CategoryEditorProps {
  category: Category;
  editCategory: Category | undefined;
  onEditCategorySelect: (category: Category | undefined) => void;
  onEditCategoryEnable: (category: Category) => void;
  onEditCategoryDisable: (category: Category) => void;
  onEditCategoryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEditCategorySave: () => void;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({
  category,
  editCategory,
  onEditCategorySelect,
  onEditCategoryEnable,
  onEditCategoryDisable,
  onEditCategoryChange,
  onEditCategorySave,
}: CategoryEditorProps): JSX.Element => (
  <List.Item className="category-editor__item">
    {
      category.id === editCategory?.id
        ? <Input value={editCategory?.name} onChange={onEditCategoryChange} />
        : (
          <div
            className={clsx(
              'category-editor__item-text',
              category.disabled ? ' category-editor__item-text_disabled' : '',
            )}
          >
            {category.name}
          </div>
        )
    }
    <div
      className="category-editor__item-actions"
    >
      {
        category.id === editCategory?.id
          ? (
            <>
              <Button
                type="primary"
                shape="circle"
                icon={<UndoOutlined rev={undefined} />}
                onClick={() => onEditCategorySelect(undefined)}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<CheckOutlined rev={undefined} />}
                onClick={onEditCategorySave}
              />
            </>
          )
          : (
            <>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined rev={undefined} />}
                onClick={() => onEditCategorySelect(category)}
              />
              {
                category.disabled
                  ? (
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<CheckOutlined rev={undefined} />}
                      onClick={() => onEditCategoryEnable(category)}
                    />
                  )
                  : (
                    <Button
                      type="primary"
                      danger
                      shape="circle"
                      icon={<CloseOutlined rev={undefined} />}
                      onClick={() => onEditCategoryDisable(category)}
                    />
                  )
              }
            </>
          )
      }
    </div>
  </List.Item>
);

export default CategoryEditor;
