import axios, {AxiosRequestConfig} from 'axios';
import {ApiService} from './ApiService';
import {BASE_URL} from './NetworkUrl';
import {HeaderInterceptor} from './interceptor/HeaderInterceptor';
import {isExcludeAPI} from '../utils/Utility';
import News365DataStore from '../datastore/News365DataStore';
import {ApiConfig} from './ApiConfig';
/**
 * Created by Anurag on 13 June 2024
 */
export class AxiosBuilder {
  private readonly TAG = 'AxiosBuilder';
  private readonly config: AxiosRequestConfig;
  private readonly headerInterceptor: HeaderInterceptor;
  constructor(config?: ApiConfig) {
    this.config = {
      baseURL: config?.baseURL ?? '',
      timeout: config?.timeout ?? 10000,
      headers: config?.headers ?? {},
      responseType: config?.responseType ?? 'json',
    };

    this.headerInterceptor = new HeaderInterceptor();
  }

  baseUrl(url: string = BASE_URL): AxiosBuilder {
    this.config.baseURL = url;
    return this;
  }

  timeout(timeout: number): AxiosBuilder {
    this.config.timeout = timeout;
    return this;
  }

  headers(headers: any): AxiosBuilder {
    this.config.headers = headers;
    return this;
  }

  responseType(responseType: 'json'): AxiosBuilder {
    this.config.responseType = responseType;
    return this;
  }

  build(): ApiService {
    const axiosInstance = axios.create(this.config);
    axiosInstance.interceptors.request.use(
      async config => {
        config.headers['Content-Type'] = 'application/json';
        if (!isExcludeAPI(config.url ?? '')) {
          const token = await News365DataStore.getAccessToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      error => {
        console.log(this.TAG, 'Request interceptor error:');
        return Promise.reject(error);
      },
    );
    return new ApiService(axiosInstance);
  }
}
