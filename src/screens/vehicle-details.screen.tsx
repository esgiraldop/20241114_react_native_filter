import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useVehicleById} from '../hooks/useVehicleById.hook';
import {ConfirmationModal} from '../components/common/confirmation-modal.component';
import {theme} from '../theme/main.theme';
import {VehiclesService} from '../services/vehicles.service';
import VehicleImage from '../components/common/VehicleImage.component';

type VehicleDetailsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'VehicleDetails'
>;

export function VehicleDetailsScreen(): React.JSX.Element {
  const {params} = useRoute<RouteProp<RootStackParamList, 'VehicleDetails'>>();
  const vehicleId = params.vehicleId;
  const navigation = useNavigation<VehicleDetailsScreenProp>();

  const {vehicleInfo, isVehicleLoading, errorLoadingVehicle} = useVehicleById(
    +vehicleId,
  );
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState<boolean>(false);

  const handleDeleteVehicle = async () => {
    await VehiclesService.delete(+vehicleId);
    navigation.goBack();
  };

  return (
    <ScrollView style={vehicleDetailsStyles.container}>
      {isVehicleLoading ? (
        <Text style={vehicleDetailsStyles.loadingText}>
          Loading vehicle information...
        </Text>
      ) : errorLoadingVehicle || !vehicleInfo ? (
        <Text style={vehicleDetailsStyles.errorText}>
          No information for the vehicle could be found
        </Text>
      ) : (
        <View style={vehicleDetailsStyles.vehicleContainer}>
          <VehicleImage pictureUri={vehicleInfo.data.photo} size={150} />
          <Text style={vehicleDetailsStyles.nameText}>
            License plate:{'   '}
            <Text>{vehicleInfo.data.licensePlate}</Text>
          </Text>
          <Text style={vehicleDetailsStyles.nameText}>
            Manufacturer:{'   '}
            <Text>{vehicleInfo.data.make}</Text>
          </Text>
          <Text style={vehicleDetailsStyles.nameText}>
            Model:{'   '}
            <Text>{vehicleInfo.data.model}</Text>
          </Text>
          <Text style={vehicleDetailsStyles.nameText}>
            Year:{'   '}
            <Text>{vehicleInfo.data.year}</Text>
          </Text>

          <TouchableOpacity
            style={[vehicleDetailsStyles.button]}
            onPress={() => navigation.navigate('EditVehicle', {vehicleId})}>
            <Text style={vehicleDetailsStyles.buttonText}>Edit Vehicle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={vehicleDetailsStyles.button}
            onPress={() => setConfirmationModalVisible(true)}>
            <Text style={vehicleDetailsStyles.buttonText}>Delete Vehicle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={vehicleDetailsStyles.button}
            onPress={() =>
              navigation.navigate('VehicleMaintenance', {vehicleId})
            }>
            <Text style={vehicleDetailsStyles.buttonText}>
              View Maintenance Records
            </Text>
          </TouchableOpacity>

          <ConfirmationModal
            confirmationModalVisible={confirmationModalVisible}
            setConfirmationModalVisible={setConfirmationModalVisible}
            handleAccept={handleDeleteVehicle}
            requiresCancel={true}>
            <Text>Do you want to delete this vehicle?</Text>
          </ConfirmationModal>
        </View>
      )}
    </ScrollView>
  );
}

export const vehicleDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  vehicleContainer: {
    alignItems: 'center',
    borderBottomColor: theme.colors.borderColor,
    borderBottomWidth: 1,
    paddingBottom: theme.spacing.large,
  },
  loadingText: {
    color: theme.colors.textSecondary,
  },
  errorText: {
    color: theme.colors.textSecondary,
  },
  nameText: {
    fontSize: theme.fontSizes.title,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.small,
  },
  phoneText: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.textSecondary,
    marginVertical: theme.spacing.small,
  },
  emailText: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.textSecondary,
  },
  button: {
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.medium,
    marginTop: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textPrimary,
  },
});
