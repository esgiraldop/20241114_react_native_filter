import {useCallback, useState} from 'react';
import {VehiclesService} from '../services/vehicles.service';
import {useFocusEffect} from '@react-navigation/native';
import {IMaintenanceRecordsSucessfullResponse} from '../interfaces/maintenanceRecord.interface';

export function useMaintenanceRecords(vehicleId: number) {
  const [maintenanceRecords, setMaintenanceRecords] =
    useState<IMaintenanceRecordsSucessfullResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function fetchMaintenanceRecords() {
        try {
          setIsLoading(true);
          const response = await VehiclesService.getMaintenanceRecords(
            vehicleId,
          );

          if (response && response.data) {
            setMaintenanceRecords(response);
          } else {
            setError('No maintenance records found');
          }
        } catch (err) {
          setError('Error fetching maintenance records');
        } finally {
          setIsLoading(false);
        }
      }

      fetchMaintenanceRecords();
      return () => {
        setMaintenanceRecords(null); // Clean up the data on unmount
      };
    }, [vehicleId]),
  );

  return {
    maintenanceRecords,
    setMaintenanceRecords,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
}
