import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import AuthenticationResponse from '../../services/payloads/AuthenticationResponse';
import { logout } from './actions';
import {
  loginThunk,
  refreshTokenThunk,
  registerThunk,
} from './thunks';
import {
  stateName,
  UserState,
} from './types';

const initialState: UserState = {
  isPending: false,
  accessToken: '',
  refreshToken: '',
  username: '',
};

const userSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>): void => {
    builder.addCase(
      logout,
      (state: UserState): UserState => ({
        ...state,
        accessToken: '',
        username: '',
      }),
    );

    builder.addCase(
      loginThunk.pending,
      (state: UserState): UserState => ({
        ...state,
        isPending: true,
      }),
    );
    builder.addCase(
      loginThunk.fulfilled,
      (state: UserState, action: PayloadAction<AuthenticationResponse>): UserState => ({
        ...state,
        ...action.payload,
        isPending: false,
      }),
    );

    builder.addCase(
      registerThunk.pending,
      (state: UserState): UserState => ({
        ...state,
        isPending: true,
      }),
    );
    builder.addCase(
      registerThunk.fulfilled,
      (state: UserState, action: PayloadAction<AuthenticationResponse>): UserState => ({
        ...state,
        ...action.payload,
        isPending: false,
      }),
    );

    builder.addCase(
      refreshTokenThunk.fulfilled,
      (state: UserState, action: PayloadAction<AuthenticationResponse>): UserState => ({
        ...state,
        ...action.payload,
      }),
    );
  },
});

export default userSlice;
