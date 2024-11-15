import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../../theme/main.theme';

export const SmallButton = ({text}: {text: string}) => {
  type AddContactScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddContact'
  >;

  const navigation = useNavigation<AddContactScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('AddContact')}>
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
