import {useCallback, useState} from 'react';
import {ISingleVehicleSucessfullResponse} from '../interfaces/vehicle.interface';
import {VehiclesService} from '../services/vehicles.service';
import {useFocusEffect} from '@react-navigation/native';

export function useVehicleById(vehicleId: number) {
  const [vehicleInfo, setVehicleInfo] =
    useState<ISingleVehicleSucessfullResponse | null>(null);
  const [isVehicleLoading, setIsVehicleLoading] = useState<boolean | null>(
    false,
  );
  const [errorLoadingVehicle, setErrorLoadingVehicle] = useState<
    boolean | null
  >(null);

  useFocusEffect(
    useCallback(() => {
      async function getVehicleInfo(id: number) {
        const vehicleInfoResponse = await VehiclesService.getById(id);
        setIsVehicleLoading(true);
        if (vehicleInfoResponse) {
          setVehicleInfo(vehicleInfoResponse);
          setIsVehicleLoading(false);
        } else {
          setIsVehicleLoading(false);
          setErrorLoadingVehicle(true);
        }
      }

      getVehicleInfo(vehicleId);
      return () => getVehicleInfo(vehicleId);
    }, [vehicleId]),
  );

  return {
    vehicleInfo,
    setVehicleInfo,
    isVehicleLoading,
    setIsVehicleLoading,
    errorLoadingVehicle,
    setErrorLoadingVehicle,
  };
}
