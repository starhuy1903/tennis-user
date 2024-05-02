// import toast from 'react-hot-toast';
import { RefreshResponse } from 'types/user';
import { showError } from 'utils/toast';

export interface ApiErrorResponse {
  status: number;
  data: { message: string; errors: { [k: string]: string[] } };
}

export function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return typeof error === 'object' && error != null && 'status' in error && typeof (error as any).status === 'number';
}

export const isRefreshResponse = (data: unknown): data is RefreshResponse => {
  return typeof data === 'object' && data != null && 'accessToken' in data && 'refreshToken' in data;
};

export const toastApiError = (data: unknown) => {
  const isErrorObject =
    typeof data === 'object' && data != null && 'message' in data && typeof (data as any).message === 'string';
  let message = 'Something went wrong';
  if (isErrorObject) {
    message = data.message as string;
  } else if (Array.isArray((data as any).message)) {
    message = (data as any).message[0];
  }

  showError(message);
};

// export const getOnMutationFunction = (success: string) => {
//   return async (_: any, api: any) => {
//     toast.promise(api.queryFulfilled, {
//       loading: 'Processing...',
//       success: success,
//       error: (error) => {
//         return isApiErrorResponse(error.error) ? error.error.data?.message : 'Something went wrong';
//       },
//     });
//     api.dispatch(setLoading(true));
//     try {
//       await api.queryFulfilled;
//     } catch (error) {
//       /* empty */
//     } finally {
//       api.dispatch(setLoading(false));
//     }
//   };
// };

export const urlWithCorePrefix = (url: string) => {
  return `core/${url}`;
};

export const urlWithAuthPrefix = (url: string) => {
  return `auth/${url}`;
};
