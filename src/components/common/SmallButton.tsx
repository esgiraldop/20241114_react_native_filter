import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../../theme/main.theme';

export const SmallButton = ({text}: {text: string}) => {
  type AddVehicleScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddVehicle'
  >;

  const navigation = useNavigation<AddVehicleScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('AddVehicle')}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.medium,
    borderRadius: 8,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    textAlign: 'center',
    fontSize: theme.fontSizes.text,
  },
});
