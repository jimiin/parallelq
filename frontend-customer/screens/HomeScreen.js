import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../src/styles/styles';
import RestaurantCard from '../src/components/RestaurantCard';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <RestaurantCard
        img={require('../assets/images/burger.jpg')}
        label="FiveSixEight"
        onPress={() => navigation.navigate('Restaurant', { title: "FiveSixEight" })}
      />

      <RestaurantCard
        img={require('../assets/images/katsu.png')}
        label="Kimiko"
        onPress={() => navigation.navigate('Restaurant', { title: "Kimiko" })}
      />

      <RestaurantCard
        img={require('../assets/images/library.jpg')}
        label="Library Cafe"
        onPress={() => navigation.navigate('Restaurant', { title: "Library Cafe" })}
        isLastOption
      />

      <RestaurantCard
        img={require('../assets/images/burger.jpg')}
        label="Placeholder"
        onPress={() => navigation.navigate('Restaurant', { title: "Placeholder" })}
        isLastOption
      />
    </ScrollView>
  );
}
