import {
  Card,
  Col,
  Row,
} from 'antd';
import { Dayjs } from 'dayjs';
import React, { useCallback } from 'react';
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
  expensesSelector,
  incomesSelector,
} from '../../store/month/selectors';
import {
  fetchMonthDataThunk,
  saveExpenseThunk,
  saveIncomeThunk,
} from '../../store/month/thunks';
import MonthSelector from './MonthSelector';
import MonthTransactions from './MonthTransactions';

const MonthPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currencyList: Array<string> = useSelector(currencyListSelector);
  const expenseCategories: Array<Category> = useSelector(expenseCategoriesSelector);
  const expenses: Array<Transaction> = useSelector(expensesSelector);
  const incomeCategories: Array<Category> = useSelector(incomeCategoriesSelector);
  const incomes: Array<Transaction> = useSelector(incomesSelector);

  const handleMonthSelected = useCallback(
    (start: Dayjs, end: Dayjs): void => {
      dispatch(fetchMonthDataThunk({ start, end }));
    },
    [dispatch],
  );

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
    <>
      <Row>
        <Col span={24}>
          <Card style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <MonthSelector
              onSelect={handleMonthSelected}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <MonthTransactions
            title="Expense"
            currencyList={currencyList}
            categoryList={expenseCategories}
            transactions={expenses}
            onCategoryCreate={handleExpenseCategoryCreate}
            onTransactionSave={handleExpenseTransactionSave}
          />
        </Col>
        <Col span={12}>
          <MonthTransactions
            title="Income"
            currencyList={currencyList}
            categoryList={incomeCategories}
            transactions={incomes}
            onCategoryCreate={handleIncomeCategoryCreate}
            onTransactionSave={handleIncomeTransactionSave}
          />
        </Col>
      </Row>
    </>
  );
};

export default MonthPage;
