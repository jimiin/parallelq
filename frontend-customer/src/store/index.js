import { createStore } from 'redux'
import cartItems from '../reducers/cartItems'

export const store = createStore(cartItems)