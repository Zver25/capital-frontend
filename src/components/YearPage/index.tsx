import {
  Card,
  Col,
  Row,
  Table,
} from 'antd';
import React from 'react';
import './styles.scss';
import useYearPage from './useYearPage';
import YearSelector from './YearSelector';

const YearPage: React.FC = (): JSX.Element => {
  const {
    columns,
    dataSource,
    handleMonthSelected,
  } = useYearPage();

  return (
    <div className="year-page">
      <Row>
        <Col span={24}>
          <Card style={{ display: 'flex', justifyContent: 'center' }}>
            <YearSelector onSelect={handleMonthSelected} />
          </Card>
        </Col>
      </Row>
      <Card style={{ display: 'flex', justifyContent: 'center' }}>
        <Table
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    </div>
  );
};

export default YearPage;
