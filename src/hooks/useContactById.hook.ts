import {useCallback, useState} from 'react';
import {ISingleContactSucessfullResponse} from '../interfaces/vehicle.interface';
import {VehiclesService} from '../services/vehicles.service';
import {useFocusEffect} from '@react-navigation/native';

export function useContactById(contactId: number) {
  const [contactInfo, setContactInfo] =
    useState<ISingleContactSucessfullResponse | null>(null);
  const [isContactLoading, setIsContactLoading] = useState<boolean | null>(
    false,
  );
  const [errorLoadingContact, setErrorLoadingContact] = useState<
    boolean | null
  >(null);

  useFocusEffect(
    useCallback(() => {
      async function getContactInfo(id: number) {
        const contactInfoResponse = await VehiclesService.getById(id);
        setIsContactLoading(true);
        if (contactInfoResponse) {
          setContactInfo(contactInfoResponse);
          setIsContactLoading(false);
        } else {
          setIsContactLoading(false);
          setErrorLoadingContact(true);
        }
      }

      getContactInfo(contactId);
      return () => getContactInfo(contactId);
    }, [contactId]),
  );

  return {
    contactInfo,
    setContactInfo,
    isContactLoading,
    setIsContactLoading,
    errorLoadingContact,
    setErrorLoadingContact,
  };
}
