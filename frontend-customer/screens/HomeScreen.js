import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";

import { axios, urlList } from "../constants/api";
import { styles } from "../styles/styles";
import RestaurantCard from "../components/RestaurantCard";

class HomeScreen extends React.Component {
  state = {};

  getRestaurantImage = (id) => {
    switch (id) {
      case 0:
        return require("../assets/images/restaurants/0.jpg");
        break;
      case 1:
        return require("../assets/images/restaurants/1.jpg");
        break;
      default:
        break;
    }
  };

  renderRestaurants = async () => {
    try {
      let res = await axios.get(urlList.restaurantsQueue);
      let restaurants = res.data;

      this.setState({
        restaurantsList: restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            img={this.getRestaurantImage(restaurant._id)}
            label={restaurant.name}
            queueSize={restaurant.queue_size}
            onPress={() =>
              this.props.navigation.navigate("Restaurant", {
                id: restaurant._id,
                title: restaurant.name,
              })
            }
          />
        )),
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    this.renderRestaurants();

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <RestaurantCard
          img={require("../assets/images/favourites.jpg")}
          label="Favourites"
          queueSize={-1}
          onPress={() => this.props.navigation.navigate("Favourites")}
        />
        {this.state.restaurantsList}
      </ScrollView>
    );
  }
}

export default HomeScreen;
