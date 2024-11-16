import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {useVehicleById} from '../hooks/useVehicleById.hook';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {IVehicle, IUpdateVehicle} from '../interfaces/vehicle.interface';
import {VehiclesService} from '../services/vehicles.service';
import {RootStackParamList} from '../interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AddPictureModal} from '../components/common/addPictureModal.component';
import {theme} from '../theme/main.theme';
import {formStyles} from '../styles/form.styles';
import {textStyles} from '../styles/text.styles';
import VehicleImage from '../components/common/VehicleImage.component';
import {vehicleSchema} from '../schemas/vehicle.schema';

interface InewVehicleValues extends Omit<IVehicle, 'id'> {}

type EditVehicleScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditVehicle'
>;

export function EditVehicleScreen(): React.JSX.Element {
  const navigation = useNavigation<EditVehicleScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'EditVehicle'>>();
  const {vehicleId} = route.params;

  const {vehicleInfo, isVehicleLoading, errorLoadingVehicle} = useVehicleById(
    +vehicleId,
  );
  const [addPictureModalVisible, setAddPictureModalVisible] =
    useState<boolean>(false);

  const [imageUri, setImageUri] = useState<string>(
    vehicleInfo ? vehicleInfo.data.photo : '',
  );

  useEffect(() => {
    // So the image in the form refreshes
    if (vehicleInfo?.data.photo) {
      setImageUri(vehicleInfo.data.photo);
    }
  }, [vehicleInfo]);

  const onSubmit = async (values: IUpdateVehicle) => {
    await VehiclesService.update(+vehicleId, {
      ...values,
      photo: imageUri, //TODO: I have to load the picture as a file in a form data
    });
    navigation.goBack();
  };

  let vehicleInfoNoId: InewVehicleValues;
  if (!vehicleInfo) {
    vehicleInfoNoId = {
      make: '',
      model: '',
      year: 0,
      licensePlate: '',
      photo: '',
    };
  } else {
    const {id, ...rest} = vehicleInfo.data;
    vehicleInfoNoId = rest;
  }

  const initialValues: InewVehicleValues = {
    ...vehicleInfoNoId,
    photo: imageUri,
  };

  return (
    <ScrollView style={formStyles.container}>
      {isVehicleLoading ? (
        <Text style={textStyles.loadingText}>Loading...</Text>
      ) : errorLoadingVehicle ? (
        <Text style={textStyles.errorText}>
          No information for the vehicle could be found
        </Text>
      ) : (
        <View>
          <View>
            <AddPictureModal
              addPictureModalVisible={addPictureModalVisible}
              setAddPictureModalVisible={setAddPictureModalVisible}
              setImageUri={setImageUri}
              pictureUri={imageUri}
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
                    defaultValue={initialValues.licensePlate}
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
                      <Text style={textStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
