import {privateAxiosInstance} from '../config/axios.config';
import {
  IContactsSucessfullResponse,
  ISingleContactSucessfullResponse,
  IUpdateContact,
} from '../interfaces/contact.interface';
import {handleAxiosResponse} from '../utilities/handle-axios-response.utility';
import Contacts from 'react-native-contacts';
import {Contact} from 'react-native-contacts/type';
import {showSnackbar} from '../utilities/snackbar.utility';

export type IHandleError = (
  isErrorModalOpen: boolean,
  errorLoading: boolean,
) => void;

export class ContactsService {
  static resource = 'contacts';

  static async getAll(): Promise<IContactsSucessfullResponse | null> {
    return handleAxiosResponse<IContactsSucessfullResponse>(
      async () =>
        await privateAxiosInstance.get<IContactsSucessfullResponse>(
          `${this.resource}`,
        ),
    );
  }

  static async getById(
    id: number,
  ): Promise<ISingleContactSucessfullResponse | null> {
    return handleAxiosResponse<ISingleContactSucessfullResponse>(
      async () =>
        await privateAxiosInstance.get<ISingleContactSucessfullResponse>(
          `${this.resource}/${id}`,
        ),
    );
  }

  static async create(
    contactData: IUpdateContact,
  ): Promise<ISingleContactSucessfullResponse | null> {
    return handleAxiosResponse<ISingleContactSucessfullResponse>(
      async () =>
        await privateAxiosInstance.post<ISingleContactSucessfullResponse>(
          `${this.resource}`,
          contactData,
        ),
    );
  }

  static async createMultiple(
    contactData: IUpdateContact[],
  ): Promise<IContactsSucessfullResponse | null> {
    return handleAxiosResponse<IContactsSucessfullResponse>(
      async () =>
        await privateAxiosInstance.post<IContactsSucessfullResponse>(
          `${this.resource}/batch`,
          contactData,
        ),
    );
  }

  static async update(
    id: number,
    contactData: IUpdateContact,
  ): Promise<IContactsSucessfullResponse | null> {
    return handleAxiosResponse<IContactsSucessfullResponse>(
      async () =>
        await privateAxiosInstance.patch<IContactsSucessfullResponse>(
          `${this.resource}/${id}`,
          contactData,
        ),
    );
  }

  static async delete(id: number): Promise<IContactsSucessfullResponse | null> {
    return handleAxiosResponse<IContactsSucessfullResponse>(
      async () =>
        await privateAxiosInstance.delete<IContactsSucessfullResponse>(
          `${this.resource}/${id}`,
        ),
    );
  }

  static async sync(): Promise<Contact[] | null> {
    //Checking permissions first

    try {
      return await Contacts.getAll();
    } catch (error) {
      let errorMessage =
        'There was a problem getting the contacts from the cellphone';
      errorMessage += error instanceof Error ? error.message : '';
      showSnackbar(errorMessage);
      return Promise.resolve(null);
    }
  }
}
