export interface ISucessfullLoginResponse {
  code: 201;
  data: {
    accessToken: string;
    message: string;
  };
  message: string;
}
