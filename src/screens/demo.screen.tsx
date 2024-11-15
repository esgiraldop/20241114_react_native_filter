import React, {PropsWithChildren} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {appStyles} from '../styles';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces/navigation.interface';
import {useNavigation} from '@react-navigation/native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const Section = ({children, title}: SectionProps): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={appStyles.sectionContainer}>
      <Text
        style={[
          appStyles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          appStyles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export const DemoScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  type DemoScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Demo'
  >;

  const navigation = useNavigation<DemoScreenNavigationProp>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section title="Step One">
          Edit <Text style={appStyles.highlight}>App.tsx</Text> to change this
          screen and then come back to see your edits.
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
        <LearnMoreLinks />
      </View>
      <TouchableOpacity
        style={appStyles.button}
        onPress={() => navigation.navigate('AnotherScreen')}>
        <Text style={appStyles.buttonText}>Go to another screen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
