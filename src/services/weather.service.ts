import {IWeatherResponse} from '../interfaces/weather-response.interface';
import {handleAxiosResponse} from '../utilities/handle-axios-response.utility';
import {weatherAxiosInstance} from '../config/axios.config';

export interface IGetWeather {
  lat: number;
  lon: number;
}

export class WeatherService {
  static resource = '';

  static async get({lat, lon}: IGetWeather): Promise<IWeatherResponse | null> {
    return handleAxiosResponse<IWeatherResponse>(
      async () =>
        await weatherAxiosInstance.get<IWeatherResponse>(`${this.resource}`, {
          params: {
            lat,
            lon,
          },
        }),
    );
  }
}
