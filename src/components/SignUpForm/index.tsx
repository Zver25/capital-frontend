import {
  Button,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';
import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import SignForm from '../SignForm';
import './style.scss';

export interface SignUpFormProps {
  onSignUp: (username: string, password: string) => void;
  onAlreadyRegistered: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSignUp,
  onAlreadyRegistered,
}: SignUpFormProps): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  useEffect(() => {
    setUsernameError(!username);
  }, [username]);
  useEffect(() => {
    setPasswordError(!password);
  }, [password]);
  useEffect(() => {
    setConfirmPasswordError(passwordError || password !== confirmPassword);
  }, [passwordError, password, confirmPassword]);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = (): void => {
    if (!usernameError && !passwordError && !confirmPasswordError) {
      onSignUp(username, password);
    }
  };

  return (
    <SignForm>
      <FormGroup>
        <InputGroup
          id="username"
          placeholder="Please enter your username"
          intent={usernameError ? 'danger' : 'success'}
          value={username}
          onChange={handleUsernameChange}
        />
      </FormGroup>
      <FormGroup>
        <InputGroup
          id="password"
          placeholder="Please enter your password"
          type="password"
          intent={passwordError ? 'danger' : 'success'}
          value={password}
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <FormGroup>
        <InputGroup
          id="confirmPassword"
          placeholder="Please enter confirmation for password"
          type="password"
          value={confirmPassword}
          intent={confirmPasswordError ? 'danger' : 'success'}
          onChange={handleConfirmPasswordChange}
        />
      </FormGroup>
      <Button
        className="sign-up-form__first-button"
        text="Sign Up"
        onClick={handleSignUp}
      />
      <Button
        text="Already Registered"
        onClick={onAlreadyRegistered}
      />
    </SignForm>
  );
};

export default SignUpForm;
