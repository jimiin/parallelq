import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

import Icon from "react-native-vector-icons/MaterialIcons";

export default class PreparingScreen extends Component {

state = {
    data: [
      {
        title: "Non-Veg Biryanis",
        content:
          "Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan."
      },
      {
        title: "Pizzas",
        content:
          "Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with a knife and fork, but in casual settings, it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas."
      },
      {
        title: "Drinks",
        content:
          "A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice, and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years."
      },
      {
        title: "Deserts",
        content:
          'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word service'
      }
    ],
    activeSections: [0,1,2,3],
    collapsed: false,
    multipleSelect: true,
  };


  toggleExpanded = () => {
    this.setState({ collapsed: this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (

      <View style={[styles.row]}>
      <View style={{flexDirection:'column'}}>

        <Text style={styles.title}>{section.title}</Text>

        <View style={{flexDirection:'row'}}>
          <Text style={[styles.viewItems]}>{isActive ? 'Hide Items' : 'View Items'}</Text>
          <Icon name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'black'} />
        </View>

      </View>
      
      <Button title="Prepared" onPress={this.onHandleDelete} />
      </View>
      
    );
  };

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  onHandleDelete = () => {
 
    let selectedIndex = this.state.activeSections[0];
    let newData = this.state.data;
   
    newData.splice(selectedIndex, 1);
    this.setState({
      data: newData
    });
  }; 
  

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text>
          {section.content}
        </Text>
      </Animatable.View>
    );
  }

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          <Accordion
            sections={this.state.data}
            activeSections={this.state.activeSections}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.updateSections}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding:-15,
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  row: {
    flexDirection:'row', 
    justifyContent:'space-between',
    borderColor: 'grey',
    padding:10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'white',
  },
  inactive: {
    backgroundColor: 'white',
  },
});
