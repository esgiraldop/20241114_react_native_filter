import {ParamListBase} from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Demo: undefined;
  AnotherScreen: undefined;
  Register: undefined;
  Login: undefined;
  Cars: undefined;
  CarDetails: {carId: string};
  AddCar: undefined;
  EditCar: {
    contactId: number;
  };
  CarMaintenance: {carId: string};
}
