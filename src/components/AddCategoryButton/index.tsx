import { CloseCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Input,
  Popover,
  Space,
} from 'antd';
import React, {
  ChangeEvent,
  useState,
} from 'react';

export interface AddCategoryButtonProps {
  children: React.ReactNode;
  onCategoryCreate: (categoryName: string) => void;
}

const AddCategoryButton: React.FC<AddCategoryButtonProps> = ({
  children,
  onCategoryCreate,
}: AddCategoryButtonProps): JSX.Element => {
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [isNewCategoryNameError, setIsNewCategoryNameError] = useState(false);
  const [isNewCategoryPopoverOpen, setIsNewCategoryPopoverOpen] = useState(false);

  const handleNewCategoryNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewCategoryName(event.target.value);
  };

  const handleCreateCategory = (): void => {
    const categoryName: string = newCategoryName.trim();
    const newError: boolean = !categoryName;

    if (newError) {
      setIsNewCategoryNameError(newError);
      return;
    }

    setNewCategoryName('');
    setIsNewCategoryPopoverOpen(false);
    setIsNewCategoryNameError(newError);

    onCategoryCreate(categoryName);
  };

  const handlePopoverOpenChange = (newOpen: boolean): void => {
    setIsNewCategoryPopoverOpen(newOpen);
  };

  return (
    <Popover
      title={(
        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
          <div style={{ lineHeight: '32px' }}>New category name</div>
          <Button type="link" onClick={() => setIsNewCategoryPopoverOpen(false)}>
            <CloseCircleOutlined rev={undefined} />
          </Button>
        </div>
      )}
      open={isNewCategoryPopoverOpen}
      placement="bottomRight"
      trigger="click"
      content={(
        <Space>
          <Input
            value={newCategoryName}
            status={isNewCategoryNameError ? 'error' : ''}
            onChange={handleNewCategoryNameChange}
          />
          <Button type="primary" onClick={handleCreateCategory}>Add</Button>
        </Space>
      )}
      onOpenChange={handlePopoverOpenChange}
    >
      {children}
    </Popover>
  );
};

export default AddCategoryButton;
