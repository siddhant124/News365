import {ErrorResponse} from './ErrorResponse';
import {SuccessStatus} from './SuccessStatus';

export interface Response<T> {
  successStatus: SuccessStatus;
  body?: T;
  errorBody?: ErrorResponse;
}
