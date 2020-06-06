import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View } from 'react-native';

class FavouriteIcon extends React.Component {
  state = { fav: false }

  componentDidMount() {
    let faved = this.props.favItems.find(
      i => i._id === this.props.item._id
    ) != undefined
    this.setState({ fav: faved })
  }

  render() {
    console.log(this.state.fav)
    return (
      <View style={{ marginRight: 5 }}>
        {
          this.state.fav ?
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