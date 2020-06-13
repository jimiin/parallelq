import { combineReducers, createStore } from "redux";

import cartItems from "../reducers/cartItems";
import favouriteItems from "../reducers/favouriteItems";
import user from "../reducers/user";
import notificationToken from "../reducers/notificationToken";

const rootReducer = combineReducers({
  cartItems: cartItems,
  favItems: favouriteItems,
  user: user,
  token: notificationToken,
});

export const store = createStore(rootReducer);
