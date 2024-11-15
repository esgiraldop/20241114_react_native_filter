import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncStorageContents = async (): Promise<{
  [key: string]: string | null;
}> => {
  try {
    const keys = (await AsyncStorage.getAllKeys()) as string[];
    const stores = await AsyncStorage.multiGet(keys);

    const storageContents: {[key: string]: string | null} = {};
    stores.forEach(([key, value]) => {
      storageContents[key] = value;
    });

    return storageContents;
  } catch (error) {
    console.error('Error retrieving AsyncStorage contents:', error);
    return {};
  }
};

export const getAsyncStorageValue = async (
  key: string,
): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error retrieving value for key "${key}":`, error);
    return null;
  }
};
