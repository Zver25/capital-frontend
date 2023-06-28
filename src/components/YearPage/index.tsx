import {
  Card,
  Col,
  Row,
  Table,
} from 'antd';
import type { TableProps } from 'rc-table/lib/Table';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import './styles.scss';
import useYearPage from './useYearPage';
import YearSelector from './YearSelector';

const YearPage: React.FC = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<TableProps['scroll']>(undefined);
  const {
    columns,
    dataSource,
    handleMonthSelected,
  } = useYearPage();

  useEffect(() => {
    if (cardRef.current) {
      const bounding = cardRef.current.getBoundingClientRect();

      setScroll({
        x: bounding.width,
      });
    }
  }, [cardRef]);

  return (
    <div className="year-page">
      <Row>
        <Col span={24}>
          <Card style={{ display: 'flex', justifyContent: 'center' }}>
            <YearSelector onSelect={handleMonthSelected} />
          </Card>
        </Col>
      </Row>
      <Card
        ref={cardRef}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Table
          scroll={scroll}
          pagination={false}
          size="small"
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    </div>
  );
};

export default YearPage;
