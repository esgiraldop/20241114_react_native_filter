export interface IVehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  photo: string;
}

export interface IUpdateVehicle extends Partial<IVehicle> {}

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
