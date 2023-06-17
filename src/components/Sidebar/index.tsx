import clsx from 'clsx';
import React from 'react';
import './styles.scss';
import { SidebarProps } from './types';

const Sidebar: React.FC<SidebarProps> = ({
  items,
  selectedItem,
  onSelect,
}: SidebarProps): JSX.Element => {
  const handleItemSelect = (item: string): void => {
    onSelect(item);
  };

  return (
    <div className="sidebar-container">
      {items.map((item: string) => (
        <div
          key={item}
          role="presentation"
          className={clsx('menu-item', selectedItem === item && 'menu-item_selected')}
          onClick={() => handleItemSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
