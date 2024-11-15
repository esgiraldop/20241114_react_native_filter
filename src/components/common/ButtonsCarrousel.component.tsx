import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../../theme/main.theme';

interface IButtonsCarrousel extends PropsWithChildren {}

export const ButtonsCarrousel = ({children}: IButtonsCarrousel) => {
  return (
    <View style={styles.container}>
      {React.Children.map(children, child => (
        <View style={styles.buttonWrapper}>{child}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.small,
    backgroundColor: theme.colors.buttonBackground,
  },
  buttonWrapper: {
    flex: 1,
    margin: theme.spacing.small,
  },
});
