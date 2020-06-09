const user = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { user: action.payload }
    case 'SIGN_OUT':
      return {}
  }

  return state
}

export default user

