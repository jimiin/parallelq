const restaurantId = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { id: action.payload }
    case 'SIGN_OUT':
      return {}
  }

  return state
}

export default restaurantId
