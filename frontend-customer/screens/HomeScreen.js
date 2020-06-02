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
        onPress={() => navigation.navigate('Restaurant', { title: "FiveSixEight" })}
      />

      <OptionButton
        img={require('../assets/images/katsu.png')}
        label="Kimiko"
        onPress={() => navigation.navigate('Restaurant', { title: "Kimiko" })}
      />

      <OptionButton
        img={require('../assets/images/library.jpg')}
        label="Library Cafe"
        onPress={() => navigation.navigate('Restaurant', { title: "Library Cafe" })}
        isLastOption
      />

      <OptionButton
        img={require('../assets/images/burger.jpg')}
        label="Placeholder"
        onPress={() => navigation.navigate('Restaurant', { title: "Placeholder" })}
        isLastOption
      />
    </ScrollView>
  );
}
