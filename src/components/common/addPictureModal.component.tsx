import React, {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import ContactImage from './VehicleImage.component';
import {checkPermission} from '../../utilities/check-permissions.utility';
import {PermissionEnum} from '../../interfaces/permissions.interface';
import {NotifyUserPermissionModal} from './notifyUserPermissionModal.component';
import {ImagePickerService} from '../../services/gallery.service';
import {modalStyles} from '../../styles/modal.styles';

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
