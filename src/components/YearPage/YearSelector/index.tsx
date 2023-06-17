import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  Button,
  Space,
} from 'antd';
import dayjs from 'dayjs';
import React, {
  useEffect,
  useState,
} from 'react';

export interface YearSelectorProps {
  onSelect: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  onSelect,
}: YearSelectorProps): JSX.Element => {
  const [year, setYear] = useState<number>(dayjs().year());

  useEffect(() => {
    onSelect(year);
  }, [year, onSelect]);

  const handlePrevYear = () => {
    setYear((currentYear: number): number => {
      const newYear: number = currentYear - 1;

      onSelect(newYear);

      return newYear;
    });
  };

  const handleNextYear = () => {
    setYear((currentYear: number): number => {
      const newYear: number = currentYear + 1;

      onSelect(newYear);

      return newYear;
    });
  };

  return (
    <Space align="center" className="month-selector">
      <Button
        icon={<LeftOutlined rev={0} />}
        onClick={handlePrevYear}
      />
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        { year }
      </div>
      <Button
        icon={<RightOutlined rev={0} />}
        onClick={handleNextYear}
      />
    </Space>
  );
};

export default YearSelector;
