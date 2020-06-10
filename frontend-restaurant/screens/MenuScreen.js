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
import { connect } from 'react-redux';

import Icon from "react-native-vector-icons/MaterialIcons";

class MenuScreen extends Component {

  state = { 
    data: [],
    activeSections: [],
    multipleSelect: true,
  };

  /* generateData retrieves what is being prepared. */
  generateData = async () => {
    try {
        const newData = [];
        let newActiveSection = []
        let res = await axios.get(`https://drp38-backend.herokuapp.com/items`+this.props.id);
        var orders = res.data;
        for (let i = 0; i < orders.length; i++) {
          newData.push({
            id: orders[i]._id,
            name: orders[i].name,
            price: orders[i].price,
            description: orders[i].description,
            availability: orders[i].availability
          });
          newActiveSection.push(i);
        } 
        
        this.setState({data: newData, activeSections: newActiveSection});
    } catch(err) {
      console.log(err)
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
      <View>
        <View style={[styles.row]}>
          <View style={{flexDirection:'column'}}>

            <Text style={styles.title}>{section.name}</Text>
            <Text style={section.availability == 'available' ? styles.available : styles.unavailable}>{'Currently: '+section.availability}</Text>
            <Text >{'Item ID: ' + section.id}</Text>
            <Text >{'Price: £' + section.price}</Text>

            <View style={{flexDirection:'row'}}>
              <Icon name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'black'} />
            </View>

          </View>
          
          <Button title={section.availability == "available" ? "Make unavailable" : "Make available"} onPress={() => this.handlePress(section)} />
        </View>
        <View style={isActive ? styles.active : styles.inactive}></View>
      </View>
      
    );
  };

  /* Sets order to prepared and deletes from the list. */
  handlePress = async (section) => {
    try {
      console.log("about to do it");
      var request = 'https://drp38-backend.herokuapp.com/items/change_availability/' + (section.availability == "available" ? "unavailable" : "available" ) + '/' + section.id;
      console.log(request);
      let res = await axios.post(request);
      this.generateData();
    } catch(err) {
      console.log(err)
    }   
  }; 
  

  renderContent(section, _, isActive) {
    return (
      <View>
        <Animatable.View
          duration={0}
          style={[styles.content, styles.active]}
          transition="backgroundColor"
        >
          <Text>
            {'Description: ' + section.description}
          </Text>
        </Animatable.View>
        <View style={styles.inactive}>
        </View>
      </View>
    );
  }

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  componentDidMount() {
    this.interval = setInterval(this.generateData, 1000);
  }

  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
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
            duration={0}
            onChange={this.updateSections}
          />
           <View style={styles.accordion}></View>
          
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
    marginBottom: 10,
  },
  available: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
    color: '#29cf53',
  },
  unavailable: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
    color: '#d93030',
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
    borderColor: 'grey',
    borderRadius: 2,
    borderWidth: 1,
  },
  active: {
    backgroundColor: 'white',
  },
  inactive: {
    backgroundColor: '#f8f8f8',
    paddingBottom: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.id
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: 'SIGN_IN', payload: user }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
