export const stateName = 'auth';

export interface UserState {
  isPending: boolean;
  accessToken: string;
  refreshToken: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}
