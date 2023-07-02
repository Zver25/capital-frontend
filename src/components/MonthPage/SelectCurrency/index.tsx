import { Select } from 'antd';
import React from 'react';

interface SelectCurrencyProps {
  list: Array<string>;
  value: string;
  isError?: boolean;
  onSelect: (code: string) => void;
}

const SelectCurrency: React.FC<SelectCurrencyProps> = ({
  list,
  value,
  isError,
  onSelect,
}: SelectCurrencyProps): JSX.Element => (
  <Select
    defaultActiveFirstOption
    style={{ width: 80 }}
    status={isError ? 'error' : ''}
    value={value}
    onChange={onSelect}
  >
    {
      list.map((currency: string): JSX.Element => (
        <Select.Option
          key={currency}
          value={currency}
        >
          {currency}
        </Select.Option>
      ))
    }
  </Select>
);

SelectCurrency.defaultProps = {
  isError: false,
};

export default SelectCurrency;
