import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import AuthResponse from '../../services/payloads/AuthResponse';
import { logout } from './actions';
import {
  loginThunk,
  registerThunk,
} from './thunks';
import {
  stateName,
  UserState,
} from './types';

const initialState: UserState = {
  isPending: false,
  token: '',
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
        token: '',
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
      (state: UserState, action: PayloadAction<AuthResponse>): UserState => ({
        ...state,
        isPending: false,
        token: action.payload.token,
        username: action.payload.username,
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
      (state: UserState, action: PayloadAction<AuthResponse>): UserState => ({
        ...state,
        isPending: false,
        token: action.payload.token,
        username: action.payload.username,
      }),
    );
  },
});

export default userSlice;
