import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View } from 'react-native';

class FavouriteIcon extends React.Component {
  state = { fav: false }
  render() {
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