import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Popover,
  Row,
  Select,
  Space,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import Category from '../../../entities/Category';
import Transaction from '../../../entities/Transaction';
import './styles.scss';
import SelectCurrency from '../SelectCurrency';

export interface AddTransactionProps {
  categoryList: Array<Category>;
  currencyList: Array<string>;
  onCategoryCreate: (categoryName: string) => void;
  onSave: (transaction: Transaction) => void;
}
const AddTransaction: React.FC<AddTransactionProps> = ({
  categoryList,
  currencyList,
  onCategoryCreate,
  onSave,
}: AddTransactionProps): JSX.Element => {
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [isCategoryInvalid, setIsCategoryInvalid] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [isAmountInvalid, setIsAmountInvalid] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>('');
  const [isCurrencyInvalid, setIsCurrencyInvalid] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<Dayjs>(dayjs());
  const actionTitle = 'Add';

  const handleCategoryChange = (selectedCategoryId: string): void => {
    setIsCategoryInvalid(!selectedCategoryId);
    setCategoryId(selectedCategoryId);
  };

  const handleChangeDate = (day: Dayjs | null): void => {
    setDateValue(day ?? dayjs());
  };

  const handleAmountChange = (updatedAmount: number | null = 0): void => {
    setIsAmountInvalid(updatedAmount === null || updatedAmount <= 0);
    setAmount(updatedAmount ?? 0);
  };

  const handleCreateCategory = (): void => {
    onCategoryCreate(newCategoryName);
    setNewCategoryName('');
  };

  const handleCurrencyChange = (code: string): void => {
    setIsCurrencyInvalid(!code);
    setCurrency(code);
  };

  const handleSave = (): void => {
    if (categoryId) {
      onSave({
        categoryId,
        amount,
        currencyCode: currency,
        date: dateValue.toISOString(),
      });
    }
  };

  return (
    <Row gutter={8}>
      <Col span={5}>
        <DatePicker style={{ width: '100%' }} value={dateValue} onChange={handleChangeDate} />
      </Col>
      <Col span={8}>
        <Row>
          <Col flex="1 1 auto">
            <Select
              style={{ width: '100%' }}
              placeholder="Select a category"
              status={isCategoryInvalid ? 'error' : ''}
              value={categoryId}
              onChange={handleCategoryChange}
            >
              {
                categoryList.map((categoryItem: Category) => (
                  <Select.Option key={categoryItem.id} value={categoryItem.id}>
                    { categoryItem.name }
                  </Select.Option>
                ))
              }
            </Select>
          </Col>
          <Col flex="0 0 32px">
            <Popover
              title="New category"
              content={(
                <Space>
                  <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <Button type="primary" onClick={handleCreateCategory}>Add</Button>
                </Space>
              )}
              trigger="click"
            >
              <Button style={{ width: '100%' }} type="primary" icon={<PlusOutlined rev={undefined} />} />
            </Popover>
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Enter amount"
          status={isAmountInvalid ? 'error' : ''}
          value={amount}
          onChange={handleAmountChange}
          addonAfter={(
            <SelectCurrency
              list={currencyList}
              isError={isCurrencyInvalid}
              value={currency}
              onSelect={handleCurrencyChange}
            />
          )}
        />
      </Col>
      <Col span={3}>
        <Button style={{ width: '100%' }} type="primary" onClick={handleSave}>{ actionTitle }</Button>
      </Col>
    </Row>
  );
};

export default AddTransaction;
