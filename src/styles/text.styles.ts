import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';

export const textStyles = StyleSheet.create({
  loadingText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
  },
  sucessText: {
    color: theme.colors.success,
    textAlign: 'center',
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.text,
    marginBottom: theme.spacing.small,
  },
  input: {
    backgroundColor: theme.colors.buttonBackground,
    color: theme.colors.textPrimary,
    padding: theme.spacing.small,
    borderRadius: theme.spacing.small,
    width: '100%',
    marginBottom: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.text,
    fontWeight: 'bold',
  },
  linkText: {
    color: theme.colors.textPrimary,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  titleText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.title,
    marginBottom: theme.spacing.huge,
    fontWeight: 'bold',
  },
  textAlignmentLeft: {
    textAlign: 'left',
  },
});
