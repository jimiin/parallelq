import { AsyncStorage } from "react-native";
import { axios, urlList } from "../backend-api/api";

async function verify(user, token) {
  try {
    // TODO: use token to verify
    const res = await axios.post(urlList.verify, {
      name: user.name,
      email: user.email,
      gid: user.id,
    });
  } catch (e) {
    console.log(e);
  }
}

const user = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const user = action.payload.user;
      const token = action.payload.token;
      AsyncStorage.setItem("user", JSON.stringify(user));
      verify(user, token);
      return { user: user };
    case "SIGN_OUT":
      AsyncStorage.removeItem("user");
      return {};
  }

  return state;
};

export default user;
