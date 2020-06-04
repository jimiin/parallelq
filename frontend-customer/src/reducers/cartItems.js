const initialState = {
  itemCount: []
}

const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case 'INC_ITEM':
      return incrementItemCount(state, action.payload)
    case 'DEC_ITEM':
      return decrementItemCount(state, action.payload)
    case 'REMOVE_ITEM':
      return {
        itemCount:
          state.itemCount.filter(i => i.item._id !== action.payload._id)
      }
    case 'RESET':
      return initialState
  }

  return state
}

const findItemIndex = (state, item) => {
  return state.itemCount.findIndex(i => i.item._id === item._id);
}

const incrementItemCount = (state, item) => {
  let itemIndex = findItemIndex(state, item);
  if (itemIndex === -1) {
    return {
      itemCount: [...state.itemCount, { item: item, count: 1 }]
    }
  }

  const newItemCount = state.itemCount.slice()
  newItemCount[itemIndex].count++;
  return {
    itemCount: newItemCount
  }
}

const decrementItemCount = (state, item) => {
  let itemIndex = findItemIndex(state, item);
  if (itemIndex === -1) {
    return {
      itemCount: [...state.itemCount]
    }
  }

  const newItemCount = state.itemCount.slice()
  const count = newItemCount[itemIndex].count
  if (count > 0) {
    newItemCount[itemIndex].count--;
  }
  return {
    itemCount: newItemCount
  }
}

export default cartItems
