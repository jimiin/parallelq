import { combineReducers, createStore } from 'redux'

import cartItems from '../reducers/cartItems'
import favouriteItems from '../reducers/favouriteItems'

const rootReducer = combineReducers({
  cartItems: cartItems,
  favItems: favouriteItems
})

export const store = createStore(rootReducer);