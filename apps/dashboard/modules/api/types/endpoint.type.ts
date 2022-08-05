/**
 * Supported API endpoints.
 */
export enum ApiEndpoint {
  RunRanking = '/run-ranking',
}

/**
 * Signature of a base response retrieved from the API.
 */
export interface BaseResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
