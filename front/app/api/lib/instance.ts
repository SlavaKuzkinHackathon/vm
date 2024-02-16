import axios, { AxiosError } from 'axios';
import { ApiError } from './ApiError';

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASEURL}`,
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(undefined, (err: AxiosError) => {
  if (err.response && err.response.data && (err.response.data as any).message) {
    const data: any = err.response.data;

    return Promise.reject(
      new ApiError(err.name, data.message, data.statusCode),
    );
  }
  return Promise.reject(
    new ApiError(err.name, err.message, Number(err.status)),
  );
});