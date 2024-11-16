import React, {useState} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useCreateVehicle} from '../../hooks/useCreateVehicle';
import {
  checkOrRequestCameraPermission,
  checkOrRequestGalleryPermissions,
} from '../../commun/permisions/checkOrOpen';
import styles from './createVehicle.styles';
import {Icon} from '@ui-kitten/components';

const CreateVehicleForm: React.FC = () => {
  const {createVehicle, isLoading, error} = useCreateVehicle();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const defaultImageUri = require('../../assets/default-image.jpg');
  const [showImageOptions, setShowImageOptions] = useState(false);

  const validateInputs = () => {
    if (!make || !model || !year || !licensePlate) {
      Alert.alert('Validation Error', 'All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('licensePlate', licensePlate);

    if (photo) {
      const photoData = {
        uri: photo,
        type: 'image/jpeg',
        name: 'vehicle-image.jpg',
      };
      formData.append('file', photoData);
    }

    await createVehicle(formData);

    if (!error) {
      Alert.alert('Success', 'Vehicle added successfully');
      setMake('');
      setModel('');
      setYear('');
      setLicensePlate('');
      setPhoto(null);
    } else {
      Alert.alert('Error', error || 'Failed to create vehicle');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerImage}>
          <Pressable onPress={() => setShowImageOptions(!showImageOptions)}>
            <Image
              source={photo ? {uri: photo} : defaultImageUri}
              style={styles.image}
            />
          </Pressable>
          {showImageOptions && (
            <View style={styles.imageOptionsContainer}>
              <Pressable
                onPress={() => checkOrRequestCameraPermission(setPhoto)}>
                <Icon name="camera" style={styles.icon} />
              </Pressable>
              <Pressable
                onPress={() => checkOrRequestGalleryPermissions(setPhoto)}>
                <Icon name="image" style={styles.icon} />
              </Pressable>
            </View>
          )}
        </View>

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
        <TextInput
          style={styles.input}
          placeholder="Year"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="License Plate"
          value={licensePlate}
          onChangeText={setLicensePlate}
        />

        <Pressable
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Adding...' : 'Add Vehicle'}
          </Text>
        </Pressable>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateVehicleForm;
