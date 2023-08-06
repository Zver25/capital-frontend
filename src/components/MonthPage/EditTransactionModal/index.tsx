import {
  CloseCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Popover,
  Row,
  Select,
  Space,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import Category from '../../../entities/Category';
import Transaction from '../../../entities/Transaction';
import SelectCurrency from '../SelectCurrency';

export interface EditTransactionModalProps {
  isOpen: boolean;
  transaction: Transaction | null;
  categoryList: Array<Category>;
  currencyList: Array<string>;
  onCategoryCreate: (categoryName: string) => void;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  transaction,
  categoryList,
  currencyList,
  onCategoryCreate,
  onClose,
  onSave,
}: EditTransactionModalProps): JSX.Element => {
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [isNewCategoryNameError, setIsNewCategoryNameError] = useState(false);
  const [isNewCategoryPopoverOpen, setIsNewCategoryPopoverOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string>('');
  const [isCategoryInvalid, setIsCategoryInvalid] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [isAmountInvalid, setIsAmountInvalid] = useState<boolean>(false);
  const [currencyCode, setCurrencyCode] = useState<string>('');
  const [isCurrencyInvalid, setIsCurrencyInvalid] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs>(dayjs());

  useEffect((): void => {
    if (transaction) {
      setCategoryId(transaction.categoryId);
      setAmount(transaction.amount);
      setCurrencyCode(transaction.currencyCode);
      setDate(dayjs(transaction.date));
    } else {
      setCategoryId('');
      setAmount(0);
      setCurrencyCode('');
      setDate(dayjs());
    }

    setIsCategoryInvalid(false);
    setIsAmountInvalid(false);
    setIsCurrencyInvalid(false);
  }, [transaction]);

  const handleCategoryChange = (selectedCategoryId: string): void => {
    setIsCategoryInvalid(!selectedCategoryId);
    setCategoryId(selectedCategoryId);
  };

  // TODO: type any because of issue with antd and dayjs
  const handleChangeDate = (value: any | Dayjs | null): void => {
    setDate(value ?? dayjs());
  };

  const handleAmountChange = (updatedAmount: number | null = 0): void => {
    setIsAmountInvalid(updatedAmount === null || updatedAmount <= 0);
    setAmount(updatedAmount ?? 0);
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

  const handleCurrencyChange = (code: string): void => {
    setIsCurrencyInvalid(!code);
    setCurrencyCode(code);
  };

  const handleNewCategoryNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewCategoryName(event.target.value);
  };

  const validate = (): boolean => {
    const isCategoryInvalidNew: boolean = !categoryId;
    const isAmountInvalidNew: boolean = !(amount > 0);
    const isCurrencyInvalidNew: boolean = !currencyCode;

    setIsCategoryInvalid(isCategoryInvalidNew);
    setIsAmountInvalid(isAmountInvalidNew);
    setIsCurrencyInvalid(isCurrencyInvalidNew);

    return !isCurrencyInvalidNew
      && !isAmountInvalidNew
      && !isCurrencyInvalidNew;
  };

  const handleSave = (): void => {
    if (validate()) {
      onSave({
        id: transaction?.id,
        categoryId,
        amount,
        currencyCode,
        date: date?.toISOString(),
      });
    }
  };

  const handlePopoverOpenChange = (newOpen: boolean): void => {
    setIsNewCategoryPopoverOpen(newOpen);
  };

  return (
    <Modal
      title={transaction?.id ? 'Edit Transaction' : 'Create Transaction'}
      open={isOpen}
      okText="Save"
      onOk={handleSave}
      onCancel={onClose}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <DatePicker
          style={{ width: '100%' }}
          value={date}
          format="DD.MM.YYYY"
          onChange={handleChangeDate}
        />
        <Row gutter={8}>
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
          <Col flex="0 0 40px">
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
              <Button style={{ width: '100%' }} type="primary" icon={<PlusOutlined rev={undefined} />} />
            </Popover>
          </Col>
        </Row>
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
              value={currencyCode}
              onSelect={handleCurrencyChange}
            />
          )}
        />
      </Space>
    </Modal>
  );
};

export default EditTransactionModal;
