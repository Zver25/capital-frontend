import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import {
  loginThunk,
  registerThunk,
} from '../../store/user/thunks';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';

const AuthPage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSingUp = (username: string, password: string): void => {
    dispatch(registerThunk({
      username,
      password,
    }));
  };

  const handleSingIn = (username: string, password: string): void => {
    dispatch(loginThunk({
      username,
      password,
    }));
  };

  return isNewUser
    ? (
      <SignUpForm
        onSignUp={handleSingUp}
        onAlreadyRegistered={() => setIsNewUser(false)}
      />
    )
    : (
      <SignInForm
        onSignIn={handleSingIn}
        onNewUser={() => setIsNewUser(true)}
      />
    );
};

export default AuthPage;
