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
import Currency from '../../entities/Currency';
import { useAppDispatch } from '../../store';
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

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const SettingsPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const availableCurrencies = useSelector(availableListSelector);
  const currencies = useSelector(currencyListSelector);
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
    </div>
  );
};

export default SettingsPage;
