import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/auth/actions';
import { usernameSelector } from '../../store/auth/selectors';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({
  items,
  selectedItem,
  onSelect,
}: HeaderProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const username = useSelector(usernameSelector);
  const handleItemSelect = (item: string): void => {
    onSelect(item);
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="header-container">
      <div className="header-menu">
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
      <div className="header-user">
        <div className="header-user__username">
          {username}
        </div>
        <div>
          <Button
            type="link"
            icon={<LogoutOutlined rev={undefined} />}
            onClick={handleLogOut}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
