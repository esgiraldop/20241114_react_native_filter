import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {theme} from '../../theme/main.theme';
import {IAskUserSyncModalOpen} from '../../contexts/contacts-syncronization.context';
import {isNull} from '../../utilities/checkIsNull.utility';

interface IConfirmationModal<T> {
  children: React.ReactNode;
  confirmationModalVisible: T;
  setConfirmationModalVisible: (confirmationModalVisible: T) => void;
  handleAccept: () => void;
  requiresCancel: boolean;
  handleCancel?: () => void;
}

// Type guard to check if T is IAskUserSyncModalOpen
function isAskUserSyncModalOpen(
  value: unknown,
): value is IAskUserSyncModalOpen {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isModalOpen' in value &&
    (typeof (value as IAskUserSyncModalOpen).isModalOpen === 'boolean' ||
      isNull((value as IAskUserSyncModalOpen).isModalOpen))
  );
}

export const ConfirmationModal = <T,>({
  children,
  confirmationModalVisible,
  setConfirmationModalVisible,
  handleAccept,
  requiresCancel,
  handleCancel = () => null,
}: IConfirmationModal<T>): React.JSX.Element => {
  const evalConfirmationModalVisible = (): boolean => {
    if (typeof confirmationModalVisible === 'boolean') {
      return confirmationModalVisible;
    } else if (isAskUserSyncModalOpen(confirmationModalVisible)) {
      if (!isNull(confirmationModalVisible.isModalOpen)) {
        return !!confirmationModalVisible.isModalOpen;
      }
      return false;
    } else {
      return false;
    }
    // return typeof confirmationModalVisible === 'boolean'
    //   ? confirmationModalVisible
    //   : isAskUserSyncModalOpen(confirmationModalVisible)
    //   ? confirmationModalVisible.isModalOpen
    //   : false;
  };
  const handleClose = () => {
    handleCancel();
    if (typeof confirmationModalVisible === 'boolean') {
      setConfirmationModalVisible(false as T);
    } else {
      setConfirmationModalVisible({
        ...confirmationModalVisible,
        isModalOpen: false,
      } as T);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={evalConfirmationModalVisible()}
      onRequestClose={handleClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{children}</Text>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={handleAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          {requiresCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.large,
    alignItems: 'center',
    shadowColor: theme.colors.textPrimary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: theme.spacing.small,
    padding: theme.spacing.medium,
    elevation: 2,
  },
  acceptButton: {
    backgroundColor: theme.colors.accent,
    marginTop: theme.spacing.small,
  },
  cancelButton: {
    backgroundColor: theme.colors.buttonBackground,
    marginTop: theme.spacing.small,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.text,
    textAlign: 'center',
  },
});
