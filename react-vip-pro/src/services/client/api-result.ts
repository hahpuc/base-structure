export type ErrorResponse = {
  errorCode?: string;
  message?: string;
  statusCode?: number;
};

export type ApiResult<T> = {
  data?: T;
  isSuccess: boolean;
  error?: ErrorResponse;
};
