export interface IVehicle {
  id: string;
  name: string;
  phone: string;
  email: string;
  imageUri: string;
  latitude: number;
  longitude: number;
}

export interface IUpdateContact extends Partial<IVehicle> {}

export interface IVehiclesSucessfullResponse {
  code: 200;
  data: IVehicle[];
  message: 'Success';
}

export interface ISingleContactSucessfullResponse {
  code: 200;
  data: IVehicle;
  message: 'Success';
}
