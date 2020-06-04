import React, { Component } from "react";
import { Image, ScrollView, View, Text, Button, TouchableOpacity } from "react-native";


import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios';


import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from '../styles/styles';
import { formatter } from '../styles/formatter';

class ShoppingCartItems extends Component {
 /* renderItems = (items) => {
    return items.map(
      (item, index) => {
        return (
          <View key={index} style={{ padding: 20 }}>
            <Button
              title={item.name + " - " + item.price}
              onPress={() => this.props.onPress(item)} />
          </View>
        )
      })
  }
*/
state = { 
    data: this.props.items,
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
          <View style={{flexDirection:'column'}}>

            <Text style={styles.title}>{section.name}</Text>

            <Text style={styles.itemPriceText}>{formatter.format(section.price)}</Text>
            <View style={{width: 350}}>
            <Text style={isActive ? styles.description : {padding: 10}}>  Description: {section.description.substring(0,5)}... </Text>
            <Text style={isActive ? {padding: 10} : styles.description}>  Description: {section.description} </Text>
            
            <View style={[styles.cartButtons]}>
              <View style={[styles.row]}>
              <Button
                title={"+"}
                onPress={this.props.onPressAdd} />
                </ View>
                <View style={[styles.row]}>
              <Button
              title={"-"}
              onPress={() => this.props.onPressRemove(section)} />
              </ View>
              <View style={[styles.row]}>
              <Button
              title={"Remove"}
              onPress={this.props.onPressReset} />
              </ View>
            </ View>
            </View>

          </View>

         <Image style={styles.fitImage} source={require('../../assets/images/library.jpg')} />  

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

export default ShoppingCartItems;
