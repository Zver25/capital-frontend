import {
  Button,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';
import React, {
  ChangeEvent,
  useState,
} from 'react';
import SignForm from '../SignForm';
import './style.scss';

interface SignInFormProps {
  onSignIn: (username: string, password: string) => void;
  onNewUser: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSignIn,
  onNewUser,
}: SignInFormProps): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setUsername(value);
    setUsernameError(!value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setPassword(value);
    setPasswordError(!value);
  };

  const handleSignIn = (): void => {
    if (!usernameError && !passwordError) {
      onSignIn(username, password);
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
          id="username"
          type="password"
          placeholder="Please enter your password"
          intent={passwordError ? 'danger' : 'success'}
          value={password}
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <Button
        className="sign-in-form__first-button"
        text="Sign In"
        onClick={handleSignIn}
      />
      <Button
        text="Create Account"
        onClick={onNewUser}
      />
    </SignForm>
  );
};

export default SignInForm;
