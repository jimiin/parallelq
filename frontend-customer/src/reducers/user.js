import { AsyncStorage } from "react-native"

const user = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user))
      return { user: action.payload.user, id: action.payload.id }
    case 'SIGN_OUT':
      AsyncStorage.removeItem('user')
      return {}
  }

  return state
}

export default user

