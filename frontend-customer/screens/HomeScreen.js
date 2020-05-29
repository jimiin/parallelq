import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        img={require('../assets/images/burger.jpg')}
        label="FiveSixEight"
        onPress={() => WebBrowser.openBrowserAsync('https://example.com')}
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

function OptionButton({img, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.contentContainer}>
          <Image style={styles.fitImage} source={img}/>
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  fitImage: {
    width: 300,
    height: 100,
    resizeMode: 'stretch',
  },
});
