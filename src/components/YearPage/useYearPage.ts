import { ColumnsType } from 'antd/es/table';
import {
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import CashItem from '../../entities/CashItem';
import { Month } from '../../entities/Month';
import YearStatistic from '../../entities/YearStatistic';
import { useAppDispatch } from '../../store';
import {
  expenseCategoriesSelector,
  incomeCategoriesSelector,
} from '../../store/categories/selectors';
import {
  yearExpenseSelector,
  yearIncomeSelector,
} from '../../store/year/selectors';
import { fetchYearDataThunk } from '../../store/year/thunks';
import {
  categoryName,
  numberFormat,
} from '../../utils';

const renderCashItem = (cashItems: Array<CashItem>): string => (
  cashItems
    ? cashItems
    .map((item: CashItem): string => (
      `${numberFormat(item.amount)} ${item.currencyCode}`
    ))
    .join(', ')
    : numberFormat(0)
);
const useYearPage = () => {
  const dispatch = useAppDispatch();
  const expenseCategories = useSelector(expenseCategoriesSelector);
  const incomeCategories = useSelector(incomeCategoriesSelector);
  const yearExpense = useSelector(yearExpenseSelector);
  const yearIncome = useSelector(yearIncomeSelector);
  const [dataSource, setDataSource] = useState<Array<YearStatistic>>();

  useEffect(() => {
    setDataSource([
      ...yearIncome.map((yearItem) => ({
        ...yearItem,
        category: categoryName(yearItem.categoryId, incomeCategories),
      })),
      ...yearExpense.map((yearItem) => ({
        ...yearItem,
        category: categoryName(yearItem.categoryId, incomeCategories),
      })),
    ]);
  }, [yearIncome, yearExpense, incomeCategories, expenseCategories]);

  const columns: ColumnsType<YearStatistic> = [
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      fixed: 'left',
    },
    {
      title: 'January',
      key: Month.JANUARY,
      dataIndex: Month.JANUARY,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'February',
      key: Month.FEBRUARY,
      dataIndex: Month.FEBRUARY,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'March',
      key: Month.MARCH,
      dataIndex: Month.MARCH,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'April',
      key: Month.APRIL,
      dataIndex: Month.APRIL,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'May',
      key: Month.MAY,
      dataIndex: Month.MAY,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'June',
      key: Month.JUNE,
      dataIndex: Month.JUNE,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'July',
      key: Month.JULY,
      dataIndex: Month.JULY,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'August',
      key: Month.AUGUST,
      dataIndex: Month.AUGUST,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'September',
      key: Month.SEPTEMBER,
      dataIndex: Month.SEPTEMBER,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'October',
      key: Month.OCTOBER,
      dataIndex: Month.OCTOBER,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'November',
      key: Month.NOVEMBER,
      dataIndex: Month.NOVEMBER,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
    {
      title: 'December',
      key: Month.DECEMBER,
      dataIndex: Month.DECEMBER,
      width: 150,
      render: (cashItems: Array<CashItem>) => renderCashItem(cashItems),
    },
  ];

  const handleMonthSelected = (year: number): void => {
    dispatch(fetchYearDataThunk(year));
  };

  return {
    columns,
    dataSource,
    handleMonthSelected,
  };
};

export default useYearPage;
