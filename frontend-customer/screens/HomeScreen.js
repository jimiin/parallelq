import * as React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { urlList } from "../constants/api";
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
          <View
            key={restaurant._id}
            style={{ paddingHorizontal: 10, paddingVertical: 5 }}
          >
            <RestaurantCard
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
          </View>
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
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <RestaurantCard
            img={require("../assets/images/favourites.jpg")}
            label="Favourites"
            queueSize={-1}
            onPress={() => this.props.navigation.navigate("Favourites")}
          />
        </View>

        {this.state.restaurantsList}
      </ScrollView>
    );
  }
}

export default HomeScreen;
