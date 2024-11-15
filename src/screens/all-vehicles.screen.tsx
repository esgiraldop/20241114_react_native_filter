import React, {useCallback, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {SmallButton} from '../components/common/SmallButton';
import {ButtonsCarrousel} from '../components/common/ButtonsCarrousel.component';
import {IVehicle} from '../interfaces/vehicle.interface';
import {useFocusEffect} from '@react-navigation/native';
import {theme} from '../theme/main.theme';
import {VehiclesService} from '../services/vehicles.service';
import {GoToVehicleDetailsButton} from '../components/allVehicles';

export function AllVehiclesScreen(): React.JSX.Element {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [errorLoading, setErrorLoading] = useState<boolean | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function fetchAllVehicles() {
        setIsLoading(true);

        const response = await VehiclesService.getAll();

        if (response) {
          setVehicles(response.data);
          setErrorLoading(false);
        } else {
          setErrorLoading(true);
        }
        setIsLoading(false);
      }
      fetchAllVehicles();

      return () => {};
    }, []),
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : errorLoading ? (
        <Text style={styles.loadingText}>Error loading vehicles</Text>
      ) : (
        <FlatList
          ListHeaderComponent={
            <ButtonsCarrousel>
              <SmallButton text={'Add new vehicle'} />
              {/* <SmallButton text={'Search a vehicle'} /> */}
            </ButtonsCarrousel>
          }
          data={vehicles.sort((a, b) =>
            a.licensePlate.localeCompare(b.licensePlate),
          )}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <GoToVehicleDetailsButton
              licensePlate={item.licensePlate}
              id={item.id}
              photo={item.photo}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.large,
  },
});
