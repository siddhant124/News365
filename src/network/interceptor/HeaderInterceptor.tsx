import {InternalAxiosRequestConfig} from 'axios';

export class HeaderInterceptor {
  setAuthorizationHeader(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    // Modify headers here, for example adding an Authorization token
    // config.headers['Authorization'] = 'Bearer YOUR_ACCESS_TOKEN';
    return config;
  }

  setCustomHeaders(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    config.headers['Content-Type'] = 'application/json';
    return config;
  }

  applyHeaders(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    //  config = this.setAuthorizationHeader(config);
    config = this.setCustomHeaders(config);
    return config;
  }
}
