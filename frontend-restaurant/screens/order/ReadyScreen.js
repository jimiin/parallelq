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

export default class ReadyScreen extends Component {

state = {
    data: [],
    activeSections: [],
    collapsed: false,
    multipleSelect: true,
  };


  generateData = () => {
    /* TODO: Retrieve all the preparing meals, 
             convert them to JavaScript objects,
             add elements to this.state.data */
    
    var newDataStartIndex = this.state.data.length;
    const newData = [];
    axios.get(`host.com:5000/orders/status/prepared`)
      .then(res => {
        var orders = res.map(jorder => JSON.parse(jorder))
        for (let i = 0; i < orders.length; i++) {
          newData.push({
            id: orders[i].id,
            items: orders[i].items
          });
        }
        var diffLength = newData.length - newDataStartIndex - 1;
        var toAddActiveSections = [...Array(diffLength).keys()].map(x => x + newDataStartIndex);
        const newActiveSections = this.state.activeSections.concat(toAddActiveSections);
        this.setState({data: this.state.data.concat(newData), activeSections: newActiveSections});
      })
    
  }

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

        <Text style={styles.title}>{section.id}</Text>

        <View style={{flexDirection:'row'}}>
          <Text style={[styles.viewItems]}>{isActive ? 'Hide Items' : 'View Items'}</Text>
          <Icon name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'black'} />
        </View>

      </View>
      
      <Button title="Picked up" onPress={this.onHandleDelete} />
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
          {section.items}
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
