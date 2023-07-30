import React, {
  useEffect,
  useState,
} from 'react';
import { useAppDispatch } from '../../store';
import {
  fetchExpenseCategoryListThunk,
  fetchIncomeCategoryListThunk,
} from '../../store/categories/thunks';
import { fetchCurrencyListThunk } from '../../store/currencies/thunks';
import MonthPage from '../MonthPage';
import SettingsPage from '../SettingsPage';
import Header from '../Header';
import './style.scss';
import YearPage from '../YearPage';

enum Pages {
  Month = 'Month',
  Year = 'Year',
  Settings = 'Settings',
}

type PageMap = {
  [key: string]: JSX.Element;
};

const pages: PageMap = {
  [Pages.Month]: <MonthPage />,
  [Pages.Year]: <YearPage />,
  [Pages.Settings]: <SettingsPage />,
};

const Application: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [currentItem, setCurrentItem] = useState<string>('');

  useEffect(() => {
    dispatch(fetchIncomeCategoryListThunk());
    dispatch(fetchExpenseCategoryListThunk());
    dispatch(fetchCurrencyListThunk());
  }, [dispatch]);

  const handleItemSelect = (item: string): void => {
    setCurrentItem(item);
  };

  return (
    <div className="app">
      <div className="wrapper">
        <Header
          items={Object.keys(pages)}
          selectedItem={currentItem}
          onSelect={handleItemSelect}
        />
        <div className="content-wrapper">
          {currentItem && (pages[currentItem] || null)}
        </div>
      </div>
    </div>
  );
};

export default Application;
