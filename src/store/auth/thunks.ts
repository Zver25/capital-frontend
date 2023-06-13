import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import authService from '../../services/authenticationService';
import AuthenticationResponse from '../../services/payloads/AuthenticationResponse';
import type { ThunkConfiguration } from '../index';
import { refreshTokenSelector } from './selectors';
import {
  LoginRequest,
  RegisterRequest,
  stateName,
} from './types';

export const loginThunk = createAsyncThunk<
  AuthenticationResponse,
  LoginRequest,
  ThunkConfiguration
>(
  `${stateName}/login`,
  (request: LoginRequest): Promise<any> => (
    authService
      .login(request)
      .then((response: AxiosResponse<AuthenticationResponse>) => {
        const { accessToken } = response.data;

        sessionStorage.setItem('accessToken', accessToken);

        return response.data;
      })
  ),
);

export const registerThunk = createAsyncThunk<
  AuthenticationResponse,
  RegisterRequest,
  ThunkConfiguration
>(
  `${stateName}/register`,
  (request: RegisterRequest): Promise<any> => (
    authService
      .register(request)
      .then((response) => {
        const { accessToken } = response.data;

        sessionStorage.setItem('accessToken', accessToken);

        return response.data;
      })
  ),
);

export const refreshTokenThunk = createAsyncThunk<
  AuthenticationResponse,
  void,
  ThunkConfiguration
>(
  `${stateName}/refreshToken`,
  (_: void, thunkAPI): Promise<AuthenticationResponse> => {
    const refreshToken: string = refreshTokenSelector(thunkAPI.getState());

    return authService
      .refreshToken(refreshToken)
      .then((response: AxiosResponse<AuthenticationResponse>) => response.data);
  },
);
