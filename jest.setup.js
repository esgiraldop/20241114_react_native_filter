import {jest} from '@jest/globals';
import mockSnackbar from 'react-native-snackbar/jest/snackbar-mock.js';

jest.mock(
  'react-native-permissions',
  () => require('react-native-permissions/mock'),
  'react-native-snackbar',
  () => mockSnackbar,
);
