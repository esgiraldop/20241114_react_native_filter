import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './navigation.interface';

export interface IDemoScreen {
  navigation: NativeStackScreenProps<RootStackParamList, 'Demo'>;
  //   isDarkMode: boolean;
}

export interface IHomeScreen {
  navigation: NativeStackScreenProps<RootStackParamList, 'Home'>;
}
