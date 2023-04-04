import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import authService from '../../services/authService';
import AuthResponse from '../../services/payloads/AuthResponse';
import type { RootState } from '../index';
import {
  LoginRequest,
  RegisterRequest,
  stateName,
} from './types';

interface ThunkConfiguration {
  state: RootState;
}

export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  ThunkConfiguration
>(
  `${stateName}/login`,
  (request: LoginRequest): Promise<any> => (
    authService
      .login(request)
      .then((response: AxiosResponse<AuthResponse>) => response.data)
  ),
);

export const registerThunk = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  ThunkConfiguration
>(
  `${stateName}/register`,
  (request: RegisterRequest): Promise<any> => (
    authService
      .register(request)
      .then((response) => response.data)
  ),
);
