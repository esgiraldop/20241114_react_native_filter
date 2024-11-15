import {Contact} from 'react-native-contacts/type';
import {IVehicle} from '../interfaces/vehicle.interface';
import {isNull} from '../utilities/checkIsNull.utility';

export const phoneContactsAdapter = (
  phoneContacts: Contact[],
): Omit<IVehicle, 'id'>[] => {
  return phoneContacts.map(phoneContact => ({
    name: phoneContact.displayName,
    phone: phoneContact.phoneNumbers[0].number,
    email: !isNull(phoneContact.emailAddresses[0]?.email)
      ? phoneContact.emailAddresses[0]?.email
      : '',
    imageUri: phoneContact.thumbnailPath,
    latitude: 0,
    longitude: 0,
  }));
};
