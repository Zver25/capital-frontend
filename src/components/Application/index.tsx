import { Classes, Navbar } from '@blueprintjs/core';
import React, { useState } from 'react';
import MonthPage from '../MonthPage';
import Sidebar from '../Sidebar';
import './style.scss';
import YearPage from '../YearPage';

enum Pages {
  Month = 'Month',
  Year = 'Year',
}

type PageMap = {
  [key: string]: JSX.Element;
};

const pages: PageMap = {
  [Pages.Month]: <MonthPage />,
  [Pages.Year]: <YearPage />,
};

const Application: React.FC = (): JSX.Element => {
  const [currentItem, setCurrentItem] = useState<string>('');

  const handleItemSelect = (item: string): void => {
    setCurrentItem(item);
  };

  return (
    <div className="app">
      <Navbar className={Classes.DARK} />
      <div className="wrapper">
        <Sidebar
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
