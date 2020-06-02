import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../src/styles/styles';
import OptionButton from '../src/components/OptionButton';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <OptionButton
        img={require('../assets/images/burger.jpg')}
        label="FiveSixEight"
        onPress={() => navigation.navigate('Restaurant')}
      />

      <OptionButton
        img={require('../assets/images/katsu.png')}
        label="Kimiko"
        onPress={() => WebBrowser.openBrowserAsync('https://example.com')}
      />

      <OptionButton
        img={require('../assets/images/library.jpg')}
        label="Library Cafe"
        onPress={() => WebBrowser.openBrowserAsync('https://example.com')}
        isLastOption
      />

      <OptionButton
        img={require('../assets/images/burger.jpg')}
        label="Placeholder"
        onPress={() => WebBrowser.openBrowserAsync('https://example.com')}
        isLastOption
      />
    </ScrollView>
  );
}
