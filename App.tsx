import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DemoScreen} from './src/screens/demo.screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/interfaces/navigation.interface';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from './src/themes/main.theme';
import {AnotherScreen} from './src/screens/another.screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
      {/* <DemoScreen /> */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Demo"
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
            name="Demo"
            component={DemoScreen}
            options={{title: 'Demo screen'}}
          />
          <Stack.Screen
            name="AnotherScreen"
            component={AnotherScreen}
            options={{title: 'Another screen'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
