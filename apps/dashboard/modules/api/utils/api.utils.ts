import { BaseResponse } from '@dashboard/modules/api/types/endpoint.type';

const baseUrl = '/api';

function constructFetchUrl(
  baseUrl: string,
  params: Record<string, string>,
): string {
  if (Object.keys(params).length === 0) {
    return baseUrl;
  }
  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join('&');
  return `${baseUrl}?${queryString}`;
}

/**
 * Utility function to fetch a specific endpoint.
 * @param endpoint The endpoint to fetch.
 * @param options The options to pass to the fetch call.
 * @param params Query parameters to pass to the endpoint.
 * @returns The response from the fetch call.
 */
export async function baseFetch<T>(
  endpoint: string,
  options?: RequestInit,
  params: Record<string, string> = {},
): Promise<BaseResponse<T>> {
  if (options?.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }
  const res = await fetch(
    constructFetchUrl(`${baseUrl}${endpoint}`, params),
    options,
  );
  if (res.ok) {
    const { data } = await res.json();
    return { success: true, message: res.statusText, data };
  } else {
    return { success: false, message: res.statusText };
  }
}

export type EmptyObject = {
  [K in never]: never;
};
