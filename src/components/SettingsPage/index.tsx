import {
  Button,
  Card,
  Col,
  Row,
  Transfer,
} from 'antd';
import React, {
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import Category from '../../entities/Category';
import Currency from '../../entities/Currency';
import { useAppDispatch } from '../../store';
import {
  expenseSortedCategoriesSelector,
  incomeSortedCategoriesSelector,
} from '../../store/categories/selectors';
import {
  saveExpenseCategoryThunk,
  saveIncomeCategoryThunk,
} from '../../store/categories/thunks';
import {
  availableListSelector,
  currencyListSelector,
} from '../../store/currencies/selectors';
import {
  fetchAvailableCurrencyListThunk,
  fetchCurrencyListThunk,
  setCurrenciesThunk,
} from '../../store/currencies/thunks';
import stringIncludesCaseInsensitive from '../../utils/stringIncludesCaseInsensitive';
import CategoriesEditor from './CategoriesEditor';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const SettingsPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const availableCurrencies = useSelector(availableListSelector);
  const currencies = useSelector(currencyListSelector);
  const expenseCategories = useSelector(expenseSortedCategoriesSelector);
  const incomeCategories = useSelector(incomeSortedCategoriesSelector);
  const [currenciesSource, setCurrenciesSource] = useState<Array<RecordType>>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<Array<string>>([]);
  const [targetCurrencies, setTargetCurrencies] = useState<Array<string>>([]);

  useEffect(() => {
    dispatch(fetchAvailableCurrencyListThunk());
    dispatch(fetchCurrencyListThunk());
  }, [dispatch]);

  useEffect(() => {
    setCurrenciesSource(
      availableCurrencies.map((currency: Currency): RecordType => ({
        key: currency.code,
        title: currency.code,
        description: currency.name,
      })),
    );
    setTargetCurrencies(currencies);
  }, [availableCurrencies, currencies]);

  const filterOption = (inputValue: string, option: RecordType): boolean => (
    stringIncludesCaseInsensitive(option.key, inputValue)
      || stringIncludesCaseInsensitive(option.description, inputValue)
  );

  const handleChange = (nextTargetKeys: string[]): void => {
    setTargetCurrencies(nextTargetKeys);
  };

  const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]): void => {
    setSelectedCurrencies([
      ...sourceSelectedKeys,
      ...targetSelectedKeys,
    ]);
  };

  const handleCurrenciesSave = (): void => {
    dispatch(setCurrenciesThunk(targetCurrencies));
  };

  const handleExpenseCategoryCreate = (categoryName: string): void => {
    dispatch(saveExpenseCategoryThunk({
      name: categoryName,
      disabled: false,
    }));
  };

  const handleExpenseCategoryChange = (category: Category): void => {
    dispatch(saveExpenseCategoryThunk(category));
  };

  const handleIncomeCategoryCreate = (categoryName: string): void => {
    dispatch(saveIncomeCategoryThunk({
      name: categoryName,
      disabled: false,
    }));
  };

  const handleIncomeCategoryChange = (category: Category): void => {
    dispatch(saveIncomeCategoryThunk(category));
  };

  return (
    <div className="settings-page">
      <Row>
        <Col span={24}>
          <Card>
            <h2>Currencies</h2>
            <p>Choose currency you will work with.</p>
            <Transfer
              dataSource={currenciesSource}
              showSearch
              filterOption={filterOption}
              titles={['Available', 'Selected']}
              targetKeys={targetCurrencies}
              selectedKeys={selectedCurrencies}
              listStyle={{
                width: 300,
                height: 350,
              }}
              onChange={handleChange}
              onSelectChange={handleSelectChange}
              render={(item: RecordType): string => (
                `(${item.title}) ${item.description}`
              )}
            />
            <Button
              type="primary"
              style={{ marginTop: '16px' }}
              onClick={handleCurrenciesSave}
            >
              Save
            </Button>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ flex: 'auto 1 1', marginTop: '16px' }}>
        <Col span={12}>
          <CategoriesEditor
            title="Expense Categories"
            categories={expenseCategories}
            onChange={handleExpenseCategoryChange}
            onCategoryCreate={handleExpenseCategoryCreate}
          />
        </Col>
        <Col span={12}>
          <CategoriesEditor
            title="Income Categories"
            categories={incomeCategories}
            onChange={handleIncomeCategoryChange}
            onCategoryCreate={handleIncomeCategoryCreate}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
