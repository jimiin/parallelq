export const url = "https://drp38-backend.herokuapp.com";
export const axios = require("axios");

export const urlList = {
  restaurants: url + "/restaurants",
  restaurantsQueue: url + "/restaurants/with_queue_size",
  orders: url + "/orders/user_status/",
  makeOrder: url + "/orders/add",
  items: url + "/items/",
  verify: url + "/users/verify",
  changeOrderStatus: url + "/orders/change_status/",
};
