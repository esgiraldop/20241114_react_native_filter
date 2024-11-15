import AsyncStorage from '@react-native-async-storage/async-storage';
import {showSnackbar} from './snackbar.utility';

// Function to store token in AsyncStorage
export const setValueAsyncStorage = async (
  key: string,
  value: string,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    let errorMessage =
      'There was a problem setting the variable in the async storage';
    errorMessage += error instanceof Error ? error.message : '';
    showSnackbar(errorMessage);
    return false;
  }
};
