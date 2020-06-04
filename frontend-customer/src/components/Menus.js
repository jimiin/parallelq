import React, { Component } from "react";
import { Image, ScrollView, View, Text, Button, TouchableOpacity } from "react-native";

import { styles } from '../styles/styles';
import { formatter } from '../styles/formatter';

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';

import Icon from "react-native-vector-icons/MaterialIcons";


class Menus extends Component {

  state = {
    data: this.props.menus,
    activeSections: [],
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
      <View>
        <View style={[styles.row]}>
          <View style={{ flexDirection: 'column', flexShrink: 1}}>

            <Text style={styles.title}>{section.name}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.itemPriceText}>{formatter.format(section.price)}</Text>
              <Text style={(section.ordered > 0) ? { fontSize: 22 } : { color: 'transparent' }}>x{section.ordered}</Text>
            </ View>
            <View style={{width:500}} >
              <Text style={isActive ? styles.description : { padding: 10 }}>  Description: {section.description.substring(0, 5)}... </Text>
              <Text style={isActive ? { padding: 10 } : styles.description}>  Description: {section.description} </Text>
            </View>

          </View>

          <View style={{ flexDirection: 'column', flexShrink: 1 }}>
           {/* <Image style={styles.fitImage} source={require('../../assets/images/library.jpg')} /> */}
            <Text style={{ height: 10 }} />
            <Button title="Add to cart"
              onPress={() => { this.props.onPress(section); section.ordered++; }} />

          </View>
        </View>
        <View style={isActive ? styles.inactive : styles.inactive}></View>
      </View>

    );
  };



  renderContent(section, _, isActive) {
    return (<View></View>);
  }

  updateSections = activeSections => {
    this.setState({ activeSections });
  };



  render() {
    return (

      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>

          <Accordion
            sections={this.props.menus}
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




export default Menus;
