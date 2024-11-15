export interface IContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  imageUri: string;
  latitude: number;
  longitude: number;
}

export interface IUpdateContact extends Partial<IContact> {}

export interface IContactsSucessfullResponse {
  code: 200;
  data: IContact[];
  message: 'Success';
}

export interface ISingleContactSucessfullResponse {
  code: 200;
  data: IContact;
  message: 'Success';
}
