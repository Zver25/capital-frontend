import React from 'react';
import { useSelector } from 'react-redux';
import { tokenSelector } from '../../store/user/selectors';
import Application from '../Application';
import AuthPage from '../AuthPage';

const AuthGuard: React.FC = (): JSX.Element => {
  const token = useSelector(tokenSelector);

  return token
    ? <Application />
    : <AuthPage />;
};

export default AuthGuard;
