import {Contact} from 'react-native-contacts/type';
import {
  IContact,
  IContactsSucessfullResponse,
} from '../interfaces/contact.interface';
import {phoneContactsAdapter} from '../adapters/phoneContacts.adapter';
import {ContactsService} from '../services/contacts.service';

export const getContactsToSync = (
  appContacts: IContact[],
  phoneContacts: Contact[],
): Contact[] => {
  const appContactsNames = appContacts.map(
    (appContact: IContact): string => appContact.name,
  );
  const newContacts = phoneContacts.filter(
    (phoneContact: Contact): Boolean =>
      !appContactsNames.includes(phoneContact.displayName),
  );

  return newContacts;
};

export const postNewContacts = async (
  phoneContacts2Sync: Contact[],
): Promise<IContactsSucessfullResponse | null> => {
  const phoneContacts2SyncAdapted = phoneContactsAdapter(phoneContacts2Sync);
  return await ContactsService.createMultiple(phoneContacts2SyncAdapted);
};
