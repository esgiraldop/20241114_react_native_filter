import {StyleSheet} from 'react-native';
import {theme} from '../theme/main.theme';

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
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
  formContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: theme.spacing.large,
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
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: theme.spacing.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: 'center',
    marginRight: theme.spacing.small,
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    alignItems: 'center',
    marginLeft: theme.spacing.small,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.text,
    fontWeight: 'bold',
  },
});
