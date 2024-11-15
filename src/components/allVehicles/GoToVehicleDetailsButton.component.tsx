import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-elements';
import {theme} from '../../theme/main.theme';
import {IVehicle} from '../../interfaces/vehicle.interface';
import VehicleImage from '../common/VehicleImage.component';

interface IVehicleDetailsButton
  extends Pick<IVehicle, 'licensePlate' | 'id' | 'photo' | 'make'> {}

export function GoToVehicleDetailsButton({
  licensePlate,
  // id,
  make,
  photo,
}: IVehicleDetailsButton) {
  // type VehicleDetailsScreenNavigationProp = NativeStackNavigationProp<
  //   RootStackParamList,
  //   'VehicleDetails'
  // >;

  // const navigation = useNavigation<VehicleDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={() => navigation.navigate('VehicleDetails', {carId: id})}
    >
      <VehicleImage pictureUri={photo} />
      <View style={styles.infoContainer}>
        <Text style={styles.licensePlateText}>
          License Plate: <Text style={styles.detailText}>{licensePlate}</Text>
        </Text>
        <Text style={styles.manufacturerText}>
          Manufacturer: <Text style={styles.detailText}>{make}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vehicleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: theme.spacing.medium,
    backgroundColor: theme.colors.borderColor,
  },
  infoContainer: {
    flex: 1,
  },
  licensePlateText: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
  },
  manufacturerText: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.small,
  },
  detailText: {
    fontWeight: 'normal',
    color: theme.colors.textPrimary,
  },
});
