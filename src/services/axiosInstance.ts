import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
// import store, { TypedAppDispatch } from '../store';
// import { accessTokenSelector } from '../store/auth/selectors';
// import { refreshTokenThunk } from '../store/auth/thunks';

const axiosInstance: AxiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // const accessToken: string = accessTokenSelector(store.getState());
  const accessToken: string | null = sessionStorage.getItem('accessToken');

  if (accessToken) {
    /* eslint-disable no-param-reassign */
    config.headers.Authorization = `Bearer ${accessToken}`;
    /* eslint-enable no-param-reassign */
  }

  return config;
});

axiosInstance.interceptors.response.use((response: AxiosResponse<any>): AxiosResponse<any> => {
  if (response.status === 401) {
    // const dispatch = store.dispatch as TypedAppDispatch;
    //
    // dispatch(refreshTokenThunk());
    sessionStorage.setItem('accessToken', '');
  }

  return response;
});

export default axiosInstance;
