import { AsyncStorage } from "react-native"

const user = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      AsyncStorage.setItem('user', JSON.stringify(action.payload))
      return { user: action.payload }
    case 'SIGN_OUT':
      AsyncStorage.removeItem('user')
      return {}
  }

  return state
}

export default user

