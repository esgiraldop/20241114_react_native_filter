import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/interfaces/navigation.interface';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './src/theme/main.theme';
import {SyncProvider} from './src/contexts/contacts-syncronization.context';
import {LoginScreen} from './src/screens/login.screen';
import {RegistrationScreen} from './src/screens/register.screen';
import {AllVehiclesScreen} from './src/screens/all-vehicles.screen';
import {VehicleDetailsScreen} from './src/screens/vehicle-details.screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SyncProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Register"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.background,
              },
              headerTintColor: theme.colors.textPrimary,
              headerTitleStyle: {
                fontSize: theme.fontSizes.title,
                color: theme.colors.textPrimary,
              },
              animation: 'slide_from_right',
              freezeOnBlur: true,
            }}>
            <Stack.Screen
              name="Register"
              component={RegistrationScreen}
              options={{title: 'User registration'}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{title: 'User login'}}
            />
            <Stack.Screen
              name="Vehicles"
              component={AllVehiclesScreen}
              options={{title: "All Bellatrix's vehicles"}}
            />
            <Stack.Screen
              name="VehicleDetails"
              component={VehicleDetailsScreen}
              options={{title: 'Vehicle details'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SyncProvider>
    </SafeAreaProvider>
  );
}

export default App;
