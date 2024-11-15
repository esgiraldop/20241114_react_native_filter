import {Contact} from 'react-native-contacts/type';
import {
  IVehicle,
  IVehiclesSucessfullResponse,
} from '../interfaces/vehicle.interface';
import {phoneContactsAdapter} from '../adapters/phoneContacts.adapter';
import {VehiclesService} from '../services/vehicles.service';

export const getContactsToSync = (
  appContacts: IVehicle[],
  phoneContacts: Contact[],
): Contact[] => {
  const appContactsNames = appContacts.map(
    (appContact: IVehicle): string => appContact.name,
  );
  const newContacts = phoneContacts.filter(
    (phoneContact: Contact): Boolean =>
      !appContactsNames.includes(phoneContact.displayName),
  );

  return newContacts;
};

export const postNewContacts = async (
  phoneContacts2Sync: Contact[],
): Promise<IVehiclesSucessfullResponse | null> => {
  const phoneContacts2SyncAdapted = phoneContactsAdapter(phoneContacts2Sync);
  return await VehiclesService.createMultiple(phoneContacts2SyncAdapted);
};
