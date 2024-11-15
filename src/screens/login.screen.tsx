import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {theme} from '../theme/main.theme';
import {AuthService} from '../services/auth.service';
import {IUser} from '../interfaces/user.interface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';
import {setValueAsyncStorage} from '../utilities/set-variable-async-storage.utility';
import {formStyles} from '../styles/form.styles';
import {textStyles} from '../styles/text.styles';

// Validation schema for the registration form
const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
});

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation<LoginScreenProp>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorSubmitting, setErrorSubmitting] = useState<boolean | null>(null);

  const onSubmit = async (values: IUser) => {
    setIsSubmitting(true);
    const response = await AuthService.login(values);
    console.log('response: ', response);
    if (response) {
      const asyncStorageResponse = await setValueAsyncStorage(
        'token',
        response.data.access_token,
      );
      console.log('asyncStorageResponse: ', asyncStorageResponse);
      if (asyncStorageResponse) {
        setIsSubmitting(false);
        setErrorSubmitting(false);
      } else {
        setIsSubmitting(false);
        setErrorSubmitting(true);
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Vehicles'}],
        }),
      );
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
    <View
      style={[formStyles.container, formStyles.VerticallyCenteredcontainer]}>
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
            <Text style={textStyles.titleText}>Sing in</Text>
            <Text style={textStyles.label}>Email</Text>
            <TextInput
              style={textStyles.input}
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

            <Text style={textStyles.label}>Password</Text>
            <TextInput
              style={textStyles.input}
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
                <Text>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      {errorSubmitting !== null &&
        (errorSubmitting ? (
          <Text style={textStyles.errorText}>
            There was an error logging in. Please try again later
          </Text>
        ) : (
          <Text style={textStyles.sucessText}>Log in sucessful</Text>
        ))}
    </View>
  );
}
