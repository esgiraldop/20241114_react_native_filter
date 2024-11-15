import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {modalStyles} from './addPictureModal.component';

interface INotifyUserPermissionModal {
  modalOpen: boolean;
  setModalopen: (modalOpen: boolean) => void;
  message: string;
}

export const NotifyUserPermissionModal = ({
  modalOpen,
  setModalopen,
  message,
}: INotifyUserPermissionModal) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          setModalopen(!modalOpen);
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.bigText}>{message}</Text>

            <TouchableOpacity
              style={modalStyles.button}
              onPress={() => setModalopen(!modalOpen)}>
              <Text style={modalStyles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
