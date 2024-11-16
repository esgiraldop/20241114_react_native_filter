import {
  baseURL,
  privateAxiosInstance,
  privateAxiosInstanceFormData,
} from '../config/axios.config';
import {IMaintenanceRecordsSucessfullResponse} from '../interfaces/maintenanceRecord.interface';
import {
  IVehiclesSucessfullResponse,
  ISingleVehicleSucessfullResponse,
  IUpdateVehicle,
} from '../interfaces/vehicle.interface';
import {handleAxiosResponse} from '../utilities/handle-axios-response.utility';

export type IHandleError = (
  isErrorModalOpen: boolean,
  errorLoading: boolean,
) => void;

export class VehiclesService {
  static resource = 'vehicles';

  static async getAll(
    params: Record<string, string>,
  ): Promise<IVehiclesSucessfullResponse | null> {
    return handleAxiosResponse<IVehiclesSucessfullResponse>(
      async () =>
        await privateAxiosInstance.get<IVehiclesSucessfullResponse>(
          `${this.resource}`,
          {params},
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
    vehicleData: IUpdateVehicle,
  ): Promise<ISingleVehicleSucessfullResponse | null> {
    console.log('\n\n\nvehicleData.file', vehicleData.file);
    const formData = new FormData();
    formData.append('make', vehicleData.make || 'Chevrolet');
    formData.append('model', vehicleData.model || 'Onix');
    formData.append('year', vehicleData.year?.toString() || '2024');
    formData.append('licensePlate', vehicleData.licensePlate || 'LLL234');
    // formData.append('file', vehicleData.file);
    console.log('formData: ', formData);
    // const response =
    //   await privateAxiosInstanceFormData.post<ISingleVehicleSucessfullResponse>(
    //     `${this.resource}`,
    //     formData,
    //   );
    // console.log('\n\nresponse before response: ', response);
    const fullUrl = `${baseURL}/${this.resource}`;
    console.log('\n\n\nRequest URL:', fullUrl);

    return handleAxiosResponse<ISingleVehicleSucessfullResponse>(
      async () =>
        await privateAxiosInstanceFormData.post<ISingleVehicleSucessfullResponse>(
          `${this.resource}`,
          formData,
        ),
    );
  }

  static async update(
    id: number,
    vehicleData: IUpdateVehicle,
  ): Promise<IVehiclesSucessfullResponse | null> {
    return handleAxiosResponse<IVehiclesSucessfullResponse>(
      async () =>
        await privateAxiosInstance.patch<IVehiclesSucessfullResponse>(
          `${this.resource}/${id}`,
          vehicleData,
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

  static async getMaintenanceRecords(
    vehicleId: number,
  ): Promise<IMaintenanceRecordsSucessfullResponse | null> {
    return handleAxiosResponse<IMaintenanceRecordsSucessfullResponse>(
      async () =>
        await privateAxiosInstance.get<IMaintenanceRecordsSucessfullResponse>(
          `/api/v1/vehicles/${vehicleId}/maintenance`,
        ),
    );
  }
}
