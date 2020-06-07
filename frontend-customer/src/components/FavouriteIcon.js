import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View, Platform } from 'react-native';

class FavouriteIcon extends React.Component {
  state = { favItems: [] }

  componentDidMount() {
    this.setState({ favItems: this.props.favItems })
  }

  componentDidUpdate(newProps) {
    if (this.state.favItems !== newProps.favItems) {
      this.setState({ favItems: newProps.favItems })
    }
  }

  render() {
    let faved = this.state.favItems.find(
      i => i._id === this.props.item._id
    ) != undefined

    return (
      <View style={{ marginRight: 5 }}>
        {
          faved ?
            <Ionicons
              name="md-star"
              size={30}
              onPress={() => {
                this.setState({ fav: false });
                this.props.onPressUnfav(this.props.item);
              }} />
            :
            <Ionicons
              name="md-star-outline"
              size={30}
              onPress={() => {
                this.setState({ fav: true });
                this.props.onPressFav(this.props.item);
              }} />
        }
      </View>
    );
  }
}

export default FavouriteIcon;