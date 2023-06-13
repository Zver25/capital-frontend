import axios, { AxiosResponse } from 'axios';
import AuthenticationResponse from './payloads/AuthenticationResponse';
import LoginRequest from './payloads/LoginRequest';
import RegisterRequest from './payloads/RegisterRequest';

class AuthenticationService {
  private readonly url = '/api/auth';

  public login(request: LoginRequest): Promise<AxiosResponse<AuthenticationResponse>> {
    return axios.post<AuthenticationResponse>(`${this.url}/login`, request);
  }

  public register(request: RegisterRequest): Promise<AxiosResponse<AuthenticationResponse>> {
    return axios.post<AuthenticationResponse>(`${this.url}/register`, request);
  }

  public refreshToken(refreshToken: string): Promise<AxiosResponse<AuthenticationResponse>> {
    return axios.post(`${this.url}/refresh-token`, { refreshToken });
  }
}

export default new AuthenticationService();
