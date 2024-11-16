import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {IUpdateVehicle} from '../interfaces/vehicle.interface';
// import {VehiclesService} from '../services/vehicles.service';
import {RootStackParamList} from '../interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AddPictureModal} from '../components/common/addPictureModal.component';
import {theme} from '../theme/main.theme';
import {vehicleSchema} from '../schemas/vehicle.schema';
import {formStyles} from '../styles/form.styles';
import {textStyles} from '../styles/text.styles';
import VehicleImage from '../components/common/VehicleImage.component';
import axios from 'axios';
import {baseURL} from '../config/axios.config';
import {getAsyncStorageValue} from '../utilities/get-async-storage-contents.utility';
import {VehiclesService} from '../services/vehicles.service';

type AddVehicleScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddVehicle'
>;

export function AddVehicleScreen(): React.JSX.Element {
  const navigation = useNavigation<AddVehicleScreenProp>();
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [addPictureModalVisible, setAddPictureModalVisible] =
    useState<boolean>(false);

  const onSubmit = async (values: IUpdateVehicle) => {
    const formData = new FormData();
    // Append fields
    console.log('imageUri: ', imageUri);
    formData.append('make', values.make);
    formData.append('model', values.model);
    formData.append('year', values.year);
    formData.append('licensePlate', values.licensePlate);
    if (imageUri) {
      formData.append('file', {
        uri: imageUri, // Adjust for your setup
        type: 'image/avif', // MIME type
        name: 'auto.avif', // File name
      });
    }
    try {
      const token = await getAsyncStorageValue('token');
      const response = await axios.post(`${baseURL}/vehicles`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error Response:', error);
      } else {
        console.error('Unexpected Error:', error);
      }
    }

    // // TODO: To make this work
    // const file = {
    //   uri: imageUri,
    //   type: 'image/avif',
    //   name: 'vehicle_photo.avif',
    // };
    // console.log('values from vehicle creation: ', values);
    // await VehiclesService.create({
    //   ...values,
    //   file,
    // });
    navigation.goBack();
  };

  const initialValues: Omit<IUpdateVehicle, 'file'> = {
    make: '',
    model: '',
    year: 0,
    licensePlate: '',
  };

  return (
    <ScrollView style={formStyles.container}>
      <View>
        <AddPictureModal
          addPictureModalVisible={addPictureModalVisible}
          setAddPictureModalVisible={setAddPictureModalVisible}
          setImageUri={setImageUri}
        />
      </View>
      <View>
        <Formik
          initialValues={initialValues}
          validationSchema={vehicleSchema}
          onSubmit={onSubmit}>
          {({
            isSubmitting,
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            isValid,
          }) => (
            <View style={formStyles.formContainer}>
              <TouchableOpacity
                onPress={() => setAddPictureModalVisible(true)}
                disabled={!isValid || isSubmitting}>
                <VehicleImage pictureUri={imageUri} size={150} />
              </TouchableOpacity>

              <Text style={textStyles.label}>License plate</Text>
              <TextInput
                style={textStyles.input}
                onChangeText={handleChange('licensePlate')}
                onBlur={handleBlur('licensePlate')}
                value={values.licensePlate}
                placeholder="Enter license plate"
                placeholderTextColor={theme.colors.textSecondary}
              />
              {errors.licensePlate && (
                <Text style={formStyles.error}>{errors.licensePlate}</Text>
              )}

              <Text style={textStyles.label}>Manufacturer</Text>
              <TextInput
                style={textStyles.input}
                onChangeText={handleChange('make')}
                onBlur={handleBlur('make')}
                value={String(values.make)}
                defaultValue={String(initialValues.make)}
                placeholder="Enter manufacturer"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="default"
              />
              {errors.make && (
                <Text style={formStyles.error}>{errors.make}</Text>
              )}

              <Text style={textStyles.label}>Model</Text>
              <TextInput
                style={textStyles.input}
                onChangeText={handleChange('model')}
                onBlur={handleBlur('model')}
                value={values.model}
                defaultValue={initialValues.model}
                placeholder="Enter model"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="default"
              />
              {errors.model && (
                <Text style={formStyles.error}>{errors.model}</Text>
              )}

              <Text style={textStyles.label}>Year</Text>

              <TextInput
                style={textStyles.input}
                onChangeText={handleChange('year')}
                onBlur={handleBlur('year')}
                value={String(values.year)}
                defaultValue={String(initialValues.year)}
                placeholder="Enter year"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="numeric"
              />
              {errors.year && (
                <Text style={formStyles.error}>{errors.year}</Text>
              )}

              <View style={formStyles.buttonContainer}>
                <TouchableOpacity
                  style={formStyles.saveButton}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || isSubmitting}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
