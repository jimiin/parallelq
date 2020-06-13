const notificationToken = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_TOKEN":
      return { token: action.payload };
    case "DELETE_TOKEN":
      return {};
  }

  return state;
};

export default notificationToken;
