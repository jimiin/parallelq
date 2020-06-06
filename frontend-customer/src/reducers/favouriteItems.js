const initialState = {
  favItems: []
}

const favouriteItems = (state = initialState, action) => {

  console.log(state.favItems)
  switch (action.type) {
    case 'FAV_ITEM':
      return {
        favItems:
          [...state.favItems, action.payload]
      }
    case 'UNFAV_ITEM':
      return {
        favItems:
          state.favItems.filter(i => i._id !== action.payload._id)
      }
  }

  return state
}


export default favouriteItems
