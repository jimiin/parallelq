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
import axios from 'axios';

import Icon from "react-native-vector-icons/MaterialIcons";

export default class PreparingScreen extends Component {

state = { 
    data: [],
    activeSections: [],
    collapsed: false,
    multipleSelect: true,
  };

  /* generateData retrieves what is being prepared. */
  generateData = () => {
    const newData = [];
    axios.get(`https://drp38-backend.herokuapp.com/orders/status/preparing`)
      .then(res => {
        var orders = res.data;
        for (let i = 0; i < orders.length; i++) {
          newData.push({
            id: orders[i]._id,
            items: orders[i].items
          });
        } 
        let neworderids = newData.map(x => x.id);
        let oldorderids = this.state.data.map(x => x.id);
        let stillValid = this.state.activeSections.filter(y => neworderids.includes(y));
        let newlyActive = neworderids.filter(y => !oldorderids.includes(y));
        const newActiveSections = stillValid.concat(newlyActive);
        
        this.setState({data: newData, activeSections: newActiveSections});
      })
  }

  genData = async () => {
    try {
      let res = await axios.get('https://drp38-backend.herokuapp.com/orders/status/preparing');
      let orders = res.data;

      this.setState({
        Orders: orders.map(order => (
          <OrderCard
            orderNumber="1"
            item={order.items}
          />
        ))
      });
    } catch (err) {
      console.log(err);
    }
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
      
      <Button title="Prepared" onPress={this.onHandleDelete(section.id)} />
      </View>
      
    );
  };

  /* Sets order to prepared and deletes from the list. */
  onHandleDelete = (sectionId) => {

    axios.post('http://localhost:5000/orders/change_status/prepared/' + sectionId)
    .then(response => {
      /* Remove selected object from array */
      let newData = this.state.data.filter(section => section != sectionId);
      this.setState({
        data: newData
      }); 
    }).catch(error => {console.log(error)});
   
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

  componentDidMount() {
    this.generateData();
  }

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
