import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  Button,
  Space,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

export interface MonthSelectorProps {
  onSelect: (start: Dayjs, end: Dayjs) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  onSelect,
}: MonthSelectorProps): JSX.Element => {
  const date = useRef(dayjs());
  const [month, setMonth] = useState(date.current.format('MMMM'));
  const [year, setYear] = useState(date.current.year());

  useEffect(() => {
    onSelect(date.current.startOf('M'), date.current.endOf('M'));
  }, [date, onSelect]);

  const setState = () => {
    setMonth(date.current.format('MMMM'));
    setYear(date.current.year());
    onSelect(date.current.startOf('M'), date.current.endOf('M'));
  };

  const handlePrevMonth = () => {
    date.current = date.current.add(-1, 'month');
    setState();
  };

  const handlePrevYear = () => {
    date.current = date.current.add(-1, 'year');
    setState();
  };

  const handleNextMonth = () => {
    date.current = date.current.add(1, 'month');
    setState();
  };

  const handleNextYear = () => {
    date.current = date.current.add(1, 'year');
    setState();
  };

  return (
    <Space align="center">
      <Button
        icon={<DoubleLeftOutlined rev={0} />}
        onClick={handlePrevYear}
      />
      <Button
        icon={<LeftOutlined rev={0} />}
        onClick={handlePrevMonth}
      />
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        { month }
        &nbsp;
        { year }
      </div>
      <Button
        icon={<RightOutlined rev={0} />}
        onClick={handleNextMonth}
      />
      <Button
        icon={<DoubleRightOutlined rev={0} />}
        onClick={handleNextYear}
      />
    </Space>
  );
};

export default MonthSelector;
