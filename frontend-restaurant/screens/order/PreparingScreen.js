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

class PreparingScreen extends Component {

  state = {
    data: [],
    activeSections: [],
    multipleSelect: true,
  };

  /* generateData retrieves what is being prepared. */
  generateData = async () => {
    try {
      const newData = [];
      let newActiveSection = [];
      let res = await axios.get('https://drp38-backend.herokuapp.com/orders/restaurant_status/' + this.props.id + '/preparing')
      var orders = res.data;
      for (let i = 0; i < orders.length; i++) {
        newData.push({
          id: orders[i]._id,
          items: orders[i].items
        });
        newActiveSection.push(i);
      }

      console.log(newData);

      this.setState({ data: newData, activeSections: newActiveSection });
    } catch (err) {
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
        <View style={styles.row}>
          <View style={styles.leftContainer}>
            <Button
              title='Cancel'
              color='#fa8072'
              onPress={() => this.onHandleCancel(section.id)}>
            </Button>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.title}>#{section.id}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.viewItems]}>{isActive ? 'Hide Items' : 'View Items'}</Text>
              <Icon name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'black'} />
            </View>
          </View>

          <View style={styles.rightContainer}>
            <Button
              title='Prepared'
              color='#96cdff'
              onPress={() => this.onHandleReady(section.id)}>
            </Button>
          </View>
        </View>
        <View style={isActive ? styles.active : styles.inactive}></View>
      </View>

    );
  };

  /* Sets order to prepared and deletes from the list. */
  onHandleReady = async (sectionId) => {
    console.log("Deleting:" + sectionId);
    try {
      let res = await axios.post('https://drp38-backend.herokuapp.com/orders/change_status/prepared/' + sectionId);
      this.generateData();
    } catch (err) {
      console.log(err)
    }
  };

  /* Cancels order and deletes from the list. */
  onHandleCancel = async (sectionId) => {
    console.log("Deleting:" + sectionId);
    try {
      let res = await axios.post('https://drp38-backend.herokuapp.com/orders/change_status/cancelled/' + sectionId);
      this.generateData();
    } catch (err) {
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
            {section.items}
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
    padding: -15,
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    padding: 10,
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
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    id: state.id
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (id) => dispatch({ type: 'SIGN_IN', payload: id }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparingScreen);
