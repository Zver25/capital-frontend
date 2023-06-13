import React from 'react';
import logo from '../../assets/images/grow-capital.svg';
import './style.scss';

export interface SignFormProps {
  children: React.ReactNode;
}

const SignForm: React.FC<SignFormProps> = ({
  children,
}: SignFormProps): JSX.Element => (
  <div className="sign-form__background">
    <div className="sign-form__wrapper">
      <div className="sign-form__card">
        <img
          className="sign-form__logo-image"
          src={logo}
          alt="Grow Capital Logo"
          title="Grow Capital Logo"
        />
        <h1 className="sign-form__header">Grow Capital</h1>
        {children}
      </div>
    </div>
  </div>
);

export default SignForm;
