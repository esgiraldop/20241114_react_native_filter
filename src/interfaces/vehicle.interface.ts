export interface IVehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  photo: string;
}

export interface IUpdateVehicle extends Omit<IVehicle, 'id' | 'photo'> {
  file?: {
    uri: string | undefined; // The URI of the file, e.g., "file://path/to/image.jpg"
    type: string; // The MIME type, e.g., "image/jpeg"
    name: string; // The file name, e.g., "vehicle_photo.jpg"
  };
}

export interface IVehiclesSucessfullResponse {
  code: 200;
  data: IVehicle[];
  message: 'Success';
}

export interface ISingleVehicleSucessfullResponse {
  code: 200;
  data: IVehicle;
  message: 'Success';
}
