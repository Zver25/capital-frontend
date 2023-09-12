import {
  Card,
  Col,
  Row,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import type { TableProps } from 'rc-table/lib/Table';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import CashItem from '../../entities/CashItem';
import {
  Month,
  monthList,
  monthToString,
} from '../../entities/Month';
import { numberFormat } from '../../utils';
import calculateCategoryTotal from '../../utils/calculateCategoryTotal';
import MonthCategoryTransactions from './MonthCategoryTransactions/MonthCategoryTransactions';
import './styles.scss';
import YearStatisticRow from './types';
import useYearPage from './useYearPage';
import YearSelector from './YearSelector';

const renderCashItem = (cashItems: Array<CashItem>): string => (
  cashItems && cashItems.length > 0
    ? cashItems
      .map((item: CashItem): string => (
        `${numberFormat(item.amount)} ${item.currencyCode}`
      ))
      .join(', ')
    : numberFormat(0)
);

const YearPage: React.FC = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<TableProps['scroll']>(undefined);
  const {
    selectedMonth,
    categories,
    dataSource,
    isCategoryMonthVisible,
    categoryMonthTransactions,
    isCategoryMonthLoading,
    handleMonthSelected,
    handleCloseModal,
  } = useYearPage();

  const columns: ColumnsType<YearStatisticRow> = [
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      width: 256,
      fixed: 'left',
    },
    ...monthList.map((month: Month) => ({
      title: monthToString(month),
      key: month,
      dataIndex: month,
      width: 128,
      render: (cashItems: Array<CashItem>, row: YearStatisticRow) => (
        cashItems.length > 0 && row.onClick
          ? (
            <div
              className="year-page__table-cell"
              role="presentation"
              onClick={() => row.onClick && row.onClick(month, row.categoryId)}
            >
              { renderCashItem(cashItems) }
            </div>
          )
          : renderCashItem(cashItems)
      ),
    })),
    {
      title: 'Total',
      key: 'total',
      width: 256,
      fixed: 'right',
      render: (_: void, row: YearStatisticRow) => (
        renderCashItem(
          calculateCategoryTotal(row),
        )
      ),
    },
  ];

  useEffect(() => {
    if (cardRef.current) {
      const bounding = cardRef.current.getBoundingClientRect();

      setScroll({
        x: bounding.width,
        y: bounding.height,
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
      <Row gutter={16} style={{ flex: 'auto 1 1' }}>
        <Col span={24}>
          <Card
            ref={cardRef}
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
              maxHeight: '100%',
            }}
          >
            <Table
              scroll={scroll}
              pagination={false}
              size="small"
              columns={columns}
              dataSource={dataSource}
            />
          </Card>
        </Col>
      </Row>
      <MonthCategoryTransactions
        title={selectedMonth}
        isOpen={isCategoryMonthVisible}
        categories={categories}
        transactions={categoryMonthTransactions}
        isLoading={isCategoryMonthLoading}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default YearPage;
