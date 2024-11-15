import {AxiosResponse} from 'axios';
// import {Alert} from 'react-native';
// import {IHandleError} from '../services/contacts.service';
import {showSnackbar} from './snackbar.utility';
// import {IHandleError} from '../services/contacts.service';

function processAxiosResponse<T>(
  response: AxiosResponse<T>,
): Promise<T | never> {
  if (!String(response.status).startsWith('2')) {
    const errorMessage =
      (response.data as {error?: string})?.error || 'Unknown error';
    return Promise.reject(errorMessage);
  }
  return Promise.resolve(response.data);
}

function processAxiosError(
  error: unknown,
  // handleError?: IHandleError
) {
  let errorMessage =
    'There was an error related to a bad axios/network connection or an undefined error.';

  errorMessage += error instanceof Error ? error.message : '';
  showSnackbar(errorMessage);

  // return Promise.reject(errorMessage);
  return Promise.resolve(null);
}

export async function handleAxiosResponse<T>(
  axiosCall: () => Promise<AxiosResponse<T>>,
  // handleError?: IHandleError,
): Promise<T | null> {
  try {
    const response = await axiosCall();
    return processAxiosResponse(response);
  } catch (error) {
    return processAxiosError(
      error,
      // handleError
    );
  }
}
