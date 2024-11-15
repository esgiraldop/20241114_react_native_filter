import React from 'react';
import {Button, ScrollView, Text, useColorScheme, View} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Section} from '../components/common/section-component';
import {styles} from '../styles/general.style';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';

type DemoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Demo'
>;

export function DemoScreen(): React.JSX.Element {
  // {navigation}: IDemoScreen
  const isDarkMode = useColorScheme() === 'dark'; //TODO: To use the one from App.jsx
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }; //TODO: To use the one from App.jsx

  const navigation = useNavigation<DemoScreenNavigationProp>();

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
            <Text style={styles.highlight}>Hi there again</Text>
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <Button
            title="Go to App's Home"
            onPress={() => navigation.navigate('Home')}
          />
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </>
  );
}
