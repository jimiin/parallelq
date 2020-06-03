const initialState = {
  items: []
}

const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { items: [...state.items, action.payload] }
    case 'REMOVE_ITEM':
      return initialState
    case 'RESET':
      return initialState
  }

  return state
}

export default cartItems
