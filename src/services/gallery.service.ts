import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {showSnackbar} from '../utilities/snackbar.utility';

export class ImagePickerService {
  static async pickImageFromGallery(
    imageSize: number,
  ): Promise<ImageOrVideo | null> {
    try {
      return await ImagePicker.openPicker({
        width: imageSize,
        height: imageSize,
        cropping: true,
      });
    } catch (error) {
      let errorMessage = 'The picture could not be loaded from the gallery';
      errorMessage += error instanceof Error ? error.message : '';
      showSnackbar(errorMessage);
      return Promise.resolve(null);
    }
  }

  static async pickImageFromCamera(imageSize: number) {
    try {
      return await ImagePicker.openCamera({
        width: imageSize,
        height: imageSize,
        cropping: true,
      });
    } catch (error) {
      let errorMessage = 'The picture could not be loaded from the camera';
      errorMessage += error instanceof Error ? error.message : '';
      showSnackbar(errorMessage);
      return Promise.resolve(null);
    }
  }
}
