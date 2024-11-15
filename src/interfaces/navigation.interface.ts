import {ParamListBase} from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Demo: undefined;
  AnotherScreen: undefined;
  Register: undefined;
  Login: undefined;
  Vehicles: undefined;
  VehicleDetails: {carId: string};
  AddVehicle: undefined;
  EditVehicle: {
    contactId: number;
  };
  VehicleMaintenance: {carId: string};
}
