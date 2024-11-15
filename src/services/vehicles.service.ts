import {privateAxiosInstance} from '../config/axios.config';
import {
  IVehiclesSucessfullResponse,
  ISingleVehicleSucessfullResponse,
  IUpdateVehicle,
} from '../interfaces/vehicle.interface';
import {handleAxiosResponse} from '../utilities/handle-axios-response.utility';
import Contacts from 'react-native-contacts';
import {Contact} from 'react-native-contacts/type';
import {showSnackbar} from '../utilities/snackbar.utility';

export type IHandleError = (
  isErrorModalOpen: boolean,
  errorLoading: boolean,
) => void;

export class VehiclesService {
  static resource = 'vehicles';

  static async getAll(): Promise<IVehiclesSucessfullResponse | null> {
    return handleAxiosResponse<IVehiclesSucessfullResponse>(
      async () =>
        await privateAxiosInstance.get<IVehiclesSucessfullResponse>(
          `${this.resource}`,
        ),
    );
  }

  static async getById(
    id: number,
  ): Promise<ISingleVehicleSucessfullResponse | null> {
    return handleAxiosResponse<ISingleVehicleSucessfullResponse>(
      async () =>
        await privateAxiosInstance.get<ISingleVehicleSucessfullResponse>(
          `${this.resource}/${id}`,
        ),
    );
  }

  static async create(
    contactData: IUpdateVehicle,
  ): Promise<ISingleVehicleSucessfullResponse | null> {
    return handleAxiosResponse<ISingleVehicleSucessfullResponse>(
      async () =>
        await privateAxiosInstance.post<ISingleVehicleSucessfullResponse>(
          `${this.resource}`,
          contactData,
        ),
    );
  }

  static async createMultiple(
    contactData: IUpdateVehicle[],
  ): Promise<IVehiclesSucessfullResponse | null> {
    return handleAxiosResponse<IVehiclesSucessfullResponse>(
      async () =>
        await privateAxiosInstance.post<IVehiclesSucessfullResponse>(
          `${this.resource}/batch`,
          contactData,
        ),
    );
  }

  static async update(
    id: number,
    contactData: IUpdateVehicle,
  ): Promise<IVehiclesSucessfullResponse | null> {
    return handleAxiosResponse<IVehiclesSucessfullResponse>(
      async () =>
        await privateAxiosInstance.patch<IVehiclesSucessfullResponse>(
          `${this.resource}/${id}`,
          contactData,
        ),
    );
  }

  static async delete(id: number): Promise<IVehiclesSucessfullResponse | null> {
    return handleAxiosResponse<IVehiclesSucessfullResponse>(
      async () =>
        await privateAxiosInstance.delete<IVehiclesSucessfullResponse>(
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
