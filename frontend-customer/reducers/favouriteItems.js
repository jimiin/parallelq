const initialState = {
  favItems: []
}

const favouriteItems = (state = initialState, action) => {
  let item = action.payload;

  switch (action.type) {
    case 'FAV_ITEM':
      if (!state.favItems.find(
        i => i._id === item._id
      )) {
        return {
          favItems:
            [...state.favItems, item]
        }
      }
    case 'UNFAV_ITEM':
      return {
        favItems:
          state.favItems.filter(i => i._id !== item._id)
      }
  }

  return state
}


export default favouriteItems
