import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../theme/main.theme';
import {formStyles} from './edit-contact.screen';
import {AuthService} from '../services/auth.service';
import {IUser} from '../interfaces/user.interface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';

// Validation schema for the registration form
const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
});

type registerScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export function RegistrationScreen(): React.JSX.Element {
  const navigation = useNavigation<registerScreenProp>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorSubmitting, setErrorSubmitting] = useState<boolean | null>(null);

  const onSubmit = async (values: IUser) => {
    setIsSubmitting(true);
    const response = await AuthService.register(values);
    if (response) {
      setIsSubmitting(false);
      setErrorSubmitting(false);
      navigation.navigate('Login');
    } else {
      setIsSubmitting(false);
      setErrorSubmitting(true);
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <ScrollView style={formStyles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={onSubmit}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          isValid,
        }) => (
          <View style={formStyles.formContainer}>
            <Text style={formStyles.label}>Email</Text>
            <TextInput
              style={formStyles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Enter email"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={formStyles.error}>{errors.email}</Text>
            )}

            <Text style={formStyles.label}>Password</Text>
            <TextInput
              style={formStyles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Enter password"
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry={true}
            />
            {errors.password && (
              <Text style={formStyles.error}>{errors.password}</Text>
            )}

            <View style={formStyles.buttonContainer}>
              <TouchableOpacity
                style={formStyles.saveButton}
                onPress={() => handleSubmit()}
                disabled={!isValid || isSubmitting}>
                <Text>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={formStyles.saveButton}
                onPress={() => navigation.navigate('Login')}>
                <Text>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      {errorSubmitting !== null &&
        (errorSubmitting ? (
          <Text style={formStyles.errorText}>
            There was an error registering. Please try again later
          </Text>
        ) : (
          <Text style={formStyles.sucessText}>Registration sucessful</Text>
        ))}
    </ScrollView>
  );
}
