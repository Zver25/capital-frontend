import type { RootState } from '..';

export const tokenSelector = (state: RootState): string => (
  state.user.token
);

export const usernameSelector = (state: RootState): string => (
  state.user.username
);
