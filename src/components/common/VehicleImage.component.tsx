import React, {useState} from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../theme/main.theme';

interface IVehicleImage {
  pictureUri?: string | undefined;
  size?: number | undefined;
  style?: StyleProp<ImageStyle>;
}

export default function VehicleImage({
  pictureUri,
  size = undefined,
}: IVehicleImage) {
  const [imageError, setImageError] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      {imageError || !pictureUri ? (
        <Icon
          name="car-sport-outline"
          size={size ? size : styles.image.width}
          color={!isDarkMode ? 'grey' : 'white'}
        />
      ) : (
        <FastImage
          style={{
            ...styles.image,
            width: size ? size : styles.image.width,
            height: size ? size : styles.image.height,
            borderRadius: size ? size : styles.image.borderRadius,
          }}
          source={{
            uri: pictureUri,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
          onError={() => setImageError(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.buttonBackground,
    borderWidth: 1,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
