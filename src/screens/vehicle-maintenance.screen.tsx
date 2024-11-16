import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../interfaces';
import {theme} from '../theme/main.theme';
import {useMaintenanceRecords} from '../hooks/use-maintenance-records.hook';

export function VehicleMaintenanceScreen(): React.JSX.Element {
  const {params} =
    useRoute<RouteProp<RootStackParamList, 'VehicleMaintenance'>>();
  const vehicleId = params.vehicleId;

  // Use the custom hook
  const {maintenanceRecords, isLoading, error} = useMaintenanceRecords(
    +vehicleId,
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.accent} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={maintenanceRecords?.data}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <View style={styles.recordContainer}>
              <Text style={styles.recordText}>Type: {item.type}</Text>
              <Text style={styles.recordText}>Date: {item.date}</Text>
              <Text style={styles.recordText}>Mileage: {item.mileage}</Text>
              <Text style={styles.recordText}>Notes: {item.notes}</Text>
            </View>
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
    padding: theme.spacing.medium,
  },
  recordContainer: {
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    borderRadius: theme.spacing.small,
  },
  recordText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.text,
  },
  errorText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.large,
  },
});
