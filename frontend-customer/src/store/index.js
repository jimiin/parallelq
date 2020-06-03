import { createStore } from 'redux'
import cartItems from '../reducers/cardItems'

export const store = createStore(cartItems)