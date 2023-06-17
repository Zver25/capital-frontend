import { Button, Form, Input } from 'antd';
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

  const comparePasswords = () => (
    password === confirmPassword
      ? Promise.resolve('')
      : Promise.reject(new Error('Password and confirm password are not equal'))
  );

  return (
    <SignForm>
      <Form
        className="sign-up-form__form"
        layout="vertical"
        onFinish={handleSignUp}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter your username',
            },
          ]}
        >
          <Input
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please enter your password again',
            },
            {
              validator: comparePasswords,
            },
          ]}
        >
          <Input.Password
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
          <Button htmlType="button" onClick={() => onAlreadyRegistered()}>
            Already Registered
          </Button>
        </Form.Item>
      </Form>
    </SignForm>
  );
};

export default SignUpForm;
