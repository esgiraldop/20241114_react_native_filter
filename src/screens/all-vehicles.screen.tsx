import React, {useCallback, useState} from 'react';
import {FlatList, Text, View, StyleSheet, TextInput} from 'react-native';
import {SmallButton} from '../components/common/SmallButton';
import {ButtonsCarrousel} from '../components/common/ButtonsCarrousel.component';
import {IVehicle} from '../interfaces/vehicle.interface';
import {useFocusEffect} from '@react-navigation/native';
import {theme} from '../theme/main.theme';
import {VehiclesService} from '../services/vehicles.service';
import {GoToVehicleDetailsButton} from '../components/allVehicles';
// import {Button} from 'react-native-elements';

export function AllVehiclesScreen(): React.JSX.Element {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [errorLoading, setErrorLoading] = useState<boolean | null>(null);

  // State for filter criteria
  const [licensePlate, setLicensePlate] = useState<string>('');
  const [page, setPage] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      async function fetchAllVehicles() {
        setIsLoading(true);

        // Prepare the filter parameters
        const params: Record<string, string> = {};
        if (licensePlate) params.licensePlate = licensePlate;
        if (page) params.page = page;
        if (size) params.size = size;
        if (year) params.year = year;
        if (make) params.make = make;
        if (model) params.model = model;

        const response = await VehiclesService.getAll(params);

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
    }, [licensePlate, page, size, year, make, model]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {/* Filter inputs */}
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="License Plate"
            value={licensePlate}
            onChangeText={setLicensePlate}
          />
          <TextInput
            style={styles.input}
            placeholder="Page"
            value={page}
            onChangeText={setPage}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Size"
            value={size}
            onChangeText={setSize}
          />
          <TextInput
            style={styles.input}
            placeholder="Year"
            value={year}
            onChangeText={setYear}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Make"
            value={make}
            onChangeText={setMake}
          />
          <TextInput
            style={styles.input}
            placeholder="Model"
            value={model}
            onChangeText={setModel}
          />
        </View>
        {/* <Button title="Apply Filters" onPress={() => {}} /> */}
      </View>
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
              make={item.make}
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
  filterContainer: {
    margin: theme.spacing.medium,
  },
  row: {
    flexDirection: 'row', // Arrange inputs horizontally
    justifyContent: 'space-between', // Space out inputs
    marginBottom: theme.spacing.small,
  },
  input: {
    height: 40,
    width: '48%', // Adjust width for two inputs per line
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    paddingLeft: theme.spacing.small,
    color: theme.colors.textPrimary,
  },
  loadingText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.large,
  },
});
