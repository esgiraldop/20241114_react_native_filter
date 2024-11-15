import React, {useEffect, useState} from 'react';
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
import ContactImage from '../components/common/contactImage.component';
import {useContactById} from '../hooks/useContactById.hook';
import {ContactsService} from '../services/contacts.service';
import {ConfirmationModal} from '../components/common/confirmation-modal.component';
import {theme} from '../theme/main.theme';
import {
  GoogleMap,
  IMarkerCoordinates,
} from '../components/common/googleMap.component';
import WeatherCard from '../components/common/weatherCard.component';

type ContactDetailsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditContact'
>;

export function ContactDetailsScreen(): React.JSX.Element {
  const {params} = useRoute<RouteProp<RootStackParamList, 'EditContact'>>();
  const contactId = params.contactId;
  const navigation = useNavigation<ContactDetailsScreenProp>();

  const {contactInfo, isContactLoading, errorLoadingContact} =
    useContactById(contactId);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState<boolean>(false);

  const [marker, setMarker] = useState<IMarkerCoordinates | null>(null);
  useEffect(() => {
    if (contactInfo?.data.latitude && contactInfo?.data.longitude) {
      setMarker({
        latitude: +contactInfo?.data.latitude, //It's vital the coordinate gets here as a number
        longitude: +contactInfo?.data.longitude,
      });
    }
  }, [contactInfo]);

  const handleDeleteContact = async () => {
    await ContactsService.delete(contactId);
    navigation.goBack();
  };

  return (
    <ScrollView style={contactDetailsStyles.container}>
      {isContactLoading ? (
        <Text style={contactDetailsStyles.loadingText}>
          Loading contact information...
        </Text>
      ) : errorLoadingContact || !contactInfo ? (
        <Text style={contactDetailsStyles.errorText}>
          No information for the contact could be found
        </Text>
      ) : (
        <View style={contactDetailsStyles.contactContainer}>
          <ContactImage pictureUri={contactInfo.data.imageUri} size={150} />
          <Text style={contactDetailsStyles.nameText}>
            {contactInfo.data.name}
          </Text>
          <Text style={contactDetailsStyles.phoneText}>
            {contactInfo.data.phone}
          </Text>
          <Text style={contactDetailsStyles.emailText}>
            {contactInfo.data.email}
          </Text>

          <Text style={contactDetailsStyles.emailText}>
            Contact's current location
          </Text>
          <GoogleMap marker={marker} setMarker={setMarker} onEdit={false} />

          {!!marker && (
            <View>
              <Text style={contactDetailsStyles.emailText}>Local weather</Text>
              <WeatherCard lat={marker?.latitude} lon={marker?.longitude} />
            </View>
          )}

          <TouchableOpacity
            style={[contactDetailsStyles.button]}
            onPress={() => navigation.navigate('EditContact', {contactId})}>
            <Text style={contactDetailsStyles.buttonText}>Edit Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={contactDetailsStyles.button}
            onPress={() => setConfirmationModalVisible(true)}>
            <Text style={contactDetailsStyles.buttonText}>Delete Contact</Text>
          </TouchableOpacity>

          <ConfirmationModal
            confirmationModalVisible={confirmationModalVisible}
            setConfirmationModalVisible={setConfirmationModalVisible}
            handleAccept={handleDeleteContact}
            requiresCancel={true}>
            <Text>Do you want to delete this contact?</Text>
          </ConfirmationModal>
        </View>
      )}
    </ScrollView>
  );
}

export const contactDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  contactContainer: {
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
