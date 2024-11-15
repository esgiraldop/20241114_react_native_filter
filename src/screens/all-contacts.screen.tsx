import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {SmallButton} from '../components/common/SmallButton';
import {GoToContacDetailsButton} from '../components/allContacts';
import {ButtonsCarrousel} from '../components/common/ButtonsCarrousel.component';
import {ContactsService} from '../services/contacts.service';
import {IContact} from '../interfaces/contact.interface';
import {useFocusEffect} from '@react-navigation/native';
import {theme} from '../theme/main.theme';
import {PermissionEnum} from '../interfaces/permissions.interface';
import {checkPermission} from '../utilities/check-permissions.utility';
import {NotifyUserPermissionModal} from '../components/common/notifyUserPermissionModal.component';
import {
  getContactsToSync,
  postNewContacts,
} from '../utilities/check-contacts-to-sync.utility';
import {ConfirmationModal} from '../components/common/confirmation-modal.component';
import {Contact} from 'react-native-contacts/type';
import {useSyncContext} from '../contexts/contacts-syncronization.context';
import {isNull} from '../utilities/checkIsNull.utility';

export function AllContactsScreen(): React.JSX.Element {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [errorLoading, setErrorLoading] = useState<boolean | null>(null);
  const [permissionModalOpen, setPermissionModalopen] =
    useState<boolean>(false);
  const {
    askUserSyncModalOpen,
    setAskUserSyncModalOpen,
    hasUserResponded,
    setHasUserResponded,
  } = useSyncContext();
  const [contacts2Sync, setcontacts2Sync] = useState<Contact[] | null>(null);

  useEffect(() => {
    const syncContacts = async () => {
      const response = await ContactsService.getAll();
      if (response) {
        //If app's contacts could be loaded, ask permission for reading phone's contacts and numbers

        const contactsPermissionResponse = await checkPermission(
          PermissionEnum.READ_CONTACTS,
        );
        const cellphonesPermissionResponse = await checkPermission(
          PermissionEnum.READ_PHONE_NUMBERS,
        );

        if (contactsPermissionResponse && cellphonesPermissionResponse) {
          // If user gave permissions for contacts and numbers, get phone's contacts and sync them
          const phoneContactsResponse = await ContactsService.sync();

          if (phoneContactsResponse) {
            const contactsToSync = getContactsToSync(
              response.data,
              phoneContactsResponse,
            );

            // Call modal for asking user to sync contacts. If the modal was already called this is never executed unless the user closes the app and opens it again
            if (
              contactsToSync.length > 0 &&
              !hasUserResponded &&
              isNull(askUserSyncModalOpen.isModalOpen)
            ) {
              setcontacts2Sync(contactsToSync);
              setAskUserSyncModalOpen({
                isModalOpen: true,
                numNewContacts: contactsToSync.length,
              });
            }
          }
          // If there was an error getting the contacs, a snackbar is shown from the service, and the application continues as normal
        } else {
          setPermissionModalopen(true);
        }
      }
    };
    syncContacts();
    return () => {};
  }, [hasUserResponded, askUserSyncModalOpen]);

  const handleSyncContacts = useCallback(async () => {
    // Close the modal after user hits ok
    setAskUserSyncModalOpen({
      isModalOpen: false,
      numNewContacts: 0,
    });
    setHasUserResponded(true);
    if (contacts2Sync) {
      setIsLoading(true);
      setErrorLoading(null);
      const insertResponse = await postNewContacts(contacts2Sync.slice(0, 10));
      if (
        insertResponse &&
        insertResponse.data.length !== askUserSyncModalOpen.numNewContacts
      ) {
        console.log(
          'The number of contacts inserted in the database and the number contacts to be syncronized are not the same, so probably there was an error',
        );
      }
      const response = await ContactsService.getAll();
      if (response) {
        setContacts(response.data);
        setIsLoading(false);
        setErrorLoading(false);
      } else {
        setIsLoading(false);
        setErrorLoading(true);
      }
    }
  }, [contacts, contacts2Sync]);

  useFocusEffect(
    useCallback(() => {
      async function fetchAllContacts() {
        setIsLoading(true);

        // Contacts saved in the app's database do not need permission for reading contacts/phone numbers from the phone
        const response = await ContactsService.getAll();

        if (response) {
          setContacts(response.data);
          setErrorLoading(false);
        } else {
          setErrorLoading(true);
        }
        setIsLoading(false);
      }
      fetchAllContacts();

      return () => {};
    }, []),
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : errorLoading ? (
        <Text style={styles.loadingText}>Error loading contacts</Text>
      ) : (
        <FlatList
          ListHeaderComponent={
            <ButtonsCarrousel>
              <SmallButton text={'Add new contact'} />
              {/* <SmallButton text={'Search a contact'} /> */}
            </ButtonsCarrousel>
          }
          data={contacts.sort((a, b) => a.name.localeCompare(b.name))}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GoToContacDetailsButton
              name={item.name}
              id={item.id}
              imageUri={item.imageUri}
            />
          )}
        />
      )}
      {permissionModalOpen && (
        <NotifyUserPermissionModal
          modalOpen={permissionModalOpen}
          setModalopen={setPermissionModalopen}
          message={
            "Please enable the app permissions from the settings to be able to syncronize the phone's contacts with Close To You app"
          }
        />
      )}
      {askUserSyncModalOpen.isModalOpen && (
        <ConfirmationModal
          confirmationModalVisible={askUserSyncModalOpen}
          setConfirmationModalVisible={setAskUserSyncModalOpen}
          handleAccept={handleSyncContacts}
          requiresCancel={true}
          handleCancel={() => setHasUserResponded(true)}>
          <Text>
            {askUserSyncModalOpen.numNewContacts} new contacts have been found.
            Do you want to syncronize them? (Only 10 contacts will be
            syncronized)
          </Text>
        </ConfirmationModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.large,
  },
});
