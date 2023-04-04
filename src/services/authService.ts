import axios, { AxiosResponse } from 'axios';
import AuthResponse from './payloads/AuthResponse';
import LoginRequest from './payloads/LoginRequest';
import RegisterRequest from './payloads/RegisterRequest';

class AuthService {
  private readonly url = '/api/auth';

  public login(request: LoginRequest): Promise<AxiosResponse<AuthResponse>> {
    return axios.post<AuthResponse>(`${this.url}/login`, request);
  }

  public register(request: RegisterRequest): Promise<AxiosResponse<AuthResponse>> {
    return axios.post<AuthResponse>(`${this.url}/register`, request);
  }
}

export default new AuthService();
