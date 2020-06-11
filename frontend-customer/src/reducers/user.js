import { AsyncStorage } from "react-native"

const user = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      AsyncStorage.setItem('user', JSON.stringify(action.user))
      return { user: action.user, id: action.id }
    case 'SIGN_OUT':
      AsyncStorage.removeItem('user')
      return {}
  }

  return state
}

export default user

