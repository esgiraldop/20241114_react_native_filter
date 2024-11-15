import Snackbar from 'react-native-snackbar';

export const showSnackbar = (
  message: string,
  isErrorSnackbar: boolean = true,
) => {
  Snackbar.show({
    text: message,
    // textColor: 'black',
    // backgroundColor: 'black',
    duration: Snackbar.LENGTH_INDEFINITE,
    numberOfLines: 5,
    marginBottom: 10,
    action: {
      text: 'Accept',
      textColor: isErrorSnackbar ? 'red' : 'green',
      // onPress: {handleError},
    },
  });
};
