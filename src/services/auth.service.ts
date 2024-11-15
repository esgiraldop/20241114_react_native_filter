import {axiosInstance} from '../config/axios.config';
import {ISucessfullLoginResponse} from '../interfaces/login.interface';
import {IUser} from '../interfaces/user.interface';
import {handleAxiosResponse} from '../utilities/handle-axios-response.utility';

export class AuthService {
  static resource = 'auth';

  static async register(values: IUser): // handleError?: IHandleError
  Promise<IUser | null> {
    return handleAxiosResponse<IUser>(
      async () =>
        await axiosInstance.post<IUser>(`${this.resource}/register`, values),
    );
  }

  static async login(values: IUser): // handleError?: IHandleError
  Promise<ISucessfullLoginResponse | null> {
    return handleAxiosResponse<ISucessfullLoginResponse>(
      async () =>
        await axiosInstance.post<ISucessfullLoginResponse>(
          `${this.resource}/login`,
          values,
        ),
    );
  }
}
