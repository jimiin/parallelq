import { combineReducers, createStore } from 'redux'

import cartItems from '../reducers/cartItems'
import favouriteItems from '../reducers/favouriteItems'
import user from '../reducers/user'

const rootReducer = combineReducers({
  cartItems: cartItems,
  favItems: favouriteItems,
  user: user
})

export const store = createStore(rootReducer);