import React from 'react';
import { useSelector } from 'react-redux';
import { accessTokenSelector } from '../../store/auth/selectors';
import Application from '../Application';
import AuthPage from '../AuthPage';

const AuthGuard: React.FC = (): JSX.Element => {
  const token: string = useSelector(accessTokenSelector);

  return token
    ? <Application />
    : <AuthPage />;
};

export default AuthGuard;
