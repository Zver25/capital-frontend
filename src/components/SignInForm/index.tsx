import { Button, Form, Input } from 'antd';
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
      <Form
        className="sign-in-form__form"
        layout="vertical"
        onFinish={handleSignIn}
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
          <Button htmlType="button" onClick={() => onNewUser()}>
            New User
          </Button>
        </Form.Item>
      </Form>
    </SignForm>
  );
};

export default SignInForm;
