import {ParamListBase} from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Demo: undefined;
  AnotherScreen: undefined;
  Register: undefined;
  Login: undefined;
  Vehicles: undefined;
  VehicleDetails: {vehicleId: string};
  AddVehicle: undefined;
  EditVehicle: {
    vehicleId: string;
  };
  VehicleMaintenance: {vehicleId: string};
}
