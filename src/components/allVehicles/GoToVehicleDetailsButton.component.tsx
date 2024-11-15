import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-elements';
import {theme} from '../../theme/main.theme';
import {IVehicle} from '../../interfaces/vehicle.interface';
import VehicleImage from '../common/VehicleImage.component';

interface IVehicleDetailsButton
  extends Pick<IVehicle, 'licensePlate' | 'id' | 'photo'> {}

export function GoToVehicleDetailsButton({
  licensePlate,
  id,
  photo,
}: IVehicleDetailsButton) {
  type VehicleDetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'VehicleDetails'
  >;

  const navigation = useNavigation<VehicleDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={() => navigation.navigate('VehicleDetails', {VehicleId: id})}
    >
      <VehicleImage pictureUri={photo} />
      <Text style={styles.nameText}>{licensePlate}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderColor,
  },
  nameText: {
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.medium,
    fontSize: theme.fontSizes.text,
  },
});
