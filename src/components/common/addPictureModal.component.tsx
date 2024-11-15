import React, {useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import ContactImage from './contactImage.component';
import {theme} from '../../theme/main.theme';
import {checkPermission} from '../../utilities/check-permissions.utility';
import {PermissionEnum} from '../../interfaces/permissions.interface';
import {NotifyUserPermissionModal} from './notifyUserPermissionModal.component';
import {ImagePickerService} from '../../services/gallery.service';

interface IAddPictureModal {
  addPictureModalVisible: boolean;
  setAddPictureModalVisible: (addPictureModalVisible: boolean) => void;
  setImageUri: (imageUri: string) => void;
  pictureUri?: string | undefined;
}

export const AddPictureModal = ({
  addPictureModalVisible,
  setAddPictureModalVisible,
  setImageUri,
  pictureUri = undefined,
}: IAddPictureModal): React.JSX.Element => {
  const [permissionModalOpen, setPermissionModalopen] =
    useState<boolean>(false);
  const imageSize = 250;
  const openCamera = async () => {
    const permissionResponse = await checkPermission(PermissionEnum.CAMERA);
    if (permissionResponse) {
      const response = await ImagePickerService.pickImageFromCamera(imageSize);
      if (response && response.path) setImageUri(response.path);
    } else {
      setPermissionModalopen(true);
    }
    setAddPictureModalVisible(!addPictureModalVisible);
  };

  const openGallery = async () => {
    const permissionResponse = await checkPermission(
      PermissionEnum.READ_MEDIA_IMAGES,
    );
    if (permissionResponse) {
      const response = await ImagePickerService.pickImageFromGallery(imageSize);
      if (response && response.path) setImageUri(response.path);
    } else {
      setPermissionModalopen(true);
    }
    setAddPictureModalVisible(!addPictureModalVisible);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addPictureModalVisible}
        onRequestClose={() => {
          setAddPictureModalVisible(!addPictureModalVisible);
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <ContactImage pictureUri={pictureUri} size={imageSize} />

            <TouchableOpacity style={modalStyles.button} onPress={openCamera}>
              <Text style={modalStyles.buttonText}>Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={modalStyles.button} onPress={openGallery}>
              <Text style={modalStyles.buttonText}>Select from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={modalStyles.cancelButton}
              onPress={() =>
                setAddPictureModalVisible(!addPictureModalVisible)
              }>
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {permissionModalOpen && (
        <NotifyUserPermissionModal
          modalOpen={permissionModalOpen}
          setModalopen={setPermissionModalopen}
          message={
            'Please enable the app permissions from the settings to be able to use this feature'
          }
        />
      )}
    </View>
  );
};

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal overlay
  },
  modalView: {
    backgroundColor: theme.colors.buttonBackground,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.large,
    alignItems: 'center',
    shadowColor: theme.colors.borderColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Centering the modal width
  },
  button: {
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.spacing.small,
    width: '100%',
    alignItems: 'center',
    marginVertical: theme.spacing.small,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.text,
  },
  cancelButton: {
    backgroundColor: theme.colors.buttonBackground,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    borderRadius: theme.spacing.small,
    width: '100%',
    alignItems: 'center',
    marginVertical: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  cancelButtonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.text,
  },
  bigText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.text,
  },
});
