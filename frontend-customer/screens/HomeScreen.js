import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { axios, urlList } from '../src/backend-api/api';
import { styles } from '../src/styles/styles';
import RestaurantCard from '../src/components/RestaurantCard';

class HomeScreen extends React.Component {
  state = {}

  renderRestaurants = async () => {
    try {
      let res = await axios.get(urlList.restaurants);
      let restaurants = res.data;

      console.log(restaurants);

      this.setState({
        restaurantsList: restaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant._id}
            img={require(restaurant.photo_dir)}
            label={restaurant.name}
            onPress={() =>
              navigation.navigate('Restaurant',
                { id: restaurant._id, title: restaurant.name })
            }
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
        {this.state.restaurantsList}
      </ScrollView>
    );
  }
}

export default HomeScreen;