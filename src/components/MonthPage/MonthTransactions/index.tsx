import {
  Card,
  Table,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import Category from '../../../entities/Category';
import Transaction from '../../../entities/Transaction';
import AddTransaction from '../AddTransaction';
import './styles.scss';

export interface MonthTransactionsProps {
  title: string;
  categoryList: Array<Category>;
  currencyList: Array<string>;
  transactions: Array<Transaction>;
  onCategoryCreate: (categoryName: string) => void;
  onTransactionSave: (transaction: Transaction) => void;
}

const MonthTransactions: React.FC<MonthTransactionsProps> = ({
  title,
  categoryList,
  currencyList,
  transactions,
  onCategoryCreate,
  onTransactionSave,
}: MonthTransactionsProps): JSX.Element => {
  const columns: ColumnsType<Transaction> = [
    {
      title: 'Day',
      dataIndex: 'day',
      render: (transaction: Transaction): string => (
        dayjs(transaction.date).format('D')
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (transaction: Transaction): string | undefined => (
        categoryList
          .find((category: Category):boolean => category.id === transaction.categoryId)
          ?.name
      ),
    },
    {
      title: 'Sum',
      dataIndex: 'sum',
      render: (transaction: Transaction): string => (
        `${transaction.amount} ${transaction.currencyCode}`
      ),
    },
  ];

  return (
    <Card bordered={false}>
      <h1>{title}</h1>
      <AddTransaction
        categoryList={categoryList}
        currencyList={currencyList}
        onCategoryCreate={onCategoryCreate}
        onSave={onTransactionSave}
      />
      <Table
        className="transaction-table"
        columns={columns}
        dataSource={transactions}
      />
    </Card>
  );
};

export default MonthTransactions;
