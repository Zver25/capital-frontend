import {
  Button,
  Modal,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React from 'react';
import Category from '../../../entities/Category';
import Transaction from '../../../entities/Transaction';
import { numberFormat } from '../../../utils';
import categoryNameById from '../../../utils/categoryNameById';
import transactionsCategorySorter from '../../../utils/transactionsCategorySorter';
import transactionsDaySorter from '../../../utils/transactionsDaySorter';

export interface MonthCategoryTransactionsProps {
  title: string;
  isOpen: boolean;
  categories: Array<Category>;
  transactions: Array<Transaction>;
  isLoading: boolean;
  onClose: () => void;
}

const MonthCategoryTransactions: React.FC<MonthCategoryTransactionsProps> = ({
  title,
  isOpen,
  categories,
  transactions,
  isLoading,
  onClose,
}: MonthCategoryTransactionsProps): JSX.Element => {
  const columns: ColumnsType<Transaction> = [
    {
      title: 'Day',
      dataIndex: 'day',
      width: 64,
      render: (_: void, transaction: Transaction): string => (
        transaction?.date
          ? dayjs(transaction?.date).format('D')
          : ''
      ),
      sorter: transactionsDaySorter,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (_: void, transaction: Transaction): string | undefined => (
        categoryNameById(categories, transaction.categoryId)
      ),
      sorter: transactionsCategorySorter(categories),
    },
    {
      title: 'Sum',
      dataIndex: 'sum',
      align: 'right',
      render: (_: void, transaction: Transaction): string => (
        `${numberFormat(transaction?.amount)} ${transaction?.currencyCode}`
      ),
      sorter: (a: Transaction, b: Transaction): number => (
        a.amount - b.amount
      ),
    },
  ];

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
      footer={(
        <Button key="back" onClick={onClose}>
          Close
        </Button>
      )}
    >
      <Table
        className="transaction-table"
        columns={columns}
        loading={isLoading}
        pagination={false}
        size="small"
        dataSource={
          transactions.map((transaction: Transaction) => ({ ...transaction, key: transaction.id }))
        }
      />
    </Modal>
  );
};

export default MonthCategoryTransactions;
