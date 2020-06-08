import React, { Component } from "react";
import { Image, ScrollView, View, Text, Button, TouchableOpacity } from "react-native";
import Accordion from 'react-native-collapsible/Accordion';

import FavouriteIcon from './FavouriteIcon'
import { styles } from '../styles/styles';
import { formatter } from '../styles/formatter';

class MenuItems extends Component {

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

  renderItemButton = (item) => {
    if (item.availability === "available") {
      return (
        <Button
          title="Add to cart"
          onPress={() => { this.props.onPress(item) }} />
      )
    }
    return (
      <Button
        title="Unavailable"
        disabled={true}
        onPress={() => { console.log("unavilable menu") }} />
    )
  }

  renderItemCount(item) {
    let itemWithCount = this.props.itemCount.find(i => i.item._id === item._id);
    if (itemWithCount !== undefined) {
      return (
        <Text style={(itemWithCount.count > 0) ?
          styles.itemPriceText : { color: 'transparent' }}>
          x{itemWithCount.count}
        </Text>
      );
    }
  }


  renderHeader = (section, _, isActive) => {
    return (
      <View>
        <View style={[styles.row]}>
          <View style={{ flexDirection: 'column', flexShrink: 1 }}>

            <View style={{ flexDirection: 'row' }}>
              <FavouriteIcon
                onPressFav={this.props.onPressFav}
                onPressUnfav={this.props.onPressUnfav}
                item={section}
                favItems={this.props.favItems} />
              <Text style={styles.title}>{section.name}</Text>
            </View>

            <View style={styles.priceTag}>
              <Text style={styles.itemPriceText}>
                {formatter.format(section.price)}
              </Text>
              {this.renderItemCount(section)}
            </View>
            <View style={styles.descriptionContainer} >
              <Text style={isActive ? styles.description : { padding: 10 }}>
                Description: {section.description.substring(0, 60)}...
              </Text>
              <Text style={isActive ? { padding: 10 } : styles.description}>
                Description: {section.description}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'column', flexShrink: 1 }}>
            {/* <Image style={styles.fitImage} source={require('../../assets/images/library.jpg')} /> */}
            <Text style={{ height: 10 }} />
            {this.renderItemButton(section)}
          </View>
        </View>
        <View style={isActive ? styles.inactive : styles.inactive}></View>
      </View >

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
      <View style={styles.container} >
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
      </View >
    );
  }
}

export default MenuItems;
