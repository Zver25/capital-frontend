import dayjs, { Dayjs } from 'dayjs';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import Category from '../../entities/Category';
import {
  Month,
  monthToString,
} from '../../entities/Month';
import YearStatistic from '../../entities/YearStatistic';
import { useAppDispatch } from '../../store';
import {
  expenseCategoriesSelector,
  incomeCategoriesSelector,
} from '../../store/categories/selectors';
import {
  categoryMonthTransactionsSelector,
  isCategoryMonthLoadingSelector,
  yearExpenseSelector,
  yearIncomeSelector,
} from '../../store/year/selectors';
import {
  fetchExpenseCategoryMonthThunk,
  fetchIncomeCategoryMonthThunk,
  fetchYearDataThunk,
} from '../../store/year/thunks';
import { categoryName } from '../../utils';
import calculateYearTotal from '../../utils/calculateYearTotal';
import deepClone from '../../utils/deepClone';
import YearStatisticRow from './types';

const useYearPage = () => {
  const dispatch = useAppDispatch();
  const expenseCategories = useSelector(expenseCategoriesSelector);
  const incomeCategories = useSelector(incomeCategoriesSelector);
  const yearExpense = useSelector(yearExpenseSelector);
  const yearIncome = useSelector(yearIncomeSelector);
  const categoryMonthTransactions = useSelector(categoryMonthTransactionsSelector);
  const isCategoryMonthLoading = useSelector(isCategoryMonthLoadingSelector);
  const year = useRef<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [isCategoryMonthVisible, setIsCategoryMonthVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Array<YearStatisticRow>>([]);

  const handleCloseModal = () => {
    setIsCategoryMonthVisible(false);
  };

  useEffect(() => {
    const handleIncomeShowModal = (month: Month, categoryId: string) => {
      const start: Dayjs = dayjs().date(1).month(month - 1).year(year.current);

      setIsCategoryMonthVisible(true);
      setCategories(incomeCategories);
      setSelectedMonth(monthToString(month));
      dispatch(fetchIncomeCategoryMonthThunk({
        category: categoryId,
        start,
        end: start.endOf('M'),
      }));
    };
    const handleExpenseShowModal = (month: Month, categoryId: string) => {
      const start: Dayjs = dayjs().date(1).month(month - 1).year(year.current);

      setIsCategoryMonthVisible(true);
      setCategories(expenseCategories);
      setSelectedMonth(monthToString(month));
      dispatch(fetchExpenseCategoryMonthThunk({
        category: categoryId,
        start,
        end: start.endOf('M'),
      }));
    };

    setDataSource([
      {
        isGroup: true,
        key: 'income',
        categoryId: '',
        category: 'Income',
        ...calculateYearTotal(deepClone(yearIncome)),
        children: yearIncome.map((yearItem: YearStatistic): YearStatisticRow => ({
          ...yearItem,
          isGroup: false,
          key: yearItem.categoryId,
          category: categoryName(yearItem.categoryId, incomeCategories),
          onClick: handleIncomeShowModal,
        })),
      },
      {
        isGroup: true,
        key: 'expense',
        categoryId: '',
        category: 'Expense',
        ...calculateYearTotal(deepClone(yearExpense)),
        children: yearExpense.map((yearItem: YearStatistic): YearStatisticRow => ({
          ...yearItem,
          isGroup: false,
          key: yearItem.categoryId,
          category: categoryName(yearItem.categoryId, expenseCategories),
          onClick: handleExpenseShowModal,
        })),
      },
    ]);
  }, [
    dispatch,
    yearIncome,
    yearExpense,
    incomeCategories,
    expenseCategories,
  ]);

  const handleMonthSelected = useCallback(
    (value: number): void => {
      year.current = value;
      dispatch(fetchYearDataThunk(value));
    },
  [dispatch],
  );

  return {
    categories,
    selectedMonth,
    dataSource,
    isCategoryMonthVisible,
    categoryMonthTransactions,
    isCategoryMonthLoading,
    handleMonthSelected,
    handleCloseModal,
  };
};

export default useYearPage;
