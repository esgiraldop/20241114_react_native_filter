import {ParamListBase} from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  Demo: undefined;
  Register: undefined;
  Login: undefined;
  Contacts: undefined;
  ContactDetails: {contactId: string};
  AddContact: undefined;
  EditContact: {
    contactId: number;
  };
}
