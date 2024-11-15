export interface ISucessfullLoginResponse {
  code: 201;
  data: {
    access_token: string;
    message: string;
  };
  message: string;
}
