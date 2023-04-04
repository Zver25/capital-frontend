export const stateName = 'user';

export interface UserState {
  isPending: boolean;
  token: string;
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
