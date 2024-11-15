import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../theme/main.theme';
import {AuthService} from '../services/auth.service';
import {IUser} from '../interfaces/user.interface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';
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
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must contain at least 3 characters'),
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
    name: '',
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
            <Text style={[textStyles.titleText, textStyles.textAlignmentLeft]}>
              Welcome to BellatrixCar
            </Text>
            <Text style={textStyles.label}>Name</Text>
            <TextInput
              style={textStyles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Enter user name"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="default"
            />
            {errors.name && <Text style={formStyles.error}>{errors.name}</Text>}

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
                <Text>Register</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text>
                Do you already have an account?{'  '}
                <Text style={textStyles.linkText}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {errorSubmitting !== null &&
        (errorSubmitting ? (
          <Text style={textStyles.errorText}>
            There was an error registering. Please try again later
          </Text>
        ) : (
          <Text style={textStyles.sucessText}>Registration sucessful</Text>
        ))}
    </View>
  );
}
