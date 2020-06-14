import React, { Component } from "react";
import { Image, ScrollView, View, Text, Button, TouchableOpacity } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import { styles } from '../styles/styles';
import { formatter } from '../styles/formatter';

class ShoppingCartItems extends Component {
  state = {
    data: this.props.itemCount,
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
    const item = section.item;

    return (
      <View>
        <View style={[styles.row]}>
          <View style={{ flexDirection: 'column' }}>

            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.itemPriceText}>
                {formatter.format(item.price)}
              </Text>
              <Text style={styles.itemPriceText}>
                x{section.count}
              </Text>
            </View>

            <View style={styles.windowWidth}>
              <View style={styles.cartButtonsContainer}>
                <View style={styles.cartButtons}>
                  <Button
                    title={"  +  "}
                    onPress={() => this.props.onPressPlus(item)} />
                </View>
                <View style={styles.cartButtons}>
                  <Button
                    title={"  -  "}
                    onPress={() => this.props.onPressMinus(item)} />
                </View>
                <View style={styles.cartButtons}>
                  <Button
                    title={"  Remove  "}
                    onPress={() => {
                      this.props.onPressRemove(item);
                    }} />
                </View>
              </View>
            </View>
          </View>

          {/* <Image
            style={styles.fitImage}
            source={require('../../assets/images/library.jpg')} /> */}

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
