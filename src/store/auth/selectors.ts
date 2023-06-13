import type { RootState } from '..';

export const accessTokenSelector = (state: RootState): string => (
  state.user.accessToken
);

export const refreshTokenSelector = (state: RootState): string => (
  state.user.refreshToken
);

export const usernameSelector = (state: RootState): string => (
  state.user.username
);
