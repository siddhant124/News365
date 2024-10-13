import axios, {AxiosInstance} from 'axios';
import {Response} from './Response';
import {BASE_URL} from './NetworkUrl';
import Utility from '../utils/Utility';
import NetInfo from '@react-native-community/netinfo';
import {ApiEndpoint} from './ApiEndpoint';

/**
 * Created by Anurag on 13 June 2024
 * ApiService class for making HTTP requests with axios and handling network errors, retries, and logging
 */
export class ApiService {
  private readonly axiosInstance: AxiosInstance;
  private readonly utility: Utility;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.utility = new Utility();
  }

  public async request<T>(
    endpoint: ApiEndpoint,
    requestData?: any,
  ): Promise<Response<T>> {
    const {url, method} = endpoint;
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      console.log('Network Error: No internet connection.');
      return {
        successStatus: {statusCode: 612, isSuccessful: false},
        errorBody: {
          statusCode: 612,
          message: 'No internet connectio',
        },
      };
    }

    try {
      const response = await this.axiosInstance.request<T>({
        url,
        method,
        data: requestData,
      });
      // Log the response data for debugging purposes
      // console.info('Response:', JSON.stringify(response.data, null, 2));
      return {
        successStatus: {statusCode: response.status, isSuccessful: true},
        body: response.data,
      };
    } catch (error) {
      console.log('API Error:', error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Response Error:', error.response.data);
          return {
            successStatus: {
              statusCode: error.response.status,
              isSuccessful: false,
            },
            errorBody: {
              statusCode: error.response.status,
              errorCode: JSON.stringify(error.response.data.errorCode ?? ''),
              message: JSON.stringify(error.response.data.message ?? ''),
            },
          };
        }

        if (error.request) {
          console.log('Request Error:', error.request);
          return {
            successStatus: {
              statusCode: error.request.status,
              isSuccessful: false,
            },
            errorBody: {
              statusCode: error.request.status,
              message: JSON.stringify(error.response),
            },
          };
        }

        return {
          successStatus: {statusCode: 116, isSuccessful: false},
          errorBody: {statusCode: 116, message: JSON.stringify(error.response)},
        };
      }

      console.log('Unexpected Error:', error);
      return {
        successStatus: {statusCode: 117, isSuccessful: false},
        errorBody: {statusCode: 117, message: 'Unexpected error response'},
      };
    }
  }

  public async get<T>(endPointUrl: string): Promise<Response<T>> {
    const url = this.getRequestUrl(endPointUrl);
    return this.request<T>({url, method: 'get'});
  }

  public async post<T>(endPointUrl: string, data: any): Promise<Response<T>> {
    const url = this.getRequestUrl(endPointUrl);
    return this.request<T>({url, method: 'post'}, data);
  }

  public async put<T>(endPointUrl: string, data: any): Promise<Response<T>> {
    const url = this.getRequestUrl(endPointUrl);
    return this.request<T>({url, method: 'put'}, data);
  }

  public async delete<T>(endPointUrl: string): Promise<Response<T>> {
    const url = this.getRequestUrl(endPointUrl);
    return this.request<T>({url, method: 'delete'});
  }

  public getRequestUrl(url: string): string {
    if (this.utility.regex.test(url)) {
      return url;
    }
    return BASE_URL + url;
  }

  public async postWithOutData<T>(endPointUrl: string): Promise<Response<T>> {
    const url = this.getRequestUrl(endPointUrl);
    return this.request<T>({url, method: 'post'});
  }
}

export default ApiService;
