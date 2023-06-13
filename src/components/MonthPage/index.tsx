import {
  Col,
  Row,
} from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import Category from '../../entities/Category';
import Transaction from '../../entities/Transaction';
import { useAppDispatch } from '../../store';
import {
  expenseCategoriesSelector,
  incomeCategoriesSelector,
} from '../../store/categories/selectors';
import {
  saveExpenseCategoryThunk,
  saveIncomeCategoryThunk,
} from '../../store/categories/thunks';
import { currencyListSelector } from '../../store/currencies/selectors';
import {
  saveExpenseThunk,
  saveIncomeThunk,
} from '../../store/month/thunks';
import MonthTransactions from './MonthTransactions';

const MonthPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currencyList: Array<string> = useSelector(currencyListSelector);
  const expenseCategories: Array<Category> = useSelector(expenseCategoriesSelector);
  const incomeCategories: Array<Category> = useSelector(incomeCategoriesSelector);

  const handleExpenseCategoryCreate = (categoryName: string): void => {
    dispatch(saveExpenseCategoryThunk({
      name: categoryName,
    }));
  };
  const handleIncomeCategoryCreate = (categoryName: string): void => {
    dispatch(saveIncomeCategoryThunk({
      name: categoryName,
    }));
  };

  const handleExpenseTransactionSave = (transaction: Transaction): void => {
    dispatch(saveExpenseThunk(transaction));
  };

  const handleIncomeTransactionSave = (transaction: Transaction): void => {
    dispatch(saveIncomeThunk(transaction));
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <MonthTransactions
          title="Expense"
          currencyList={currencyList}
          categoryList={expenseCategories}
          transactions={[]}
          onCategoryCreate={handleExpenseCategoryCreate}
          onTransactionSave={handleExpenseTransactionSave}
        />
      </Col>
      <Col span={12}>
        <MonthTransactions
          title="Income"
          currencyList={currencyList}
          categoryList={incomeCategories}
          transactions={[]}
          onCategoryCreate={handleIncomeCategoryCreate}
          onTransactionSave={handleIncomeTransactionSave}
        />
      </Col>
    </Row>
  );
};

export default MonthPage;
