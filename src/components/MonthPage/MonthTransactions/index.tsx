import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Space,
  Table,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Category from '../../../entities/Category';
import Transaction from '../../../entities/Transaction';
import './styles.scss';
import EditTransactionModal from '../EditTransactionModal';

export interface MonthTransactionsProps {
  title: string;
  categoryList: Array<Category>;
  currencyList: Array<string>;
  transactions: Array<Transaction>;
  onCategoryCreate: (categoryName: string) => void;
  onTransactionSave: (transaction: Transaction) => void;
  onTransactionDelete: (transactionId: string) => void;
}

const MonthTransactions: React.FC<MonthTransactionsProps> = ({
  title,
  categoryList,
  currencyList,
  transactions,
  onCategoryCreate,
  onTransactionSave,
  onTransactionDelete,
}: MonthTransactionsProps): JSX.Element => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleTransactionEdit = (transaction: Transaction): void => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleTransactionDelete = (transaction: Transaction): void => {
    if (transaction?.id) {
      onTransactionDelete(transaction.id);
    }
  };

  const handleTransactionAdd = (): void => {
    setIsEditModalOpen(true);
    setSelectedTransaction(null);
  };

  const handleTransactionSave = (transaction: Transaction): void => {
    setIsEditModalOpen(false);
    onTransactionSave(transaction);
  };

  const categoryNameById = (categoryId: string): string => (
    categoryList
      .find((category: Category):boolean => category.id === categoryId)
        ?.name
    ?? ''
  );

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
      sorter: (a: Transaction, b: Transaction): number => a.date.localeCompare(b.date),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (_: void, transaction: Transaction): string | undefined => (
        categoryNameById(transaction.categoryId)
      ),
      sorter: (a: Transaction, b: Transaction): number => {
        const aCategoryName: string = categoryNameById(a.categoryId);
        const bCategoryName: string = categoryNameById(b.categoryId);

        return aCategoryName.localeCompare(bCategoryName);
      },
    },
    {
      title: 'Sum',
      dataIndex: 'sum',
      render: (_: void, transaction: Transaction): string => (
        `${transaction?.amount} ${transaction?.currencyCode}`
      ),
      sorter: (a: Transaction, b: Transaction): number => (
        a.amount - b.amount
      ),
    },
    {
      title: 'Actions',
      width: 88,
      dataIndex: 'actions',
      render: (_: void, transaction: Transaction): JSX.Element => (
        <Space style={{ gap: '8px' }}>
          <Button
            type="primary"
            ghost
            shape="circle"
            icon={<EditOutlined rev={0} />}
            onClick={() => handleTransactionEdit(transaction)}
          />
          <Button
            type="primary"
            danger
            ghost
            shape="circle"
            icon={<DeleteOutlined rev={0} />}
            onClick={() => handleTransactionDelete(transaction)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ height: '100%', maxHeight: '100%' }}>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <Button type="primary" onClick={handleTransactionAdd}>Add</Button>
      </Space>
      <Table
        className="transaction-table"
        columns={columns}
        pagination={false}
        size="small"
        dataSource={
          transactions.map((transaction: Transaction) => ({ ...transaction, key: transaction.id }))
        }
      />
      <EditTransactionModal
        isOpen={isEditModalOpen}
        transaction={selectedTransaction}
        categoryList={categoryList}
        currencyList={currencyList}
        onCategoryCreate={onCategoryCreate}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleTransactionSave}
      />
    </Card>
  );
};

export default MonthTransactions;
