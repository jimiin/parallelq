import { combineReducers, createStore } from "redux";

import cartItems from "./cartItems";
import favouriteItems from "./favouriteItems";
import user from "./user";
import notificationToken from "./notificationToken";

const rootReducer = combineReducers({
  cartItems: cartItems,
  favItems: favouriteItems,
  user: user,
  token: notificationToken,
});

export const store = createStore(rootReducer);
