import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../src/styles/styles';
import RestaurantCard from '../src/components/RestaurantCard';

class HomeScreen extends React.Component  {
  state = {}

  renderRestaurants = async () => {
    try {
      let res = await axios.get('drp38-backend.herokuapp.com/restaurants/');
      let restaurants = res.data;

      this.setState({
        restaurantsList: restaurants.map(restaurant => (
          <RestaurantCard
            img={require(restaurant.photo_dir)}
            label={restaurant.name}
            onPress={() => navigation.navigate('Restaurant', { title: restaurant.name })}
            id={restaurant._id}
          />
        ))
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    this.renderRestaurants();

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <RestaurantCard
          img={require('../assets/images/favourites.jpg')}
          label="Favourites"
          onPress={() => navigation.navigate('Favourites')}
        />
        {this.state.restaurants}
      </ScrollView>
    );
  }
}

export default HomeScreen;