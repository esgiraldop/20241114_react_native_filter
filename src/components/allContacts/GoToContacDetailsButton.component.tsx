import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {RootStackParamList} from '../../interfaces';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-elements';
import ContactImage from '../common/contactImage.component';
import {IContact} from '../../interfaces/contact.interface';
import {theme} from '../../theme/main.theme';

interface IContactDetailsButton
  extends Pick<IContact, 'name' | 'id' | 'imageUri'> {}

export function GoToContacDetailsButton({
  name,
  id,
  imageUri,
}: IContactDetailsButton) {
  type ContactDetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ContactDetails'
  >;

  const navigation = useNavigation<ContactDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ContactDetails', {contactId: id})}>
      <ContactImage pictureUri={imageUri} />
      <Text style={styles.nameText}>{name}</Text>
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
