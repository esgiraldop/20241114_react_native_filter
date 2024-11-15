import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {checkPermission} from '../utilities';
import {PermissionEnum} from '../interfaces';

export const AnotherScreen = () => {
  useEffect(() => {
    const askPermission = async () => {
      const contactsPermissionResponse = await checkPermission(
        PermissionEnum.READ_CONTACTS,
      );
      console.log('contactsPermissionResponse: ', contactsPermissionResponse);
    };
    askPermission();
    return () => {};
  }, []);

  return (
    <View>
      <Text>This is another screen</Text>
    </View>
  );
};
